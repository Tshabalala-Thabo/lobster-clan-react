import Reservation from '../models/Reservation.js';
import Table from '../models/Table.js';
import sendReservationConfirmation from '../utils/emailService.js';
import TableLocation from '../models/TableLocation.js';

export const checkTimeSlots = async (req, res) => {
  const { guests } = req.body;
  console.log('Checking time slots for guests:', guests);

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log('Start date:', today, `[${today.toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}]`);

    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);
    console.log('End date:', sevenDaysFromNow, `[${sevenDaysFromNow.toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}]`);

    // Fetch all reservations within the next 7 days
    const reservations = await Reservation.find({
      startTime: { $gte: today, $lt: sevenDaysFromNow }
    }).sort({ startTime: 1 });
    console.log('Found reservations:', reservations.length);

    // Fetch all tables
    const allTables = await Table.find({});
    console.log('Total tables found:', allTables.length);
    const totalSeats = allTables.reduce((sum, table) => sum + table.seats, 0);
    console.log('Total seats available:', totalSeats);

    // If total seats are insufficient for the requested guests, return immediately
    if (totalSeats < guests) {
      return res.status(200).json({
        success: true,
        message: 'Insufficient total seating capacity for the requested number of guests.',
        requiredGuests: guests,
        totalSeatsAvailable: totalSeats
      });
    }

    const availabilityRanges = [];

    // Loop through each day for the next 7 days
    for (let d = 0; d < 7; d++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + d);
      console.log('\nProcessing date:', currentDate, `[${currentDate.toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}]`);

      const openingTime = new Date(currentDate);
      openingTime.setHours(11, 0, 0, 0);
      const closingTime = new Date(currentDate);
      closingTime.setHours(22, 0, 0, 0);
      console.log('Operating hours:', 
        openingTime, `[${openingTime.toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}]`,
        'to',
        closingTime, `[${closingTime.toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}]`
      );

      const dayReservations = reservations.filter(res => {
        const resDate = new Date(res.startTime);
        return resDate.getDate() === currentDate.getDate() &&
          resDate.getMonth() === currentDate.getMonth() &&
          resDate.getFullYear() === currentDate.getFullYear();
      });
      console.log('Reservations for this day:', dayReservations.length);

      let unavailableSlots = [];
      let currentTime = new Date(openingTime);

      while (currentTime < closingTime) {
        const slotEnd = new Date(currentTime.getTime() + 30 * 60000);
        console.log('\nChecking slot:', 
          currentTime, `[${currentTime.toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}]`,
          'to',
          slotEnd, `[${slotEnd.toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}]`
        );

        const conflictingReservations = dayReservations.filter(res => {
          return (currentTime < new Date(res.endTime) &&
            slotEnd > new Date(res.startTime));
        });
        console.log('Conflicting reservations found:', conflictingReservations.length);

        const reservedTables = new Set(conflictingReservations.flatMap(res => res.tableIds));
        console.log('Reserved tables:', reservedTables.size);
        
        const availableTables = allTables.filter(table => !reservedTables.has(table._id.toString()));
        console.log('Available tables:', availableTables.length);

        const canAccommodate = canTablesAccommodateGuests(availableTables, guests);
        console.log('Can accommodate guests?', canAccommodate);

        if (!canAccommodate) {
          console.log('Adding unavailable slot');
          unavailableSlots.push({
            startTime: new Date(currentTime),
            endTime: new Date(slotEnd),
            availableTables: availableTables.map(table => table._id.toString()),
            availableSeats: availableTables.reduce((sum, table) => sum + table.seats, 0)
          });
        }

        currentTime = slotEnd;
      }

      console.log('Unavailable slots before merging:', unavailableSlots.length);
      const mergedSlots = unavailableSlots.reduce((merged, current) => {
        if (merged.length === 0) return [current];

        const last = merged[merged.length - 1];
        if (last.endTime.getTime() === current.startTime.getTime()) {
          last.endTime = current.endTime;
          last.availableTables = [...new Set([...last.availableTables, ...current.availableTables])];
          last.availableSeats = Math.min(last.availableSeats, current.availableSeats);
          return merged;
        }

        return [...merged, current];
      }, []);
      console.log('Merged slots:', mergedSlots.length);

      if (mergedSlots.length > 0) {
        availabilityRanges.push({
          date: new Date(currentDate),
          unavailableSlots: mergedSlots
        });
      }
    }

    console.log('Final availability ranges:', availabilityRanges.length);
    // Return the unavailable time ranges
    res.status(200).json({
      success: true,
      unavailableRanges: availabilityRanges,
      requiredGuests: guests,
      totalSeatsAvailable: totalSeats
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

// Helper function to check if available tables can accommodate the requested guests
const canTablesAccommodateGuests = (availableTables, guests) => {
  console.log('\n--- Checking Table Accommodation ---');
  console.log('Number of guests:', guests);
  console.log('Available tables:', availableTables.map(t => ({
    id: t._id,
    seats: t.seats,
    canCombine: t.canCombine
  })));

  const totalAvailableSeats = availableTables.reduce((sum, table) => sum + table.seats, 0);
  console.log('Total available seats:', totalAvailableSeats);

  // If total available seats are insufficient, return false
  if (totalAvailableSeats < guests) {
    console.log('❌ Insufficient total seats available');
    return false;
  }

  // Check if any single table can accommodate the guests
  const canSingleTableAccommodate = availableTables.some(table => table.seats >= guests);
  console.log('Can a single table accommodate?', canSingleTableAccommodate);

  // If a single table can accommodate, return true
  if (canSingleTableAccommodate) {
    console.log('✅ Found single table that can accommodate guests');
    return true;
  }

  // Otherwise, check if combining tables can accommodate the guests
  const sortedTables = availableTables.sort((a, b) => b.seats - a.seats);
  console.log('Sorted tables by seats:', sortedTables.map(t => ({
    id: t._id,
    seats: t.seats,
    canCombine: t.canCombine
  })));

  let remainingGuests = guests;
  console.log('\nStarting combination check:');

  for (const table of sortedTables) {
    if (table.canCombine) {
      remainingGuests -= table.seats;
      console.log(`Using table with ${table.seats} seats. Remaining guests: ${remainingGuests}`);
      
      if (remainingGuests <= 0) {
        console.log('✅ Found combination of tables that can accommodate guests');
        return true;
      }
    } else {
      console.log(`Skipping table with ${table.seats} seats (cannot combine)`);
    }
  }

  console.log('❌ No combination of tables can accommodate guests');
  return false;
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