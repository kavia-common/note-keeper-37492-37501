import { render } from '@testing-library/react';
import App from './App';

test('renders app container without crashing', () => {
  render(<App />);
});
