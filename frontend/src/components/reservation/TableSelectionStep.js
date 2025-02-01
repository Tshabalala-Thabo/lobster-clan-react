import React from "react";

const tables = [
  { tableId: "T1", seats: 3, canCombine: true, description: "Outside" },
  { tableId: "T2", seats: 3, canCombine: true, description: "Near window" },
  { tableId: "T3", seats: 3, canCombine: true },
  { tableId: "T4", seats: 3, canCombine: true, description: "Near bar" },
  { tableId: "T5", seats: 3, canCombine: true },
  { tableId: "T6", seats: 4, canCombine: true, description: "Outside" },
  { tableId: "T7", seats: 4, canCombine: true, description: "Near window" },
  { tableId: "T8", seats: 4, canCombine: true },
  { tableId: "T9", seats: 4, canCombine: true, description: "Near kitchen" },
  { tableId: "T10", seats: 4, canCombine: true },
  { tableId: "T11", seats: 10, canCombine: true, description: "Private room" },
  { tableId: "T12", seats: 10, canCombine: true },
  { tableId: "T13", seats: 10, canCombine: true, description: "Outdoor patio" },
  { tableId: "T14", seats: 10, canCombine: true },
  { tableId: "T15", seats: 10, canCombine: true, description: "Mezzanine" },
];

export default function TableSelectionStep({ selectedTables, setSelectedTables, TOTAL_GUESTS }) {
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
  }, []);

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
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(groupedTables).map(([description, tables]) => (
            <div
              key={description}
              className={`${
                tables.length === 1 ? "col-span-1" : "col-span-2"
              } border border-gray-300 p-4 mb-6`}
            >
              <h3 className="text-lg font-semibold mb-2">{description}</h3>
              <div className="grid grid-cols-2 gap-4">
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
