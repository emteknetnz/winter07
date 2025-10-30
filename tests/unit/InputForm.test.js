import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import InputForm from '../../src/components/InputForm';

describe('InputForm', () => {
  const mockOnCalculate = jest.fn();

  beforeEach(() => {
    mockOnCalculate.mockClear();
  });

  it('should render all input fields', () => {
    render(<InputForm onCalculate={mockOnCalculate} />);

    expect(screen.getByLabelText(/current age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/retirement age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/current savings/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/annual contribution/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expected annual return/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tax rate on earnings/i)).toBeInTheDocument();
  });

  it('should render Autofill and Calculate buttons', () => {
    render(<InputForm onCalculate={mockOnCalculate} />);

    expect(screen.getByRole('button', { name: /autofill/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();
  });

  it('should disable Calculate button when form is invalid', () => {
    render(<InputForm onCalculate={mockOnCalculate} />);

    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    expect(calculateButton).toBeDisabled();
  });

  it('should enable Calculate button when all fields are valid', async () => {
    render(<InputForm onCalculate={mockOnCalculate} />);

    await userEvent.type(screen.getByLabelText(/current age/i), '30');
    await userEvent.type(screen.getByLabelText(/retirement age/i), '65');
    await userEvent.type(screen.getByLabelText(/current savings/i), '50000');
    await userEvent.type(screen.getByLabelText(/annual contribution/i), '10000');
    await userEvent.type(screen.getByLabelText(/expected annual return/i), '7');
    await userEvent.type(screen.getByLabelText(/tax rate on earnings/i), '15');

    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    expect(calculateButton).not.toBeDisabled();
  });

  it('should show validation error when retirement age is less than current age', async () => {
    render(<InputForm onCalculate={mockOnCalculate} />);

    await userEvent.type(screen.getByLabelText(/current age/i), '65');
    await userEvent.type(screen.getByLabelText(/retirement age/i), '30');

    expect(screen.getByText(/retirement age must be greater than current age/i)).toBeInTheDocument();
  });

  it('should show validation error when current age is greater than or equal to retirement age', async () => {
    render(<InputForm onCalculate={mockOnCalculate} />);

    await userEvent.type(screen.getByLabelText(/retirement age/i), '65');
    await userEvent.type(screen.getByLabelText(/current age/i), '65');

    expect(screen.getByText(/current age must be less than retirement age/i)).toBeInTheDocument();
  });

  it('should show validation error for negative current savings', async () => {
    render(<InputForm onCalculate={mockOnCalculate} />);

    const input = screen.getByLabelText(/current savings/i);
    await userEvent.clear(input);
    await userEvent.type(input, '-1000');

    expect(screen.getByText(/current savings must be non-negative/i)).toBeInTheDocument();
  });

  it('should show validation error for negative annual contribution', async () => {
    render(<InputForm onCalculate={mockOnCalculate} />);

    const input = screen.getByLabelText(/annual contribution/i);
    await userEvent.clear(input);
    await userEvent.type(input, '-500');

    expect(screen.getByText(/annual contribution must be non-negative/i)).toBeInTheDocument();
  });

  it('should show validation error for expected return out of range', async () => {
    render(<InputForm onCalculate={mockOnCalculate} />);

    const input = screen.getByLabelText(/expected annual return/i);
    await userEvent.clear(input);
    await userEvent.type(input, '150');

    expect(screen.getByText(/expected return must be between 0 and 100/i)).toBeInTheDocument();
  });

  it('should show validation error for tax rate out of range', async () => {
    render(<InputForm onCalculate={mockOnCalculate} />);

    const input = screen.getByLabelText(/tax rate on earnings/i);
    await userEvent.clear(input);
    await userEvent.type(input, '150');

    expect(screen.getByText(/tax rate must be between 0 and 100/i)).toBeInTheDocument();
  });

  it('should autofill form with default values when Autofill button is clicked', async () => {
    render(<InputForm onCalculate={mockOnCalculate} />);

    const autofillButton = screen.getByRole('button', { name: /autofill/i });
    await userEvent.click(autofillButton);

    expect(screen.getByLabelText(/current age/i)).toHaveValue(30);
    expect(screen.getByLabelText(/retirement age/i)).toHaveValue(65);
    expect(screen.getByLabelText(/current savings/i)).toHaveValue(50000);
    expect(screen.getByLabelText(/annual contribution/i)).toHaveValue(10000);
    expect(screen.getByLabelText(/expected annual return/i)).toHaveValue(7);
    expect(screen.getByLabelText(/tax rate on earnings/i)).toHaveValue(15);
  });

  it('should call onCalculate with correct data when form is submitted', async () => {
    render(<InputForm onCalculate={mockOnCalculate} />);

    await userEvent.type(screen.getByLabelText(/current age/i), '30');
    await userEvent.type(screen.getByLabelText(/retirement age/i), '65');
    await userEvent.type(screen.getByLabelText(/current savings/i), '50000');
    await userEvent.type(screen.getByLabelText(/annual contribution/i), '10000');
    await userEvent.type(screen.getByLabelText(/expected annual return/i), '7');
    await userEvent.type(screen.getByLabelText(/tax rate on earnings/i), '15');

    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    await userEvent.click(calculateButton);

    expect(mockOnCalculate).toHaveBeenCalledWith({
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 50000,
      annualContribution: 10000,
      expectedReturn: 7,
      taxRate: 15
    });
  });

  it('should not call onCalculate when form has validation errors', async () => {
    render(<InputForm onCalculate={mockOnCalculate} />);

    await userEvent.type(screen.getByLabelText(/current age/i), '65');
    await userEvent.type(screen.getByLabelText(/retirement age/i), '30');
    await userEvent.type(screen.getByLabelText(/current savings/i), '50000');
    await userEvent.type(screen.getByLabelText(/annual contribution/i), '10000');
    await userEvent.type(screen.getByLabelText(/expected annual return/i), '7');
    await userEvent.type(screen.getByLabelText(/tax rate on earnings/i), '15');

    const form = screen.getByRole('button', { name: /calculate/i }).closest('form');
    fireEvent.submit(form);

    expect(mockOnCalculate).not.toHaveBeenCalled();
  });

  it('should update validation errors in real-time', async () => {
    render(<InputForm onCalculate={mockOnCalculate} />);

    const currentAgeInput = screen.getByLabelText(/current age/i);
    await userEvent.type(currentAgeInput, '150');

    expect(screen.getByText(/current age must be between 0 and 120/i)).toBeInTheDocument();

    await userEvent.clear(currentAgeInput);
    await userEvent.type(currentAgeInput, '30');

    await waitFor(() => {
      expect(screen.queryByText(/current age must be between 0 and 120/i)).not.toBeInTheDocument();
    });
  });

  it('should accept decimal values for return rate and tax rate', async () => {
    render(<InputForm onCalculate={mockOnCalculate} />);

    await userEvent.type(screen.getByLabelText(/current age/i), '30');
    await userEvent.type(screen.getByLabelText(/retirement age/i), '65');
    await userEvent.type(screen.getByLabelText(/current savings/i), '50000');
    await userEvent.type(screen.getByLabelText(/annual contribution/i), '10000');
    await userEvent.type(screen.getByLabelText(/expected annual return/i), '7.5');
    await userEvent.type(screen.getByLabelText(/tax rate on earnings/i), '15.25');

    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    await userEvent.click(calculateButton);

    expect(mockOnCalculate).toHaveBeenCalledWith({
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 50000,
      annualContribution: 10000,
      expectedReturn: 7.5,
      taxRate: 15.25
    });
  });
});
