import React, { useState } from 'react'

import cls from './Card.module.scss'

export type CardProps = {
	image: string
	cardIsOpen: boolean
	cardIsSelected?: boolean
	index: number
	selectCard: (index: number) => void
	pickCards: boolean
	scoreTypeShort: string
	cardValue: string
	deleteCard?: (index: number) => void
	setCardValue?: (value: string, cardIndex: number) => void
}

const Card: React.FC<CardProps> = ({
	image,
	cardIsOpen,
	cardIsSelected = false,
	index,
	selectCard,
	pickCards,
	scoreTypeShort,
	cardValue,
	deleteCard,
	setCardValue,
}: CardProps) => {
	const cardStyle = [cls.cardContainer]
	const [editorStyle, setEditorStyle] = useState([cls.cardTitleInput])
	const [cardTitle, setCardTitle] = useState(cardValue)

	if (!cardIsOpen) cardStyle.push(cls.flipped)
	if (cardIsSelected) cardStyle.push(cls.cardSelected)

	const pickCard = () => {
		if (pickCards) selectCard(index)
	}

	if (!pickCards) cardStyle.push(cls.noPick)

	return (
		<div
			role="button"
			tabIndex={0}
			className={cardStyle.join(' ')}
			onKeyDown={(e) => (e.key === 'Enter' ? pickCard : null)}
			onClick={pickCard}
		>
			<div className={cls.card}>
				<div className={cls.card__front}>
					<div className={cls.card__header}>
						<div className={cls.cardTitle}>{cardTitle}</div>
						<input
							value={cardTitle}
							className={editorStyle.join(' ')}
							type="text"
							onChange={(e) => setCardTitle(e.target.value)}
							onBlur={(e) => {
								if (setCardValue) setCardValue(e.target.value, index)
								setEditorStyle(editorStyle.filter((item) => item !== cls.visible))
							}}
						/>
						{deleteCard ? (
							<div className={cls.cardControl}>
								<button className={cls.cardBtn} onClick={() => setEditorStyle([...editorStyle, cls.visible])} />
								<button className={cls.cardBtn} onClick={() => (deleteCard ? deleteCard(index) : null)} />
							</div>
						) : null}
					</div>
					<div className={cls.card__main}>
						{scoreTypeShort !== 'default' && cardTitle !== 'unknown' ? (
							<p className={cls.cardTypeShort}>{scoreTypeShort}</p>
						) : (
							<div className={cls.cardDefaultPic} />
						)}
					</div>
					<div className={cls.card__footer}>
						<div className={cls.cardTitle}>{cardTitle}</div>
					</div>
				</div>
				<div className={cls.card__back} style={{ backgroundImage: `url(${image})` }} />
			</div>
		</div>
	)
}

export default Card
