import axios from 'axios'

export enum API {
	MAIN_API = 'http://localhost:8080/',
	LOBBY = 'lobby/',
	PLAYER = 'player/',
}

export class Apis {
	async createPlayer(data: FormData) {
		const res = await axios.put(`${API.MAIN_API}${API.PLAYER}`, data)
		return res
	}

	async createLobby(name: string) {
		const res = await axios.put(`${API.MAIN_API}${API.LOBBY}`, name)
		return res
	}

	async addPlayerToLobby(lobbyID: string, playerID: string) {
		const res = await axios
			.put(`${API.MAIN_API}${API.LOBBY}${lobbyID}`, {
				player_id: playerID,
			})
			.then((res) => res.data)
			.catch((err) => err)
		return res
	}
}
