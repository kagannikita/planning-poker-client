import React, { useState } from 'react'
import SettingsForm from './SettingsForm/SettingsForm'
import CardsField from '../CardsField/CardsField'

const GameSettings: React.FC = () => {
	const [masterAsPlayer, setMasterAsPlayer] = useState(true)
	const [changingCards, setChangingCards] = useState(false)
	const [timerIsOn, setTimerIsOn] = useState(true)
	const [scoreType, setScoreType] = useState('story point')
	const [scoreTypeShort, setScoreTypeShort] = useState('SP')
	const [minutes, setMinutes] = useState('2')
	const [seconds, setSeconds] = useState('30')

	const [cards, setCards] = useState([
		{
			image: 'https://www.fonewalls.com/wp-content/uploads/1668x2224-Background-HD-Wallpaper-070.jpg',
		},
		{
			image: 'https://www.fonewalls.com/wp-content/uploads/1668x2224-Background-HD-Wallpaper-070.jpg',
		},
	])

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
						<CardsField cards={cards} cardIsOpen={false} pickCards={true} />
						<button className="cards-settings__btn" />
					</div>
				</div>
				<div className="cards-front">
					<h3 className="cards-settings__title">Add card values:</h3>
					<div className="cards-settings__wrapper">
						<CardsField cards={cards} />
						<button className="cards-settings__btn" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default GameSettings
