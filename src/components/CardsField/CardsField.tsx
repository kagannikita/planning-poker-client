import cls from './CardsField.module.scss'

import React, { useState } from 'react'
import Card from '../Card/Card'

type CardsFieldProps = {
	cards: {
		name?: string
		is_cover?: boolean
		image: string
	}[]
	cardIsOpen?: boolean
	pickCards?: boolean
}

const CardsField: React.FC<CardsFieldProps> = ({ cards, cardIsOpen = true, pickCards = false }: CardsFieldProps) => {
	const [indexOfSelectedCard, setIndexOfSelectedCard] = useState<number>(0)

	return (
		<div className={cls.cardsField}>
			{cards.map(({ image }, index) => {
				let cardIsSelected = false
				if (pickCards && indexOfSelectedCard === index) cardIsSelected = true
				return (
					<Card
						index={index}
						key={Math.random() * 1000}
						image={image}
						cardIsOpen={cardIsOpen}
						cardIsSelected={cardIsSelected}
						setIndexOfSelectedCard={setIndexOfSelectedCard}
						pickCards={pickCards}
					/>
				)
			})}
		</div>
	)
}

export default CardsField
