import Reservation from '../models/Reservation.js';
import Table from '../models/Table.js';
import { validateManualSelection, suggestBestCombination } from '../utils/reservationUtils.js';

// Utility function for checking availability
const checkTableAvailability = async (date) => {
  // Fetch all reservations for the given date
  const reservations = await Reservation.find({ date: new Date(date) });
  const reservedTableIds = reservations.flatMap(res => res.tableIds);

  // Fetch all tables and filter available ones
  const allTables = await Table.find();
  return allTables.filter(table => !reservedTableIds.includes(table.tableId));
};

export const createReservation = async (req, res) => {
  //console.log('Request body:', req.body);
  const { name, email, phone, date, guests, tableIds } = req.body;

  try {
    // Fetch available tables for the selected time slot using the utility function
    const availableTables = await checkTableAvailability(date);

    // If tableIds are provided, validate manual selection
    if (tableIds && tableIds.length > 0) {
      const validation = validateManualSelection(availableTables, tableIds, guests);
      if (!validation.valid) {
        return res.status(400).send(validation.message);
      }
    } else {
      // Suggest the best combination
      const suggestedTableIds = suggestBestCombination(availableTables, guests);
      if (!suggestedTableIds) {
        return res.status(400).send('No available tables for the requested time and guests.');
      }
      tableIds = suggestedTableIds;
    }

    // Create reservation
    const reservation = new Reservation({ name, email, phone, date, guests, tableIds });
    await reservation.save();

    res.send({ message: 'Reservation successful', tableIds });
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
}; 

export const checkAvailability = async (req, res) => {
  const { date, guests } = req.body;

  try {
    // Use the utility function
    const availableTables = await checkTableAvailability(date);
    
    // Check if there are enough seats across all available tables
    const totalAvailableSeats = availableTables.reduce((sum, table) => sum + table.seats, 0);

    if (totalAvailableSeats < guests) {
      return res.status(400).json({
        message: 'Not enough tables available',
        availableTables,
      });
    }

    // Suggest the best table combination
    let suggestedCombination = suggestBestCombination(availableTables, guests);

    if (!suggestedCombination) {
      // Fallback: Use the smallest available table
      if (availableTables.length > 0) {
        suggestedCombination = [availableTables[0].tableId];
      } else {
        return res.status(400).json({
          message: 'No tables available',
        });
      }
    }

    res.json({
      message: 'Tables available',
      suggestedCombination,
      availableTables,
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to suggest the best table combination
// const suggestBestCombination = (availableTables, guests) => {
//   availableTables.sort((a, b) => a.seats - b.seats); // Sort by seats ascending

//   let bestCombination = null;
//   let minWaste = Infinity;
//   let minTables = Infinity;

//   const backtrack = (index, remainingGuests, currentCombination, currentWaste) => {
//     if (remainingGuests <= 0) {
//       if (
//         currentWaste < minWaste || // Less waste
//         (currentWaste === minWaste && currentCombination.length < minTables) // Fewer tables
//       ) {
//         minWaste = currentWaste;
//         minTables = currentCombination.length;
//         bestCombination = [...currentCombination];
//       }
//       return;
//     }

//     for (let i = index; i < availableTables.length; i++) {
//       if (availableTables[i].seats > remainingGuests) continue; // Skip tables that are too large

//       // Allocate the table
//       currentCombination.push(availableTables[i].tableId);
//       backtrack(
//         i, // Allow reusing the same table type
//         remainingGuests - availableTables[i].seats,
//         currentCombination,
//         currentWaste + (availableTables[i].seats - remainingGuests)
//       );
//       currentCombination.pop(); // Backtrack
//     }
//   };

//   // Start the search
//   backtrack(0, guests, [], 0);

//   return bestCombination;
// }; 