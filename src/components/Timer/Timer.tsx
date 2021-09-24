import React, { useState } from 'react'
import { ISettings } from '../../interfaces/SettingsTypes'

type TimerProps = {
	minutes: string
	seconds: string
	settings?: ISettings
	setSettings?: React.Dispatch<React.SetStateAction<ISettings>>
	isDisabled?: boolean
}

const Timer: React.FC<TimerProps> = ({ minutes, seconds, isDisabled = true, settings, setSettings }: TimerProps) => {
	const [clsTimer, setClsTimer] = useState(['form__timer'])

	if (!settings?.timerIsOn && !clsTimer.includes('disabled')) setClsTimer([...clsTimer, 'disabled'])
	if (settings?.timerIsOn && clsTimer.includes('disabled')) setClsTimer(clsTimer.filter((cls) => cls !== 'disabled'))

	const setMinutes = (min: string) => {
		if (!settings || !setSettings) return
		setSettings({ ...settings, minutes: min })
	}

	const setSeconds = (sec: string) => {
		if (!settings || !setSettings) return
		setSettings({ ...settings, seconds: sec })
	}

	const validateTime = (time: string, setTime: (arg: string) => void) => {
		if (time.length > 1) {
			if (time[0] === '0') {
				setTime(time[1])
			} else {
				setTime(time)
			}
		} else {
			setTime(time)
		}
		if (!time || Number(time) < 0) {
			setTime('0')
		}
		if (Number(time) > 59) {
			setTime('59')
		}
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
						maxLength={2}
						id="minutes"
						disabled={isDisabled}
						value={minutes}
						onChange={(e) => validateTime(e.target.value, setMinutes)}
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
						maxLength={2}
						id="seconds"
						disabled={isDisabled}
						value={seconds}
						onChange={(e) => validateTime(e.target.value, setSeconds)}
					/>
				</div>
			</div>
		</>
	)
}

export default Timer
