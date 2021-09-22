import React from 'react'
import Timer from '../../Timer/Timer'
import { ISettings } from '../../../interfaces/SettingsTypes'

type SettingsFormProps = {
	settings: ISettings
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>
}

const SettingsForm: React.FC<SettingsFormProps> = ({ settings, setSettings }) => {
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
						defaultChecked={settings.masterAsPlayer}
						onChange={() => setSettings({ ...settings, masterAsPlayer: !settings.masterAsPlayer })}
					/>
					<label htmlFor="masterAsPlayer"> </label>
				</div>
			</div>
			<div className="form__item">
				<label htmlFor="changingCards" className="item-title">
					Changing cards in round end:
				</label>
				<div className="ui toggle checkbox">
					<input
						id="changingCards"
						type="checkbox"
						defaultChecked={settings.changingCards}
						onChange={() => setSettings({ ...settings, changingCards: !settings.changingCards })}
					/>
					<label htmlFor="changingCards"> </label>
				</div>
			</div>
			<div className="form__item">
				<label htmlFor="timerIsOn" className="item-title">
					Is timer needed:
				</label>
				<div className="ui toggle checkbox">
					<input
						id="timerIsOn"
						type="checkbox"
						defaultChecked={settings.timerIsOn}
						onChange={() => setSettings({ ...settings, timerIsOn: !settings.timerIsOn })}
					/>
					<label htmlFor="timerIsOn"> </label>
				</div>
			</div>
			<div className="form__item">
				<label htmlFor="deckOfCards" className="item-title">
					Deck of cards:
				</label>
				<select
					id="deckOfCards"
					className="item-select"
					value={settings.deckOfCards}
					onChange={(e) => setSettings({ ...settings, deckOfCards: e.target.value })}
				>
					<option value="fibonacci">Fibonacci numbers</option>
					<option value="planningPoker">Planning Poker</option>
					<option value="custom">Custom</option>
				</select>
			</div>
			<div className="form__item">
				<label htmlFor="scoreType" className="item-title">
					Score type:
				</label>
				<input
					className="item__inp"
					type="text"
					id="scoreType"
					value={settings.scoreType}
					onChange={(e) => setSettings({ ...settings, scoreType: e.target.value })}
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
					value={settings.scoreTypeShort}
					maxLength={3}
					onChange={(e) => setSettings({ ...settings, scoreTypeShort: e.target.value })}
				/>
			</div>
			<div className="form__item">
				<Timer
					minutes={settings.minutes}
					seconds={settings.seconds}
					settings={settings}
					setSettings={setSettings}
					isDisabled={false}
				/>
			</div>
		</form>
	)
}

export default SettingsForm
