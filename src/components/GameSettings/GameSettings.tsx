import React, { useState } from 'react'
import SettingsForm from './SettingsForm/SettingsForm'

const GameSettings: React.FC = () => {
	const [masterAsPlayer, setMasterAsPlayer] = useState(true)
	const [changingCards, setChangingCards] = useState(false)
	const [timerIsOn, setTimerIsOn] = useState(true)
	const [scoreType, setScoreType] = useState('story point')
	const [scoreTypeShort, setScoreTypeShort] = useState('SP')
	const [minutes, setMinutes] = useState('2')
	const [seconds, setSeconds] = useState('30')

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
			<div className="cards">tratata</div>
		</div>
	)
}

export default GameSettings
