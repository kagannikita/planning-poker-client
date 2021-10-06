import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '.';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { playerSlice } from '../store/playerData';

const storeMock = createStore(playerSlice.reducer)

describe('Home Page test', () => {
	it('Home Page should render correctly', () => {
		const { getByText } = render(
			<Provider store={storeMock}>
				<Home />
			</Provider>
		);
		const btnStartGame = getByText(/Start new game/i);
		const btnConnectToGame = getByText(/^Connect$/i);
		expect(btnStartGame).toBeInTheDocument();
		expect(btnConnectToGame).toBeInTheDocument();
	})  
})