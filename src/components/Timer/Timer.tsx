import React, { useState } from 'react'
import { ISettings } from '../../interfaces/SettingsTypes'

type TimerProps = {
	time: number
	settings?: ISettings
	setSettings?: React.Dispatch<React.SetStateAction<ISettings>>
	isDisabled?: boolean
}

const Timer: React.FC<TimerProps> = ({ time, isDisabled = true, settings, setSettings }: TimerProps) => {
	const [clsTimer, setClsTimer] = useState(['form__timer'])

	if (!settings?.timerIsOn && !clsTimer.includes('disabled')) setClsTimer([...clsTimer, 'disabled'])
	if (settings?.timerIsOn && clsTimer.includes('disabled')) setClsTimer(clsTimer.filter((cls) => cls !== 'disabled'))

	const minutes = Math.floor(time / 60)
	const seconds = time - minutes * 60

	const validateMaxTime = (time: number) => {
		if (time > 59) return 59
		return time
	}

	const setMinutes = (min: string) => {
		if (!settings || !setSettings || min.length > 2) return
		const time = validateMaxTime(+min) * 60 + seconds
		setSettings({ ...settings, time })
	}

	const setSeconds = (sec: string) => {
		if (!settings || !setSettings || sec.length > 2) return
		const time = validateMaxTime(+sec) + minutes * 60
		setSettings({ ...settings, time })
	}

	return (
		<>
			<label htmlFor="minutes" className="item-title">
				Round time:
			</label>
			<div className={clsTimer.join(' ')}>
				<div className="timer__item">
					<label htmlFor="minutes" className="timer__title">
						minutes
					</label>
					<input
						type="number"
						className="timer__inp"
						id="minutes"
						disabled={isDisabled}
						value={minutes}
						onChange={(e) => setMinutes(e.target.value)}
					/>
				</div>
				<span className="timer__double-dot">:</span>
				<div className="timer__item">
					<label htmlFor="seconds" className="timer__title">
						seconds
					</label>
					<input
						type="number"
						className="timer__inp"
						id="seconds"
						disabled={isDisabled}
						value={seconds}
						onChange={(e) => setSeconds(e.target.value)}
					/>
				</div>
			</div>
		</>
	)
}

export default Timer
