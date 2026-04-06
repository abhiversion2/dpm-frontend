import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders mood card', () => {
  render(<App />);
  expect(screen.getByText(/current vibe/i)).toBeInTheDocument();
});

test('renders mood slider', () => {
  render(<App />);
  const slider = screen.getByRole('slider');
  expect(slider).toBeInTheDocument();
});

test('renders lock in mood button', () => {
  render(<App />);
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
});

test('slider changes intensity level', () => {
  render(<App />);
  const slider = screen.getByRole('slider');
  fireEvent.change(slider, { target: { value: '75' } });
  expect(screen.getByText(/75/)).toBeInTheDocument();
});