import cls from './CardsField.module.scss'

import React, { useState } from 'react'
import Card from '../Card/Card'
import { GameDataType, GameState } from '../../interfaces/GameTypes'

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
	setDefaultCover?: (index: number) => void
	setSelectedCard?: (cardName: string) => void
	gameData?: GameDataType
}

const CardsField: React.FC<CardsFieldProps> = ({
	cards,
	cardIsOpen = true,
	pickCards = false,
	deleteCard,
	setCardValue,
	setDefaultCover,
	setSelectedCard,
	gameData,
}: CardsFieldProps) => {
	const [indexOfSelectedCard, setIndexOfSelectedCard] = useState<number | null>(null)

	const selectCard = (index: number) => {
		if (setDefaultCover) {
			setDefaultCover(index)
		}
		if (setSelectedCard) {
			setSelectedCard(cards[index].name!)
		}
		setIndexOfSelectedCard(index)
	}

	return (
		<div
			className={
				gameData && gameData?.status !== GameState.started ? `${cls.cardsField} ${cls.cardsDisabled}` : cls.cardsField
			}
		>
			{
				cards.length ? cards.map(({ image, scoreTypeShort = 'default', name = 'unknown' }, index) => {
					let cardIsSelected = false
					if (pickCards && indexOfSelectedCard === index) cardIsSelected = true
					return (
						<Card
							index={index}
							key={Math.random()}
							image={image}
							cardIsOpen={cardIsOpen}
							cardIsSelected={cardIsSelected}
							selectCard={selectCard}
							pickCards={pickCards}
							scoreTypeShort={scoreTypeShort}
							cardValue={name}
							deleteCard={deleteCard}
							setCardValue={setCardValue}
						/>
					)
				}) : <><h2>No result cards</h2></>
			}

		</div>
	)
}

export default CardsField
