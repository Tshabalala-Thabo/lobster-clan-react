import Reservation from '../models/Reservation.js';
import Table from '../models/Table.js';
import sendReservationConfirmation from '../utils/emailService.js';
import TableLocation from '../models/TableLocation.js';

export const checkAvailability = async (req, res) => {
  const { guests, date, duration } = req.body;
  const startTime = new Date(date);
  const endTime = new Date(startTime.getTime() + duration * 60000); 

  try {
    // Find all reservations that overlap with the requested time slot
    const overlappingReservations = await Reservation.find({
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
      ],
    }).exec();

    // Get the tableIds that are reserved during the requested time slot
    const reservedTableIds = overlappingReservations.flatMap((reservation) => reservation.tableIds);

    // Find all tables that are not reserved during the requested time slot
    const availableTables = await Table.find({
      _id: { $nin: reservedTableIds },
    })
      .populate('locationId')
      .exec();

    // Combine each table with its location name
    const tablesWithLocations = availableTables.map((table) => {
      return {
        id: table._id,
        tableName: table.tableName,
        seats: table.seats,
        canCombine: table.canCombine,
        location: table.locationId ? table.locationId.name : 'Other', // Add location name
      };
    });

    // Calculate the total number of seats available
    const totalSeats = availableTables.reduce((sum, table) => sum + table.seats, 0);

    // Check if the total seats can accommodate the guests
    if (totalSeats < guests) {
      return res.status(200).json({
        success: false,
        message: 'Insufficient seats available. Please try a different time or reduce the number of guests.',
        availableTables: [],
      });
    }

    // Return all available tables with location names to the frontend
    res.status(200).json({
      success: true,
      message: 'Tables are available... Please select and combine tables as needed.',
      availableTables: tablesWithLocations, // Send tables with location names
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const checkTimeSlots = async (req, res) => {
  const { guests } = req.body;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);

    const reservations = await Reservation.find({
      startTime: { $gte: today, $lt: sevenDaysFromNow }
    }).sort({ startTime: 1 });

    const allTables = await Table.find({});
    const availabilityRanges = [];

    for (let d = 0; d < 7; d++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + d);

      const openingTime = new Date(currentDate.setHours(11, 0, 0));
      const closingTime = new Date(currentDate.setHours(22, 0, 0));

      const dayReservations = reservations.filter(res => {
        const resDate = new Date(res.startTime);
        return resDate.getDate() === currentDate.getDate() &&
          resDate.getMonth() === currentDate.getMonth() &&
          resDate.getFullYear() === currentDate.getFullYear();
      });

      let unavailableSlots = [];
      let currentTime = new Date(openingTime);

      while (currentTime < closingTime) {
        const slotEnd = new Date(currentTime.getTime() + 30 * 60000);

        const conflictingReservations = dayReservations.filter(res => {
          return (currentTime < new Date(res.endTime) &&
            slotEnd > new Date(res.startTime));
        });

        const reservedTables = new Set(conflictingReservations.flatMap(res => res.tableIds));
        const availableTables = allTables.filter(table => !reservedTables.has(table._id.toString()));
        const availableSeats = availableTables.reduce((sum, table) => sum + table.seats, 0);

        if (availableSeats < guests) {
          unavailableSlots.push({
            startTime: new Date(currentTime),
            endTime: new Date(slotEnd),
            availableSeats,
            reservedTables: Array.from(reservedTables)
          });
        }

        currentTime = slotEnd;
      }

      // Merge consecutive unavailable slots
      const mergedSlots = unavailableSlots.reduce((merged, current) => {
        if (merged.length === 0) return [current];

        const last = merged[merged.length - 1];
        if (last.endTime.getTime() === current.startTime.getTime()) {
          last.endTime = current.endTime;
          last.availableSeats = Math.min(last.availableSeats, current.availableSeats);
          last.reservedTables = [...new Set([...last.reservedTables, ...current.reservedTables])];
          return merged;
        }

        return [...merged, current];
      }, []);

      if (mergedSlots.length > 0) {
        availabilityRanges.push({
          date: new Date(currentDate),
          unavailableSlots: mergedSlots
        });
      }
    }

    res.status(200).json({
      success: true,
      unavailableRanges: availabilityRanges,
      requiredGuests: guests
    });

  } catch (error) {
    console.error('Error checking time slots:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export const submitReservation = async (req, res) => {
  const { name, email, phone, guests, date, duration, selectedTables } = req.body;

  // Validate the payload
  if (!name || !email || !phone || !guests || !date || !duration || !selectedTables) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.',
    });
  }

  // Convert the date to start and end times
  const startTime = new Date(date);
  const endTime = new Date(startTime.getTime() + duration * 60000); // Convert duration to milliseconds

  try {
    // Check if the selected tables are available
    const overlappingReservations = await Reservation.find({
      tableIds: { $in: selectedTables },
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
      ],
    }).exec();

    if (overlappingReservations.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'One or more selected tables are already reserved for the given time slot.',
      });
    }

    // Fetch details of the selected tables
    const tables = await Table.find({ tableName: { $in: selectedTables } })
      .populate('locationId') // Populate location details
      .exec();

    // Format table details for the email
    const tableDetails = tables.map((table) => ({
      tableName: table.tableName,
      seats: table.seats,
      location: table.locationId ? table.locationId.name : 'Other', // Add location name
    }));

    // Create a new reservation
    const newReservation = new Reservation({
      name,
      email,
      phone,
      guests,
      startTime,
      endTime,
      tableIds: selectedTables, // Now using tableIds instead of tableNames
    });

    // Save the reservation to the database
    await newReservation.save();

    // Send a confirmation email to the user
    await sendReservationConfirmation({
      name,
      email,
      guests,
      duration,
      date: startTime,
      tables: tableDetails, // Pass table details to the email
    });

    res.status(201).json({
      success: true,
      message: 'Reservation submitted successfully!',
      reservation: newReservation,
    });
  } catch (error) {
    console.error('Error submitting reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};