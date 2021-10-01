import React from 'react'
import CardsField from '../CardsField/CardsField'

type GameResultFieldProps = {
	cards: { name: string; scoreTypeShort: string; image: string }[]
	values: number[]
}

const GameResultField: React.FC<GameResultFieldProps> = ({ cards, values }) => {
	let countValues = 0
	values.forEach((item) => (countValues += item))

	return (
		<>
			{cards.map((card, index) => {
				return (
					<div key={card.name}>
						<CardsField cards={[card]} />
						<p>{((values[index] / countValues) * 100).toFixed(2)}%</p>
					</div>
				)
			})}
		</>
	)
}

export default GameResultField
