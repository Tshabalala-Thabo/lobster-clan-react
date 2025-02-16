import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { setHours, setMinutes, isToday } from "date-fns";

export default function DateTimeStep({ selectedDate, setSelectedDate, startTime, setStartTime, duration, setDuration }) {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    // Function to generate the next 7 days starting from today
    const getNext7Days = () => {
        const days = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            days.push(date);
        }
        return days;
    };

    // Function to generate time slots based on constraints
    const getTimeSlots = () => {
        const slots = [];
        const startHour = 10; // 10:00 AM
        const endHour = 21; // 9:00 PM
        const interval = 30; // 30 minutes

        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        for (let hour = startHour; hour <= endHour; hour++) {
            for (let minute = 0; minute < 60; minute += interval) {
                // If the selected date is today, filter out past times
                if (isToday(selectedDate)) {
                    if (hour < currentHour || (hour === currentHour && minute < currentMinute)) {
                        continue; // Skip past times
                    }
                }
                const time = new Date(selectedDate);
                time.setHours(hour, minute, 0, 0);
                slots.push(time);
            }
        }
        return slots;
    };

    const next7Days = getNext7Days();
    const timeSlots = selectedDate ? getTimeSlots() : [];

    return (
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
            {/* Date Dropdown */}
            <div className="">
                <label className="block text-sm font-medium text-stone-700 mb-1">Select Date</label>
                <Controller
                    name="date"
                    control={control}
                    rules={{ required: "Date is required" }}
                    render={({ field }) => (
                        <select
                            value={selectedDate ? selectedDate.toISOString() : ""}
                            onChange={(e) => {
                                const date = new Date(e.target.value);
                                setSelectedDate(date);
                                field.onChange(date);
                                setStartTime(null); // Reset start time when date changes
                            }}
                            className="w-full px-3 py-2 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="" disabled>
                                Select a date
                            </option>
                            {next7Days.map((date, index) => (
                                <option key={index} value={date.toISOString()}>
                                    {date.toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </option>
                            ))}
                        </select>
                    )}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
            </div>

            {/* Time Dropdown */}
            {selectedDate && (
                <div className="relative">
                    <label className="block text-sm font-medium text-stone-700 mb-1">Select Start Time</label>
                    <Controller
                        name="startTime"
                        control={control}
                        rules={{ required: "Start time is required" }}
                        render={({ field }) => (
                            <select
                                value={startTime ? startTime.toISOString() : ""}
                                onChange={(e) => {
                                    const time = new Date(e.target.value);
                                    setStartTime(time);
                                    field.onChange(time);
                                }}
                                className="w-full px-3 py-2 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                                style={{ maxHeight: "150px", overflowY: "auto" }}
                            >
                                <option value="" disabled>
                                    Select a time
                                </option>
                                {timeSlots.map((time, index) => (
                                    <option key={index} value={time.toISOString()}>
                                        {time.toLocaleTimeString("en-US", {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>}
                </div>
            )}

            {/* Duration */}
            {selectedDate && startTime && (
                <div className="w-full">
                    <label htmlFor="duration" className="block text-sm font-medium text-stone-700 mb-1">
                        Duration (minutes)
                    </label>
                    <select
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        {[30, 60, 90, 120, 150, 180].map((minutes) => (
                            <option key={minutes} value={minutes}>
                                {minutes} minutes
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}