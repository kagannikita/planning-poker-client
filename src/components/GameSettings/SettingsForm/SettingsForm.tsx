import React from 'react'
import Timer from '../../Timer/Timer'

type SettingsFormProps = {
	masterAsPlayer: boolean
	setMasterAsPlayer: React.Dispatch<React.SetStateAction<boolean>>
	changingCards: boolean
	setChangingCards: React.Dispatch<React.SetStateAction<boolean>>
	timerIsOn: boolean
	setTimerIsOn: React.Dispatch<React.SetStateAction<boolean>>
	scoreType: string
	setScoreType: React.Dispatch<React.SetStateAction<string>>
	scoreTypeShort: string
	setScoreTypeShort: React.Dispatch<React.SetStateAction<string>>
	minutes: string
	setMinutes: React.Dispatch<React.SetStateAction<string>>
	seconds: string
	setSeconds: React.Dispatch<React.SetStateAction<string>>
}

const SettingsForm: React.FC<SettingsFormProps> = ({ ...props }: SettingsFormProps) => {
	return (
		<form>
			<div className="form__item">
				<label htmlFor="masterAsPlayer" className="item-title">
					Scram master as player:
				</label>
				<div className="ui toggle checkbox">
					<input
						id="masterAsPlayer"
						type="checkbox"
						defaultChecked={props.masterAsPlayer}
						onClick={() => props.setMasterAsPlayer}
					/>
					<label htmlFor="masterAsPlayer"> </label>
				</div>
			</div>
			<div className="form__item">
				<label htmlFor="masterAsPlayer" className="item-title">
					Changing cards in round end:
				</label>
				<div className="ui toggle checkbox">
					<input
						id="changingCards"
						type="checkbox"
						defaultChecked={props.changingCards}
						onChange={() => props.setChangingCards}
					/>
					<label htmlFor="masterAsPlayer"> </label>
				</div>
			</div>
			<div className="form__item">
				<label htmlFor="masterAsPlayer" className="item-title">
					Is timer needed:
				</label>
				<div className="ui toggle checkbox">
					<input id="timerIsOn" type="checkbox" defaultChecked={props.timerIsOn} onChange={() => props.setTimerIsOn} />
					<label htmlFor="masterAsPlayer"> </label>
				</div>
			</div>
			<div className="form__item">
				<label htmlFor="scoreType" className="item-title">
					Score type:
				</label>
				<input
					className="item__inp"
					type="text"
					id="scoreType"
					value={props.scoreType}
					onChange={(e) => props.setScoreType(e.target.value)}
				/>
			</div>
			<div className="form__item">
				<label htmlFor="scoreTypeShort" className="item-title">
					Score type (Short):
				</label>
				<input
					className="item__inp"
					type="text"
					id="scoreTypeShort"
					value={props.scoreTypeShort}
					onChange={(e) => props.setScoreTypeShort(e.target.value)}
				/>
			</div>
			<div className="form__item">
				<Timer
					minutes={props.minutes}
					seconds={props.seconds}
					setMinutes={props.setMinutes}
					setSeconds={props.setSeconds}
					isDisabled={false}
				/>
			</div>
		</form>
	)
}

export default SettingsForm
