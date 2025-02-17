import { useState } from 'react';
import api from '../config/axiosConfig'; // Update the import path

const useReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkAvailability = async ({ guests, date, duration }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/check-availability', {
        guests,
        date,
        duration,
      });
      const data = response.data;
      console.log("data from backend in hook", data);

      // Check if the response status is not in the range 200-299
      if (response.status < 200 || response.status >= 300) {
        throw new Error(data.message);
      }

      setLoading(false);
      return { success: data.success, message: data.message, availableTables: data.availableTables };
    } catch (err) {
      setError(err.message || 'Failed to check availability');
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const submitReservation = async ({ name, email, phone, guests, date, duration, selectedTables }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/submit-reservation', {
        name,
        email,
        phone,
        guests,
        date,
        duration,
        selectedTables,
      });
      const data = response.data;
      console.log("Reservation submitted successfully:", data);

      // Check if the response status is not in the range 200-299
      if (response.status < 200 || response.status >= 300) {
        throw new Error(data.message);
      }

      setLoading(false);
      return { success: true, message: data.message };
    } catch (err) {
      setError(err.message || 'Failed to submit reservation');
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const checkTimeSlots = async ({ guests, date }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/check-time-slots', {
        guests,
      });
      const data = response.data;
      console.log("Time slots data from backend:", data);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(data.message);
      }

      setLoading(false);
      return { success: true, timeSlots: data.timeSlots, message: data.message };
    } catch (err) {
      setError(err.message || 'Failed to fetch available time slots');
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  return {
    loading,
    error,
    checkAvailability,
    submitReservation,
    checkTimeSlots, // Add the new method to the returned object
  };
};

export default useReservation;