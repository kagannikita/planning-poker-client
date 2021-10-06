import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import IssueContainer from './IssueContainer';
import { Role } from '../../../interfaces/LobbyTypes';

const createIssue = () => jest.fn()
const removeIssue = () => jest.fn()
const updateIssue = () => jest.fn()
const createIssuesFromFile = () => jest.fn()

describe('IssueContainer component test', () => {
	it('IssueContainer component should render correctly', () => {
		const { getByText } = render(
			<IssueContainer
				type={'lobby'}
				playerRole={Role.dealer} 
				issues={undefined} 
				lobbyID={'12345'}
				createIssue={createIssue}
				removeIssue={removeIssue}
				updateIssue={updateIssue}
				createIssuesFromFile={createIssuesFromFile} />
		);
		const title = getByText(/Issues:/i);
		expect(title).toBeInTheDocument();
	})

})