import React from "react";

export default function TableSelectionStep({ selectedTables, setSelectedTables, TOTAL_GUESTS, tables }) {
  const groupedTables = React.useMemo(() => {
    const groups = {};
    tables.forEach((table) => {
      const key = table.description || "Other";
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(table);
    });
    return groups;
  }, [tables]);

  const handleTableSelection = (tableId) => {
    setSelectedTables((prev) =>
      prev.includes(tableId) ? prev.filter((id) => id !== tableId) : [...prev, tableId]
    );
  };

  // Calculate total seats from selected tables
  const totalSeats = selectedTables.reduce((sum, tableId) => {
    const table = tables.find((t) => t.tableId === tableId);
    return sum + (table ? table.seats : 0);
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
          {Object.entries(groupedTables).map(([description, tables]) => (
            <div
              key={description}
              className={`${
                tables.length < 5 ? "lg:col-span-1" : "lg:col-span-2"
              } border border-gray-300 p-4 mb-6`}
            >
              <h3 className="text-lg font-semibold mb-2">{description}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tables.map((table) => (
                  <label
                    key={table.tableId}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTables.includes(table.tableId)}
                      onChange={() => handleTableSelection(table.tableId)}
                      className="h-4 w-4"
                    />
                    <span>
                      Table {table.tableId} ({table.seats} seats)
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 font-semibold">
          Total Seats Selected: {totalSeats} / {TOTAL_GUESTS}
        </div>
      </div>
    </div>
  );
}