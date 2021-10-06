import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './footer';

describe('Footer component test', () => {
  it('Should render footer component', () => {
    const { getByText } = render(
      <Footer />
    );
    const link = getByText(/Poker Planning on GitHub/i);
    expect(link).toBeInTheDocument();
  })
})