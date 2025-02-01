// components/ReservationForm.js
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import PersonalDetailsStep from "./PersonalDetailsStep";
import DateTimeStep from "./DateTimeStep";
import TableSelectionStep from "./TableSelectionStep";
import ConfirmationStep from "./ConfirmationStep";
import FormActions from "./FormActions";

export default function ReservationForm() {
  const methods = useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(30);
  const [selectedTables, setSelectedTables] = useState([]);

  // Watch the "guests" field from the form
  const guests = methods.watch("guests");

  const onSubmit = async (data) => {
    if (currentStep < 4) {
      setLoading(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setLoading(false);
      }, 2000);
    } else {
      // Handle final submission
      console.log("Reservation Data:", { ...data, selectedTables });
      toast.success("Reservation confirmed!");
      // Reset form
      methods.reset();
      setSelectedDate(null);
      setStartTime(null);
      setDuration(30);
      setSelectedTables([]);
      setCurrentStep(1); // Reset to the first step
    }
  };

  const isNextDisabled =
    (currentStep === 1 && !methods.formState.isValid) || // Disable if personal details are invalid
    (currentStep === 2 && (!selectedDate || !startTime)) || // Disable if date/time is not selected
    (currentStep === 3 && selectedTables.length === 0); // Disable if no tables are selected

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        {loading && (
          <div className="flex justify-center items-center">
            <Oval type="Oval" color="#ff0000" height={50} width={50} />
          </div>
        )}
        {!loading && currentStep === 1 && <PersonalDetailsStep />}
        {!loading && currentStep === 2 && (
          <DateTimeStep
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            startTime={startTime}
            setStartTime={setStartTime}
            duration={duration}
            setDuration={setDuration}
          />
        )}
        {!loading && currentStep === 3 && (
          <TableSelectionStep
            selectedTables={selectedTables}
            setSelectedTables={setSelectedTables}
            TOTAL_GUESTS={guests} // Pass the number of guests from the form
          />
        )}
        {!loading && currentStep === 4 && (
          <ConfirmationStep
            selectedDate={selectedDate}
            startTime={startTime}
            duration={duration}
            selectedTables={selectedTables}
          />
        )}
        <FormActions
          currentStep={currentStep}
          totalSteps={4} // Total steps is now 4
          onNext={() => setCurrentStep((prev) => prev + 1)}
          onBack={() => setCurrentStep((prev) => prev - 1)}
          onSubmit={methods.handleSubmit(onSubmit)}
          isNextDisabled={isNextDisabled}
          isSubmitDisabled={false} // No need to disable submit in TableSelectionStep
        />
      </form>
    </FormProvider>
  );
}