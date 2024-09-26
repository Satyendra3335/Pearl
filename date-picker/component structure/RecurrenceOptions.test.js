// __tests__/RecurrenceOptions.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { create } from 'zustand';
import RecurrenceOptions from '../components/RecurrenceOptions';

// Create a mock Zustand store for testing
const useStore = create(set => ({
  recurrencePattern: '',
  frequency: 1,
  updateState: (newState) => set(state => ({ ...state, ...newState })),
}));

// Mock implementation of the RecurrenceOptions component
const MockRecurrenceOptions = (props) => (
  <useStore.Provider>
    <RecurrenceOptions {...props} />
  </useStore.Provider>
);

describe('RecurrenceOptions', () => {
  it('renders without crashing', () => {
    render(<MockRecurrenceOptions />);
    expect(screen.getByText(/Select Recurrence Pattern/i)).toBeInTheDocument();
  });

  it('allows user to select daily recurrence', () => {
    render(<MockRecurrenceOptions />);
    
    // Simulate user selecting the daily option
    fireEvent.click(screen.getByLabelText(/Daily/i));
    
    expect(useStore.getState().recurrencePattern).toBe('daily');
  });

  it('allows user to input frequency', () => {
    render(<MockRecurrenceOptions />);
    
    // Simulate user input for frequency
    const frequencyInput = screen.getByLabelText(/Frequency/i);
    fireEvent.change(frequencyInput, { target: { value: 3 } });

    expect(useStore.getState().frequency).toBe(3);
  });

  it('calls updateState when options change', () => {
    const updateStateMock = jest.fn();
    render(<MockRecurrenceOptions onChange={updateStateMock} />);
    
    // Simulate user selecting weekly recurrence
    fireEvent.click(screen.getByLabelText(/Weekly/i));

    expect(updateStateMock).toHaveBeenCalled();
  });
});
