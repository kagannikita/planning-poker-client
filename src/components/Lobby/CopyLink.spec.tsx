import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CopyLink from './CopyLink';


describe('CopyLink component test', () => {
  it('CopyLink component should render correctly', () => {
    const { getByText } = render(
      <CopyLink />
    );
    const title = getByText(/Lobby link:/i);
    expect(title).toBeInTheDocument();
  })

  // it('Copy button should copy link from input area correctly', async () => {
  //   const { getByText, getByPlaceholderText } = render(
  //     <CopyLink />
  //   );
  //   const input = getByPlaceholderText(/Lobby link/i) as HTMLInputElement;
  //   const btnCopy = getByText(/Copy/i);
  //   expect(btnCopy).toBeInTheDocument();
  //   userEvent.click(btnCopy);
  //   console.log(navigator.clipboard.readText());
  //   if (navigator.clipboard) {
      
  //     expect(navigator.clipboard.readText()).toBeTruthy()

  //   }
  // })
})