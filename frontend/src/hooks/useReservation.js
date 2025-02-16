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

  return {
    loading,
    error,
    checkAvailability,
  };
};

export default useReservation;