import cls from './CardsField.module.scss'

import React, { useState } from 'react'
import Card from '../Card/Card'

type CardsFieldProps = {
	cards: {
		name?: string
		is_cover?: boolean
		image: string
		scoreTypeShort?: string
		cardValue?: string
	}[]
	cardIsOpen?: boolean
	pickCards?: boolean
	deleteCard?: (index: number) => void
	setCardValue?: (value: string, cardIndex: number) => void
}

const CardsField: React.FC<CardsFieldProps> = ({
	cards,
	cardIsOpen = true,
	pickCards = false,
	deleteCard,
	setCardValue,
}: CardsFieldProps) => {
	const [indexOfSelectedCard, setIndexOfSelectedCard] = useState<number>(0)

	return (
		<div className={cls.cardsField}>
			{cards.map(({ image, scoreTypeShort = 'default', cardValue = 'unknown' }, index) => {
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
						scoreTypeShort={scoreTypeShort}
						cardValue={cardValue}
						deleteCard={deleteCard}
						setCardValue={setCardValue}
					/>
				)
			})}
		</div>
	)
}

export default CardsField
