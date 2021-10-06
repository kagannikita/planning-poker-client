import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameResultField from './GameResultField';

const cards: {
  name: string;
scoreTypeShort: string;
image: string;
}[] = [
	{
		name: '1',
		scoreTypeShort: 'SP',
		image: 'image-link',
	},
	{
		name: '2',
		scoreTypeShort: 'SP',
		image: 'image-link',
	},
	{
		name: '3',
		scoreTypeShort: 'SP',
		image: 'image-link',
	}
]

const values = [1, 1, 1]

describe('GameResultField component test', () => {
	it('GameResultField component should render correctly', () => {
		const { queryAllByText } = render(
			<GameResultField cards={cards} values={values} />
		);
		const percentNodes = queryAllByText(/33\..+%/i);
		percentNodes.forEach(node => {
			expect(node).not.toBeEmptyDOMElement()
		})
	})
})