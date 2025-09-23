import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sample badge button', () => {
  render(<App />);
  const button = screen.getByText(/view sample badge/i);
  expect(button).toBeInTheDocument();
});
