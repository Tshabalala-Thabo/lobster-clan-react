// pages/Reserve.js
import React, { useState } from "react";
import ReservationForm from "../components/reservation/ReservationForm";

export function Reserve() {
  const [isReservationConfirmed, setIsReservationConfirmed] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 pt-40 pb-16">
      <div className="container mx-auto px-4">
        {!isReservationConfirmed && (
          <>
            <h1 className="text-4xl font-protest text-stone-900 text-center mb-4">Reserve a Table</h1>
            <p className="text-center text-stone-600 mb-12">
              Fill out the form below to reserve your table at Lobster Clan.
            </p>
          </>
        )}
        <ReservationForm onReservationSuccess={setIsReservationConfirmed} />
      </div>
    </div>
  );
}