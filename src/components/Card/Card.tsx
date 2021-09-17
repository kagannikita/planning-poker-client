import React from 'react'

import cls from './Card.module.scss'

export type CardProps = {
	image: string
	cardIsOpen: boolean
	cardIsSelected?: boolean
	index: number
	setIndexOfSelectedCard: React.Dispatch<React.SetStateAction<number>>
	pickCards: boolean
}

const Card: React.FC<CardProps> = ({
	image,
	cardIsOpen,
	cardIsSelected = false,
	index,
	setIndexOfSelectedCard,
	pickCards,
}: CardProps) => {
	const cardStyle = [cls.cardContainer]

	if (!cardIsOpen) cardStyle.push(cls.flipped)
	if (cardIsSelected) cardStyle.push(cls.cardSelected)

	const pickCard = () => {
		if (pickCards) setIndexOfSelectedCard(index)
	}

	return (
		<div
			role="button"
			tabIndex={0}
			className={cardStyle.join(' ')}
			onKeyDown={(e) => (e.key === 'Enter' ? pickCard : null)}
			onClick={pickCard}
		>
			<div className={cls.card}>
				<div className={cls.card__front} />
				<div className={cls.card__back} style={{ backgroundImage: `url(${image})` }} />
			</div>
		</div>
	)
}

export default Card
