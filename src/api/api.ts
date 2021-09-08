import axios from 'axios'
import { ILobby, IPlayer } from '../interfaces/LobbyTypes'

export enum API {
	MAIN_API = 'http://localhost:8080/',
	LOBBY = 'lobby/',
	PLAYER = 'player/',
}

export class Apis {
	async getAllPlayers(): Promise<IPlayer[]> {
		return await axios
			.get(`${API.MAIN_API}${API.PLAYER}`)
			.then((res) => res.data)
			.catch((err) => err)
	}

	async getPlayerById(id: string): Promise<IPlayer> {
		return await axios
			.get(`${API.MAIN_API}${API.PLAYER}${id}`)
			.then((res) => res.data)
			.catch((err) => err)
	}

	async createPlayer(data: FormData) {
		return await axios({
			method: 'post',
			url: `${API.MAIN_API}${API.PLAYER}`,
			data: data,
			headers: { 'Content-Type': 'multipart/form-data' },
		})
			.then((res) => res.data)
			.catch((err) => err)
	}

	async getLobbyById(id: string): Promise<ILobby> {
		return await axios
			.get(`${API.MAIN_API}${API.LOBBY}${id}`)
			.then((res) => res.data)
			.catch((err) => err)
	}
	async createLobby(name: string): Promise<ILobby> {
		return await axios
			.post(`${API.MAIN_API}${API.LOBBY}`, {
				name,
			})
			.then((res) => res.data)
			.catch((err) => err)
	}

	async addPlayerToLobby(lobbyID: string, playerID: string) {
		return await axios
			.put(`${API.MAIN_API}${API.LOBBY}${lobbyID}`, {
				player_id: playerID,
			})
			.then((res) => res.data)
			.catch((err) => err)
	}
}
