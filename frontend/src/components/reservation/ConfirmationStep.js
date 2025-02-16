import React from "react";
import { useFormContext } from "react-hook-form";

export default function ConfirmationStep({ selectedDate, startTime, duration, selectedTables, availableTables = [] }) {
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
              const table = availableTables.find((t) => t.tableId === tableId);
              return (
                <li key={tableId}>
                  Table {table?.tableId} ({table?.seats} seats) - {table?.location || "No location"}
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