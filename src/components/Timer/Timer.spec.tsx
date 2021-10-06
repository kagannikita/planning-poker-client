// Timer
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Timer from './Timer';


describe('Timer component test', () => {
	it('Timer component should render correctly', () => {
		const {  getByTestId } = render(
			<Timer time={50} />
		);
		const inputSec = getByTestId(/seconds/i) as HTMLInputElement;
		expect(inputSec.value).toBe("50");
	})
})