// components/reservation/SuccessStep.js
import React, { useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom"; // For navigation

export default function SuccessStep({ selectedDate, startTime, duration, selectedTables, onReset }) {
  const { width, height } = useWindowSize(); // Get window size for confetti
  const reservationNumber = Math.floor(Math.random() * 1000000); // Generate a random reservation number
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Trigger confetti effect when the component mounts
    return () => {
      // Cleanup confetti when the component unmounts
    };
  }, []);

  const handleGoToHomepage = () => {
    navigate("/"); // Navigate to the homepage
  };

  const handleMakeAnotherReservation = () => {
    onReset(); // Reset the form to start a new reservation
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6">
      {/* Confetti Effect */}
      <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />

      {/* Success Message */}
      <h2 className="text-3xl font-bold text-green-600">Reservation Confirmed!</h2>
      <p className="text-lg text-stone-700">Thank you for booking with us. Here are your reservation details:</p>

      {/* Reservation Details */}
      <div className="w-full max-w-md space-y-4">
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Reservation Number</h3>
          <p className="text-lg font-mono">{reservationNumber}</p>
        </div>

        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Date & Time</h3>
          <p>Date: {selectedDate?.toLocaleDateString()}</p>
          <p>Start Time: {startTime?.toLocaleTimeString()}</p>
          <p>Duration: {duration} minutes</p>
        </div>

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

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleGoToHomepage}
          className="px-6 py-2 bg-stone-700 text-white hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500"
        >
          Go to Homepage
        </button>
        <button
          onClick={handleMakeAnotherReservation}
          className="px-6 py-2 bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Make Another Reservation
        </button>
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