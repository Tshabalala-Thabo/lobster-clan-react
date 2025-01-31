import Reservation from '../models/Reservation.js';
import { checkAvailability, validateManualSelection, suggestBestCombination } from '../utils/reservationUtils.js';

export const createReservation = async (req, res) => {
  const { name, email, phone, date, guests, tableIds } = req.body;

  try {
    // Fetch available tables for the selected time slot
    const availableTables = await checkAvailability(date);

    // If tableIds are provided, validate manual selection
    if (tableIds && tableIds.length > 0) {
      const validation = validateManualSelection(availableTables, tableIds, guests);
      if (!validation.valid) {
        return res.status(400).send(validation.message);
      }
    } else {
      // Suggest the best combination
      tableIds = suggestBestCombination(availableTables, guests);
      if (!tableIds) {
        return res.status(400).send('No available tables for the requested time and guests.');
      }
    }

    // Create reservation
    const reservation = new Reservation({ name, email, phone, date, guests, tableIds });
    await reservation.save();

    res.send({ message: 'Reservation successful', tableIds });
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
}; 