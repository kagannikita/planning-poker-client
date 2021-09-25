import React, { useEffect, useState } from 'react'
import SettingsForm from './SettingsForm/SettingsForm'
import CardsField from '../CardsField/CardsField'
import { ISettings } from '../../interfaces/SettingsTypes'
import * as XLSX from 'xlsx'
import { IssuesAPI } from '../../api/IssuesAPI'
import { IssueTypeAPI } from '../../interfaces/IssueType'

type GameSettingsProps = {
	settings: ISettings
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>
	lobbySettingsId: string
	cards: { image: string; scoreTypeShort: string; name: string }[]
	setCards: React.Dispatch<React.SetStateAction<{ image: string; scoreTypeShort: string; name: string }[]>>
	defaultCover: string
	setDefaultCover: React.Dispatch<React.SetStateAction<string>>
}

const GameSettings: React.FC<GameSettingsProps> = ({
	settings,
	setSettings,
	cards,
	setCards,
	defaultCover,
	setDefaultCover,
}) => {
	const getDefaultCover = (index: number) => {
		let cover = 'https://res.cloudinary.com/plaining-poker/image/upload/v1631879184/dibpHF_vba7zs.jpg'
		cardCovers.forEach((card, i) => {
			if (index === i) cover = card.image
		})
		setDefaultCover(cover)
	}

	useEffect(() => {
		setCards(
			cards.map((card) => {
				if (card.scoreTypeShort !== 'default') card.scoreTypeShort = settings.scoreTypeShort
				return card
			}),
		)
	}, [settings.scoreTypeShort])

	const [cardCovers, setCardCovers] = useState([
		{
			image: 'https://res.cloudinary.com/plaining-poker/image/upload/v1631879184/dibpHF_vba7zs.jpg',
		},
		{
			image: 'https://res.cloudinary.com/plaining-poker/image/upload/v1631879177/scale_1200_zwr5jo.jpg',
		},
		{
			image: 'https://res.cloudinary.com/plaining-poker/image/upload/v1631879169/linii-ogni-sfera_sxd6ry.jpg',
		},
	])

	const deleteCard = (index: number) => {
		setCards(cards.filter((card, i) => i !== index))
	}

	const addCard = () => {
		setCards([
			...cards,
			{
				image: defaultCover,
				scoreTypeShort: settings.scoreTypeShort,
				name: 'unknown',
			},
		])
	}

	const addCover = (input: EventTarget & HTMLInputElement) => {
		const reader = new FileReader()
		if (!input.files) return
		const file = input.files[0]
		reader.readAsDataURL(file)
		reader.onload = () => {
			setCardCovers([
				...cardCovers,
				{
					image: reader.result as string,
				},
			])
		}
	}

	const setCardValue = (value: string, cardIndex: number) => {
		setCards(
			cards.map((card, index) => {
				if (index === cardIndex) {
					card.name = value
				}
				return card
			}),
		)
	}

	return (
		<div className="game-settings">
			<SettingsForm settings={settings} setSettings={setSettings} />
			<div className="cards-settings">
				<div className="cards-cover">
					<h3 className="cards-settings__title">Select cover:</h3>
					<div className="cards-settings__wrapper">
						<CardsField cards={cardCovers} cardIsOpen={false} pickCards={true} setDefaultCover={getDefaultCover} />
						<div className="cards-settings__btn">
							<input className="cards-settings__inp" type="file" onChange={(e) => addCover(e.target)} />
						</div>
					</div>
				</div>
				<div className="cards-front">
					<h3 className="cards-settings__title">Add card values:</h3>
					<div className="cards-settings__wrapper">
						<CardsField cards={cards} deleteCard={deleteCard} setCardValue={setCardValue} />
						<button className="cards-settings__btn" onClick={addCard} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default GameSettings
