import { render, screen } from '@testing-library/react';
import App from './app';


it('renders products link', () => {
  render(<App />);
  const linkElement = screen.getByText(/products/i);
  expect(linkElement).toBeInTheDocument();
});
