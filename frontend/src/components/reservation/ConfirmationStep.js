// components/ConfirmationStep.js
import React from "react";
import { useFormContext } from "react-hook-form";

export default function ConfirmationStep({ selectedDate, startTime, duration, selectedTables }) {
  const { watch } = useFormContext(); // Use useFormContext to access form data

  // Get form values
  const formValues = watch();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Confirm Your Reservation</h2>

      {/* Personal Details */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-2">Personal Details</h3>
        <p>Name: {formValues.name}</p>
        <p>Email: {formValues.email}</p>
        <p>Phone: {formValues.phone}</p>
        <p>Guests: {formValues.guests}</p>
      </div>

      {/* Date and Time */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-2">Date & Time</h3>
        <p>Date: {selectedDate?.toLocaleDateString()}</p>
        <p>Start Time: {startTime?.toLocaleTimeString()}</p>
        <p>Duration: {duration} minutes</p>
        <p>End Time: {startTime && new Date(startTime.getTime() + duration * 60000).toLocaleTimeString()}</p>
      </div>

      {/* Selected Tables */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-2">Selected Tables</h3>
        {selectedTables.length > 0 ? (
          <ul>
            {selectedTables.map((tableId) => {
              const table = tables.find((t) => t.tableId === tableId);
              return (
                <li key={tableId}>
                  Table {table.tableId} ({table.seats} seats) - {table.description || "No description"}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No tables selected.</p>
        )}
      </div>
    </div>
  );
}

// Mock tables data (move this to a shared file if needed)
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