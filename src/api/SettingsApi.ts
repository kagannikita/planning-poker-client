import axios from "axios";
import { API } from "src/interfaces/ApiEnum";
import { IGameSettings, ICardSettings } from "src/interfaces/LobbyTypes"


interface ISettingsAPI {
  createSettings(lobbyId: string, gameSettings: FormData): Promise<IGameSettings>
  createCard(cardData: FormData): Promise<ICardSettings>
  deleteCard(cardId: string): Promise<ICardSettings>
  updateCard(cardsId: string, body: FormData): Promise<ICardSettings>
}

export default class SettingsAPI implements ISettingsAPI {

  createSettings(lobbyId: string, gameSettings: FormData): Promise<IGameSettings> {
    return new Promise<IGameSettings>((resolve, reject) => {
      axios.put(`${API.MAIN_API + API.SETTINGS + lobbyId}`, gameSettings)
      .then(data => resolve(data.data))
      .catch(err => reject(err));
    })
  }

  createCard(cardData: FormData): Promise<ICardSettings> {
    return new Promise<ICardSettings>((resolve, reject) => {
      axios.post(`${API.MAIN_API + API.SETTINGS + API.CARDS}`, cardData, 
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(data => resolve(data.data))
        .catch(err => reject(err));
    })
  }
  deleteCard(cardId: string): Promise<ICardSettings> {
    return new Promise<ICardSettings>((resolve, reject) => {
      axios.delete(`${API.MAIN_API + API.SETTINGS + API.CARDS + cardId}`)
        .then(data => resolve(data.data))
        .catch(err => reject(err));
    })
  }
  updateCard(cardId: string, body: FormData): Promise<ICardSettings> {
    return new Promise<ICardSettings>((resolve, reject) => {
      axios.put(`${API.MAIN_API + API.SETTINGS + API.CARDS + cardId}`, body,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(data => resolve(data.data))
        .catch(err => reject(err));
    })
  }

}
