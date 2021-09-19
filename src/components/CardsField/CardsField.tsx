import cls from './CardsField.module.scss'

import React, { useState } from 'react'
import Card from '../Card/Card'
import { ICardSettings } from 'src/interfaces/LobbyTypes'

type CardsFieldProps = {
	cards: ICardSettings[]
	cardIsOpen?: boolean
	pickCards?: boolean
	scoreType: string
	scoreTypeShort: string
	deleteCard?: (index: number) => void
	setCardValue?: (value: string, cardIndex: number) => void
}

const CardsField: React.FC<CardsFieldProps> = ({
	cards,
	cardIsOpen = true,
	pickCards = false,
	scoreType,
	scoreTypeShort,
	deleteCard,
	setCardValue,
}: CardsFieldProps) => {
	const [indexOfSelectedCard, setIndexOfSelectedCard] = useState<number>(0)

	return (
		<div className={cls.cardsField}>
			{ cards.map((card, index) => {
				
				let cardIsSelected = false
				if (pickCards && indexOfSelectedCard === index) cardIsSelected = true
				return (
					<Card
						index={index}
						key={card.id}
						image={card.image}
						cardIsOpen={cardIsOpen}
						cardIsSelected={cardIsSelected}
						setIndexOfSelectedCard={setIndexOfSelectedCard}
						pickCards={pickCards}
						scoreTypeShort={scoreTypeShort}
						cardValue={card.name}
						deleteCard={deleteCard}
						setCardValue={setCardValue}
					/>
				)
			})}
		</div>
	)
}

export default CardsField
