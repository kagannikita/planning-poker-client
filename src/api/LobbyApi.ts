import axios from "axios"
import { ILobby } from "src/interfaces/LobbyTypes"
import { API } from "../interfaces/ApiEnum"

export default class LobbyAPI {
  getLobbyById(id: string): Promise<ILobby> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API.MAIN_API}${API.LOBBY}${id}`)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
  }
  createLobby(name: string): Promise<ILobby> {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API.MAIN_API}${API.LOBBY}`, { name })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
  }
}