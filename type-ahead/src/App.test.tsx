import { render, screen } from '@testing-library/react';

import App from './App';

test('renders <App />', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Country/);
  expect(inputElement).toBeInTheDocument();
});
