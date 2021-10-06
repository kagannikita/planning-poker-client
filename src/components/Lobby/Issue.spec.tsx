import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Issue from './Issue';
import { Role } from '../../interfaces/LobbyTypes';

const setModalChange = () => jest.fn()
const setModalDelete = () => jest.fn()
const setIsCurrentIdState = () => jest.fn()

describe('Issue component test', () => {
	it('Issue component should render correctly', () => {
		const { getByText } = render(
			<Issue type={'lobby'} 
				playerRole={Role.dealer} 
				isCurrentIdState={'id-321'} 
				setModalChange={setModalChange}
				setModalDelete={setModalDelete}
				setIsCurrentIdState={setIsCurrentIdState}
				id={'my-id'} 
				name={'issue 1'} 
				priority={'low'} 
				lobby={'lobbyID-123'} 
				link={'issue link'} 
				score={'89'} />  );
		const title = getByText(/issue 1/i);
		const linkTitle = getByText(/issue link/i);
		expect(title).toBeInTheDocument();
		expect(linkTitle).toBeInTheDocument();
	})

	it('Issue component should have class lowPriority', () => {
		const { getByTestId } = render(
			<Issue type={'lobby'}
				playerRole={Role.dealer}
				isCurrentIdState={'id-321'}
				setModalChange={setModalChange}
				setModalDelete={setModalDelete}
				setIsCurrentIdState={setIsCurrentIdState}
				id={'my-id'}
				name={'issue 1'}
				priority={'low'}
				lobby={'lobbyID-123'}
				link={'issue link'}
				score={'89'} />);
		const issue = getByTestId('issue')
		expect(issue).toHaveClass('lowPriority')
	})

	it('Issue component should have class highPriority', () => {
		const { getByTestId } = render(
			<Issue type={'game'}
				playerRole={Role.dealer}
				isCurrentIdState={'id-321'}
				setModalChange={setModalChange}
				setModalDelete={setModalDelete}
				setIsCurrentIdState={setIsCurrentIdState}
				id={'my-id'}
				name={'issue 1'}
				priority={'high'}
				lobby={'lobbyID-123'}
				link={'issue link'}
				score={'89'} />);
		const issue = getByTestId('issue')
		expect(issue).toHaveClass('highPriority')
	})

})