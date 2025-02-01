export const validateManualSelection = (availableTables, selectedTableIds, guests) => {
  const selectedTables = availableTables.filter(table => selectedTableIds.includes(table.tableId));
  console.log("available filtered ", selectedTables)
  if (selectedTables.length === 0) {
    return { valid: false, message: 'Selected tables are not available for the selected time.' };
  }

  const totalSeats = selectedTables.reduce((sum, table) => sum + table.seats, 0);

  if (totalSeats < guests) {
    return { valid: false, message: 'Selected tables cannot accommodate all guests.' };
  }

  return { valid: true, message: 'Selection is valid.' };
};

export const suggestBestCombination = (availableTables, guests) => {
  // Sort tables in ascending order of seats
  availableTables.sort((a, b) => a.seats - b.seats);

  let bestCombination = null;
  let minWaste = Infinity;
  let minTables = Infinity;

  const backtrack = (index, remainingGuests, currentCombination, currentWaste) => {
    if (remainingGuests <= 0) {
      if (
        currentWaste < minWaste || // Less waste
        (currentWaste === minWaste && currentCombination.length < minTables) // Fewer tables
      ) {
        minWaste = currentWaste;
        minTables = currentCombination.length;
        bestCombination = [...currentCombination];
      }
      return;
    }

    for (let i = index; i < availableTables.length; i++) {
      if (availableTables[i].seats > remainingGuests) continue; // Skip tables that are too large

      // Allocate the table
      currentCombination.push(availableTables[i].tableId);
      backtrack(
        i, // Allow reusing the same table type
        remainingGuests - availableTables[i].seats,
        currentCombination,
        currentWaste + (availableTables[i].seats - remainingGuests)
      );
      currentCombination.pop(); // Backtrack
    }
  };

  // Start the search
  backtrack(0, guests, [], 0);

  return bestCombination;
};

export const checkAvailability = async (date) => {
  const reservations = await Reservation.find({ date });
  const reservedTableIds = reservations.flatMap(res => res.tableIds);

  const allTables = await Table.find({});
  const availableTables = allTables.filter(table => !reservedTableIds.includes(table.tableId));

  return availableTables;
}; 