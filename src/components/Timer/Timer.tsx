import React from 'react'

type TimerProps = {
	minutes: string
	seconds: string
	setMinutes: React.Dispatch<React.SetStateAction<string>>
	setSeconds: React.Dispatch<React.SetStateAction<string>>
	isDisabled?: boolean
}

const Timer: React.FC<TimerProps> = ({ minutes, seconds, setMinutes, setSeconds, isDisabled = true }: TimerProps) => {
	const validateTime = (time: string, setTime: React.Dispatch<React.SetStateAction<string>>) => {
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
			<div className="form__timer">
				<div className="timer__item">
					<label htmlFor="minutes" className="timer__title">
						minutes
					</label>
					<input
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
