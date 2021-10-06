import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '.';
import { Provider } from 'react-redux';
import { RootState } from 'src/store/store';


describe('Home Page test', () => {
  it('Home Page should render correctly', () => {
    const { getByText } = render(
      // <Provider store={initialState}>
      <Home />
      // </Provider>
    );
    const btnStartGame = getByText(/Start new game/i);
    const btnConnectToGame = getByText(/Connect/i);
    expect(btnStartGame).toBeInTheDocument();
    expect(btnConnectToGame).toBeInTheDocument();
  })  
})