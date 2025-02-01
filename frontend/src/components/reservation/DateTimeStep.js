import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function DateTimeStep({ selectedDate, setSelectedDate, startTime, setStartTime, duration, setDuration }) {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
            {/* Date Picker */}
            <div className="">
                <label className="block text-sm font-medium text-stone-700 mb-1">Select Date</label>
                <Controller
                    name="date"
                    control={control}
                    rules={{ required: "Date is required" }}
                    render={({ field }) => (
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => {
                                setSelectedDate(date);
                                field.onChange(date);
                            }}
                            minDate={new Date()}
                            dateFormat="MMMM d, yyyy"
                            className="w-full px-3 py-2 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholderText="Select a date"
                        />
                    )}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
            </div>

            {/* Time Picker */}
            {selectedDate && (
                <div className="">
                    <label className="block text-sm font-medium text-stone-700 mb-1">Select Start Time</label>
                    <Controller
                        name="startTime"
                        control={control}
                        rules={{ required: "Start time is required" }}
                        render={({ field }) => (
                            <DatePicker
                                selected={startTime}
                                onChange={(time) => {
                                    setStartTime(time);
                                    field.onChange(time);
                                }}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                minTime={setHours(setMinutes(new Date(), 0), 10)}
                                maxTime={setHours(setMinutes(new Date(), 30), 21)}
                                className="w-full px-3 py-2 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholderText="Select a time"
                            />
                        )}
                    />
                    {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>}
                </div>
            )}

            {/* Duration */}
            {selectedDate && startTime && (
                <div className="w-full"> {/* Full width on all screens */}
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