import React from 'react';
import { render } from '@testing-library/react';
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
})