import Reservation from '../models/Reservation.js';
import Table from '../models/Table.js';
import TableLocation from '../models/TableLocation.js'; // Import the TableLocation model

export const checkAvailability = async (req, res) => {
  const { guests, date, duration } = req.body;

  // Convert the time to start and end times
  const startTime = new Date(date);
  const endTime = new Date(startTime.getTime() + duration * 60000); // Convert duration to milliseconds

  try {
    // Find all reservations that overlap with the requested time slot
    const overlappingReservations = await Reservation.find({
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
        { startTime: { $gte: startTime, $lt: endTime } },
      ],
    }).exec();

    // Get the tableIds that are reserved during the requested time slot
    const reservedTableIds = overlappingReservations.flatMap((reservation) => reservation.tableIds);

    // Find all tables that are not reserved during the requested time slot
    // Populate the locationId field to get the location details
    const availableTables = await Table.find({
      tableId: { $nin: reservedTableIds },
    })
      .populate('locationId') // Populate the location details
      .exec();

    // Combine each table with its location name
    const tablesWithLocations = availableTables.map((table) => {
      return {
        tableId: table.tableId,
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