import axios from 'axios'
import { ICardSettings, IGameSettings, IGameSettingsToUpload } from '../interfaces/LobbyTypes'
import { API } from '../interfaces/ApiEnum'

interface ISettingsAPI {
	createSettings(settingsId: string, gameSettings: IGameSettingsToUpload): Promise<IGameSettings>
	createCard(cardData: FormData): Promise<ICardSettings>
	deleteCard(cardId: string): Promise<ICardSettings>
	updateCard(cardsId: string, body: FormData): Promise<ICardSettings>
}

export default class SettingsAPI implements ISettingsAPI {
	createSettings(settingsId: string, gameSettings: IGameSettingsToUpload): Promise<IGameSettings> {
		return new Promise<IGameSettings>((resolve, reject) => {
			axios
				.put(`${API.MAIN_API + API.SETTINGS + settingsId}`, gameSettings)
				.then((data) => resolve(data.data))
				.catch((err) => reject(err))
		})
	}

	createCard(cardData: FormData): Promise<ICardSettings> {
		return new Promise<ICardSettings>((resolve, reject) => {
			axios
				.post(`${API.MAIN_API + API.SETTINGS + API.CARDS}`, cardData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				.then((data) => resolve(data.data))
				.catch((err) => reject(err))
		})
	}
	deleteCard(cardId: string): Promise<ICardSettings> {
		return new Promise<ICardSettings>((resolve, reject) => {
			axios
				.delete(`${API.MAIN_API + API.SETTINGS + API.CARDS + cardId}`)
				.then((data) => resolve(data.data))
				.catch((err) => reject(err))
		})
	}
	updateCard(cardId: string, body: FormData): Promise<ICardSettings> {
		return new Promise<ICardSettings>((resolve, reject) => {
			axios
				.put(`${API.MAIN_API + API.SETTINGS + API.CARDS + cardId}`, body, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				.then((data) => resolve(data.data))
				.catch((err) => reject(err))
		})
	}
}
