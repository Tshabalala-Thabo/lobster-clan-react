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
import useReservation from "../../hooks/useReservation";

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
  const [availableTables, setAvailableTables] = useState([]);

  const { loading: checkingAvailability, error: availabilityError, checkAvailability } = useReservation();

  // Watch the "guests" field from the form
  const guests = methods.watch("guests");

  const handleStepChange = async (direction) => {
    if (direction === 'next') {
      if (currentStep === 1) {
        // Store personal details when moving from step 1
        const formData = methods.getValues();
        setPersonalDetails({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          guests: formData.guests
        });
        setCurrentStep(2);
      }
      else if (currentStep === 2) {
        // Check availability before proceeding to table selection
        const result = await checkAvailability({
          guests,
          date: selectedDate,
          duration
        });

        if (result.success) {
          setAvailableTables(result.availableTables); // Store available tables
          setCurrentStep(3); // Proceed to the next step
        } else {
          toast.error(result.message || 'Failed to check availability');
          console.log("result message ", result)
        }
      }
      else {
        setCurrentStep(prev => prev + 1);
      }
    } else {
      setCurrentStep(prev => prev - 1);
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
      // Combine date and time into a single value
      const reservationStart = new Date(selectedDate);
      reservationStart.setHours(startTime.getHours(), startTime.getMinutes());

      // Prepare the reservation data
      const reservationData = {
        personalDetails: personalDetails || methods.getValues(),
        date: reservationStart.toISOString(), // Use the combined date and time
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

  // Calculate total seats from selected tables
  const totalSeats = selectedTables.reduce((sum, tableId) => {
    const table = availableTables.find(t => t.tableId === tableId);
    return sum + (table ? table.seats : 0);
  }, 0);

  const isNextDisabled =
    (currentStep === 1 && !methods.formState.isValid) ||
    (currentStep === 2 && (!selectedDate || !startTime || checkingAvailability)) ||
    (currentStep === 3 && (selectedTables.length === 0 || totalSeats < guests));

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        {(loading || checkingAvailability) && (
          <div className="flex justify-center items-center">
            <Oval type="Oval" color="#ff0000" height={50} width={50} />
          </div>
        )}
        {!loading && !checkingAvailability && currentStep === 1 && <PersonalDetailsStep />}
        {!loading && !checkingAvailability && currentStep === 2 && (
          <DateTimeStep
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            startTime={startTime}
            setStartTime={setStartTime}
            duration={duration}
            setDuration={setDuration}
          />
        )}
        {!loading && !checkingAvailability && currentStep === 3 && (
          <TableSelectionStep
            selectedTables={selectedTables}
            setSelectedTables={setSelectedTables}
            TOTAL_GUESTS={guests}
            tables={availableTables} // Use available tables from state
          />
        )}
        {!loading && !checkingAvailability && currentStep === 4 && (
          <ConfirmationStep
            selectedDate={selectedDate}
            startTime={startTime}
            duration={duration}
            selectedTables={selectedTables}
            personalDetails={personalDetails || methods.getValues()}
          />
        )}
        {!loading && !checkingAvailability && currentStep === 5 && (
          <SuccessStep
            selectedDate={selectedDate}
            startTime={startTime}
            duration={duration}
            selectedTables={selectedTables}
            personalDetails={personalDetails || methods.getValues()}
            onReset={handleReset}
          />
        )}
        {currentStep < 5 && !loading && !checkingAvailability && (
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
        {availabilityError && (
          <div className="text-red-500 text-center mt-2">
            {availabilityError} (errrr)
          </div>
        )}
      </form>
    </FormProvider>
  );
}