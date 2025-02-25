import React from "react";

export default function TableSelectionStep({ selectedTables, setSelectedTables, TOTAL_GUESTS, tables }) {
  // Group tables by location
  const groupedTables = React.useMemo(() => {
    const groups = {};
    tables.forEach((table) => {
      // Check for either id or _id
      if (!table || (!table.id && !table._id)) {
        console.warn('Invalid table data:', table);
        return;
      }
      const key = table.location || "Other";
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push({
        ...table,
        _id: table._id || table.id // Normalize id to _id
      });
    });
    // Convert the groups object to an array of [key, value] pairs
    const groupsArray = Object.entries(groups);

    // Sort the groups to ensure "Other" is always at the end
    groupsArray.sort(([locationA], [locationB]) => {
      if (locationA === "Other") return 1; // Move "Other" to the end
      if (locationB === "Other") return -1; // Keep other locations at the top
      return locationA.localeCompare(locationB); // Sort alphabetically
    });

    // Convert the sorted array back to an object
    const sortedGroups = {};
    groupsArray.forEach(([location, tables]) => {
      sortedGroups[location] = tables;
    });

    return sortedGroups;
  }, [tables]);
  // Handle table selection using _id instead of tableName
  const handleTableSelection = (tableId) => {
    if (!tableId) {
      console.warn('Attempted to select table with invalid ID');
      return;
    }

    setSelectedTables((prevSelected) => {
      const tableIdStr = String(tableId);
      const isCurrentlySelected = prevSelected.some(id => String(id) === tableIdStr);

      if (isCurrentlySelected) {
        return prevSelected.filter(id => String(id) !== tableIdStr);
      } else {
        return [...prevSelected, tableId];
      }
    });
  };

  // Update totalSeats calculation to handle both id and _id
  const totalSeats = selectedTables.reduce((sum, tableId) => {
    const table = tables.find(t => String(t._id || t.id) === String(tableId));
    return sum + (table?.seats || 0);
  }, 0);

  return (
    <div className="w-full mx-auto">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-2xl font-bold">Table Selection</h2>
      </div>
      <div className="p-4">
        <div className="mb-4 text-xl font-semibold">
          Number of Guests: {TOTAL_GUESTS}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedTables).map(([location, locationTables]) => (
            <div
              key={`location-${location}`}
              className={`${locationTables.length < 5 ? "lg:col-span-1" : "lg:col-span-2"
                } border border-gray-300 p-4 mb-6`}
            >
              <h3 className="text-lg font-semibold mb-2">{location}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {locationTables.map((table) => {
                  const tableId = table._id || table.id;
                  return tableId ? (
                    <label
                      key={`table-${tableId}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTables.some(id => String(id) === String(tableId))}
                        onChange={() => handleTableSelection(tableId)}
                        className="h-4 w-4"
                      />
                      <span>
                        Table {table.tableName || 'Unknown'} ({table.seats || 0} seats)
                      </span>
                    </label>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className={`font-semibold ${totalSeats >= TOTAL_GUESTS ? 'text-green-600' : 'text-red-600'}`}>
            Total Seats Selected: {totalSeats} / {TOTAL_GUESTS}
            {totalSeats >= TOTAL_GUESTS && (
              <span className="ml-2 text-green-600">✓ Sufficient seats selected</span>
            )}
            {totalSeats < TOTAL_GUESTS && (
              <span className="ml-2 text-red-600">
                Need {TOTAL_GUESTS - totalSeats} more seat(s)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
