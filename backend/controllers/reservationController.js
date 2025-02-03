import Reservation from '../models/Reservation.js';
import Table from '../models/Table.js';

export const getReservations = async (req, res) => {
  try {
    // Calculate the start and end of the next 7 days
    const now = new Date();
    const sevenDaysLater = new Date(now);
    sevenDaysLater.setDate(now.getDate() + 7);

    // Fetch all reservations within the next 7 days
    const reservations = await Reservation.find({
      date: { $gte: now, $lte: sevenDaysLater },
    }).select('-name -email -phone -createdAt -updatedAt -__v'); // Exclude personal information

    // Fetch all tables
    const allTables = await Table.find();

    // Map reservations to include table details
    const reservationsWithTableDetails = reservations.map((reservation) => {
      const tableDetails = reservation.tableIds.map((tableId) =>
        allTables.find((table) => table.tableId === tableId)
      );

      return {
        ...reservation.toObject(),
        tableDetails,
      };
    });

    // Respond with data and a success message
    res.json({
      message: 'Reservations fetched successfully',
      data: reservationsWithTableDetails,
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createReservation = async (req, res) => {
  const { name, email, phone, date, guests, tableIds } = req.body;

  try {
    // Parse the date and calculate the end time (assuming 30-minute slots)
    const startTime = new Date(date);
    const endTime = new Date(startTime);
    endTime.setMinutes(startTime.getMinutes() + 30);

    // Check if tables are available for the requested time slot
    const overlappingReservations = await Reservation.find({
      tableIds: { $in: tableIds }, // Check if any of the selected tables are reserved
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Overlapping condition
      ],
    });

    if (overlappingReservations.length > 0) {
      return res.status(400).json({ error: 'One or more selected tables are not available for the requested time slot.' });
    }

    // Create reservation
    const reservation = new Reservation({ name, email, phone, date: startTime, guests, tableIds });
    await reservation.save();

    // Respond with data and a success message
    res.json({
      message: 'Reservation successful',
      data: { tableIds },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};