import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeaderBlock } from './header';

describe('Header component test', () => {
  it('Should render Header component', () => {
    const { getByText } = render(
      <HeaderBlock />
    );
    const title = getByText(/Planning Poker/i);
    expect(title).toBeInTheDocument();
  })
})