import React, { FC, useEffect, useState } from 'react'
import SettingsForm from './SettingsForm/SettingsForm'
import CardsField from '../CardsField/CardsField'
import { IGameSettings } from 'src/interfaces/LobbyTypes'


interface GameSettingsProps {
	settings: IGameSettings
}

const GameSettings = ({ settings }:GameSettingsProps): JSX.Element => {
	const [masterAsPlayer, setMasterAsPlayer] = useState(settings.is_dealer_play)
	const [changingCards, setChangingCards] = useState(settings.is_change_cards)
	const [timerIsOn, setTimerIsOn] = useState(settings.timer_needed)
	const [scoreType, setScoreType] = useState(settings.score_type)
	const [scoreTypeShort, setScoreTypeShort] = useState(settings.score_type_short)
	const [minutes, setMinutes] = useState('2')
	const [seconds, setSeconds] = useState('30')

	useEffect(() => {
		// setCards(
		// 	cards.map((card) => {
		// 		if (card.scoreTypeShort !== 'default') card.scoreTypeShort = scoreTypeShort
		// 		return card
		// 	}),
		// )
	}, [scoreTypeShort])

	const [cards, setCards] = useState([
		{
			image: 'https://www.fonewalls.com/wp-content/uploads/1668x2224-Background-HD-Wallpaper-070.jpg',
			scoreTypeShort: 'default',
			cardValue: 'unknown',
		},
		{
			image: 'https://www.fonewalls.com/wp-content/uploads/1668x2224-Background-HD-Wallpaper-070.jpg',
			scoreTypeShort: '',
			cardValue: '1',
		},
		{
			image: 'https://www.fonewalls.com/wp-content/uploads/1668x2224-Background-HD-Wallpaper-070.jpg',
			scoreTypeShort: '',
			cardValue: '2',
		},
	])

	// const [cardCovers, setCardCovers] = useState([
	// 	{
	// 		image: 'https://www.fonewalls.com/wp-content/uploads/1668x2224-Background-HD-Wallpaper-070.jpg',
	// 	},
	// 	{
	// 		image: 'https://wallpaper.ru/images/detailed/1/5-004.jpg',
	// 	},
	// ])

	const deleteCard = (index: number) => {
		// setCards(cards.filter((card, i) => i !== index))
	}

	const addCard = () => {
		setCards([
			...cards,
			{
				image: 'https://www.fonewalls.com/wp-content/uploads/1668x2224-Background-HD-Wallpaper-070.jpg',
				scoreTypeShort,
				cardValue: 'unknown',
			},
		])
	}

	const addCover = (input: EventTarget & HTMLInputElement) => {
		const reader = new FileReader()
		if (!input.files) return
		const file = input.files[0]
		reader.readAsDataURL(file)
		reader.onload = () => {
			// setCardCovers([
			// 	...cardCovers,
			// 	{
			// 		image: reader.result as string,
			// 	},
			// ])
		}
	}

	const setCardValue = (value: string, cardIndex: number) => {

		// setCards(
		// 	cards.map((card, index) => {
		// 		if (index === cardIndex) {
		// 			card.cardValue = value
		// 		}
		// 		return card
		// 	}),
		// )
	}

	// TODO подготовить данные для отправки настроек

	const gameTimeInMS = (): number => {
		const minutesMS = Number(minutes) * 60 * 1000
		const secondsMS = Number(seconds) * 1000
		return minutesMS + secondsMS
	}

	const gameSettings = {
		masterAsPlayer,
		changingCards,
		timerIsOn,
		scoreType,
		scoreTypeShort,
		timer: gameTimeInMS(),
	}

	return (
		<div className="game-settings">
			<SettingsForm
				seconds={seconds}
				setSeconds={setSeconds}
				minutes={minutes}
				setMinutes={setMinutes}
				masterAsPlayer={masterAsPlayer}
				setMasterAsPlayer={setMasterAsPlayer}
				changingCards={changingCards}
				setChangingCards={setChangingCards}
				timerIsOn={timerIsOn}
				setTimerIsOn={setTimerIsOn}
				scoreType={scoreType}
				setScoreType={setScoreType}
				scoreTypeShort={scoreTypeShort}
				setScoreTypeShort={setScoreTypeShort}
			/>
			<div className="cards-settings">
				<div className="cards-cover">
					<h3 className="cards-settings__title">Select cover:</h3>
					<div className="cards-settings__wrapper">
						<CardsField cards={settings.cards} cardIsOpen={false} scoreType='' scoreTypeShort=''/>
						<div className="cards-settings__btn">
							<input className="cards-settings__inp" type="file" onChange={(e) => addCover(e.target)} />
						</div>
					</div>
				</div>
				<div className="cards-front">
					<h3 className="cards-settings__title">Add card values:</h3>
					<div className="cards-settings__wrapper">
						{/* <CardsField 
						cards={cards} 
						deleteCard={deleteCard} 
						setCardValue={setCardValue}
						scoreType={scoreType}
						scoreTypeShort={scoreTypeShort} /> */}
						<button className="cards-settings__btn" onClick={addCard} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default GameSettings
