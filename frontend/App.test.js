import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import axios from 'axios';

// Mock axios for testing
jest.mock('axios');

test('renders the calculator input form and displays result', async () => {
    render(<App />);

    // Check if input field is rendered
    const inputElement = screen.getByPlaceholderText(/Enter numbers/i);
    expect(inputElement).toBeInTheDocument();

    // Mock API response
    axios.post.mockResolvedValue({ data: { sum: 6 } });

    // Simulate user input
    fireEvent.change(inputElement, { target: { value: '1,2,3' } });

    // Simulate form submission
    const buttonElement = screen.getByText(/Calculate Sum/i);
    fireEvent.click(buttonElement);

    // Check for the correct sum to be displayed
    const resultElement = await screen.findByText(/Sum: 6/i);
    expect(resultElement).toBeInTheDocument();
});

test('displays error message for negative numbers', async () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/Enter numbers/i);
    axios.post.mockRejectedValue({ response: { data: 'Negative numbers not allowed: -2' } });

    fireEvent.change(inputElement, { target: { value: '1,-2,3' } });
    const buttonElement = screen.getByText(/Calculate Sum/i);
    fireEvent.click(buttonElement);

    const errorElement = await screen.findByText(/Negative numbers not allowed: -2/i);
    expect(errorElement).toBeInTheDocument();
});
