import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import IssueCardCreate from './IssueCardCreate';

const setModalCreate = () => jest.fn()

describe('IssueCardCreate component test', () => {
	it('IssueCardCreate component should render correctly', () => {
		const { getByText } = render(
			<IssueCardCreate 
				lobbyId={'lobbyId-123'} 
				setModalCreate={setModalCreate} />
		)
		const title = getByText(/Create Issue:/i);
		const btnAdd = getByText(/Add/i);
		expect(title).toBeInTheDocument();
		expect(btnAdd).toBeInTheDocument();
	})

})