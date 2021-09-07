import axios from 'axios'

export enum API {
	MAIN_API = 'http://localhost:8080/',
	LOBBY = 'lobby/',
	PLAYER = 'player/',
}

export class Apis {
	async createPlayer(data: FormData) {
		return await axios.post(`${API.MAIN_API}${API.PLAYER}`, data)
	}

	async createLobby(name: string) {
		return await axios.post(`${API.MAIN_API}${API.LOBBY}`, name)
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
