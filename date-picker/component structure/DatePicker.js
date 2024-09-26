// components/DatePicker.js
import { useEffect } from 'react';
import { useStore } from '../store'; // Zustand store for state management
import RecurrenceOptions from './RecurrenceOptions';
import CalendarPreview from './CalendarPreview';

const DatePicker = () => {
  const { state, updateState, calculateRecurringDates } = useStore();

  useEffect(() => {
    // Calculate recurring dates whenever the recurrence options change
    if (state.startDate) {
      calculateRecurringDates();
    }
  }, [state.recurrencePattern, state.startDate, state.endDate, state.frequency]);

  return (
    <div className="p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Select Recurring Dates</h2>
      <RecurrenceOptions onChange={updateState} />
      <CalendarPreview selectedDates={state.selectedDates} />
    </div>
  );
};

export default DatePicker;
