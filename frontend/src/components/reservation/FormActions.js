// components/FormActions.js
import React from "react";

export default function FormActions({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSubmit,
  isNextDisabled,
  isSubmitDisabled,
}) {
  return (
    <div className="flex gap-2">
      {currentStep > 1 && (
        <button
          type="button"
          onClick={onBack}
          className="w-full px-4 py-2 bg-gray-300 text-stone-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Back
        </button>
      )}
      {currentStep < totalSteps ? (
        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className="w-full px-4 py-2 bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          className="w-full px-4 py-2 bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Confirm Reservation
        </button>
      )}
    </div>
  );
}