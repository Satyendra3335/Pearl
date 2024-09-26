import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatePicker from '../components/DatePicker';  // Import your date picker component

describe('DatePicker Integration Test', () => {
  it('should allow users to select daily recurring dates and display them in the preview', () => {
    // Render the DatePicker component
    render(<DatePicker />);

    // Select the "Daily" recurring option
    fireEvent.click(screen.getByText(/daily/i));

    // Select start date
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2024-09-26' }
    });

    // Select "Every 3 Days" recurrence
    fireEvent.change(screen.getByLabelText(/every x days/i), {
      target: { value: '3' }
    });

    // Assert that the preview displays the correct recurrence
    const preview = screen.getByTestId('recurrence-preview');
    expect(preview).toHaveTextContent('Sep 26, 2024');
    expect(preview).toHaveTextContent('Recurs every 3 days');
  });

  it('should allow users to customize weekly recurrence and display it on the calendar', () => {
    // Render the DatePicker component
    render(<DatePicker />);

    // Select the "Weekly" recurring option
    fireEvent.click(screen.getByText(/weekly/i));

    // Select start date
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2024-09-26' }
    });

    // Customize weekly recurrence to occur on Mondays and Thursdays
    fireEvent.click(screen.getByLabelText(/monday/i));
    fireEvent.click(screen.getByLabelText(/thursday/i));

    // Assert that the mini-calendar preview displays the correct recurrence
    const calendarPreview = screen.getByTestId('calendar-preview');
    expect(calendarPreview).toHaveTextContent('Mon, Sep 30');
    expect(calendarPreview).toHaveTextContent('Thu, Oct 3');
  });
});
