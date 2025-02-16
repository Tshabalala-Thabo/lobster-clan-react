// components/reservation/ReservationForm.js
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import PersonalDetailsStep from "./PersonalDetailsStep";
import DateTimeStep from "./DateTimeStep";
import TableSelectionStep from "./TableSelectionStep";
import ConfirmationStep from "./ConfirmationStep";
import SuccessStep from "./SuccessStep";
import FormActions from "./FormActions";

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

export default function ReservationForm({ onReservationSuccess }) {
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      guests: ""
    }
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(30);
  const [selectedTables, setSelectedTables] = useState([]);
  const [personalDetails, setPersonalDetails] = useState(null);

  // Watch the "guests" field from the form
  const guests = methods.watch("guests");

  const handleStepChange = async (direction) => {
    if (direction === 'next' && currentStep === 1) {
      // Store personal details when moving from step 1
      const formData = methods.getValues();
      setPersonalDetails({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        guests: formData.guests
      });
    }
    
    if (direction === 'next') {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data) => {
    if (currentStep < 5) {
      setLoading(true);
      setTimeout(() => {
        handleStepChange('next');
        setLoading(false);
      }, 2000);
    } else {
      // Handle final submission with all collected data
      const reservationData = {
        personalDetails: personalDetails || methods.getValues(),
        date: selectedDate,
        time: startTime,
        duration,
        selectedTables,
      };
      
      console.log("Reservation Data:", reservationData);
      toast.success("Reservation confirmed!");
      onReservationSuccess(true);
    }
  };

  const handleReset = () => {
    methods.reset();
    setSelectedDate(null);
    setStartTime(null);
    setDuration(30);
    setSelectedTables([]);
    setPersonalDetails(null);
    setCurrentStep(1);
    onReservationSuccess(false);
  };

  const isNextDisabled =
    (currentStep === 1 && !methods.formState.isValid) ||
    (currentStep === 2 && (!selectedDate || !startTime)) ||
    (currentStep === 3 && (selectedTables.length === 0 || selectedTables.reduce((sum, tableId) => {
      const table = tables.find(t => t.tableId === tableId);
      return sum + (table ? table.seats : 0);
    }, 0) < guests));

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
            TOTAL_GUESTS={guests}
            tables={tables}
          />
        )}
        {!loading && currentStep === 4 && (
          <ConfirmationStep
            selectedDate={selectedDate}
            startTime={startTime}
            duration={duration}
            selectedTables={selectedTables}
            personalDetails={personalDetails || methods.getValues()}
          />
        )}
        {!loading && currentStep === 5 && (
          <SuccessStep
            selectedDate={selectedDate}
            startTime={startTime}
            duration={duration}
            selectedTables={selectedTables}
            personalDetails={personalDetails || methods.getValues()}
            onReset={handleReset}
          />
        )}
        {currentStep < 5 && (
          <FormActions
            currentStep={currentStep}
            totalSteps={5}
            onNext={() => handleStepChange('next')}
            onBack={() => handleStepChange('prev')}
            onSubmit={methods.handleSubmit(onSubmit)}
            isNextDisabled={isNextDisabled}
            isSubmitDisabled={false}
          />
        )}
      </form>
    </FormProvider>
  );
}