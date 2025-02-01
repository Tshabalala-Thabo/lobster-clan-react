// components/TableSelectionStep.js
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
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto", border: "1px solid #ccc", borderRadius: "8px" }}>
      <div style={{ padding: "16px", borderBottom: "1px solid #ccc" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Table Selection</h2>
      </div>
      <div style={{ padding: "16px" }}>
        <div style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>
          Number of Guests: {TOTAL_GUESTS}
        </div>
        {Object.entries(groupedTables).map(([description, tables]) => (
          <div key={description} style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>{description}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
              {tables.map((table) => (
                <label
                  key={table.tableId}
                  style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
                >
                  <input
                    type="checkbox"
                    checked={selectedTables.includes(table.tableId)}
                    onChange={() => handleTableSelection(table.tableId)}
                  />
                  <span>
                    Table {table.tableId} ({table.seats} seats)
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <div style={{ marginTop: "16px", fontWeight: "600" }}>
          Total Seats Selected: {totalSeats} / {TOTAL_GUESTS}
        </div>
      </div>
    </div>
  );
}