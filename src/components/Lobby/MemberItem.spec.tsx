// MemberItem
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MemberItem from './MemberItem';
import { Role } from '../../interfaces/LobbyTypes';

describe('MemberItem component test', () => {
	it('MemberItem component should render correctly', () => {
		const name = 'John'
		const lastName = 'Smith'
		const { getByText } = render(
			<MemberItem 
				id={'123123'} 
				role={Role.player} 
				firstName={name}
				lastName={lastName}
			/>
		)
		const titleName = getByText(`${name} ${lastName}`);
		expect(titleName).toBeInTheDocument();
	})

})