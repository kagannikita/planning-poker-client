import axios from 'axios'
import { API } from '../interfaces/ApiEnum'
import io from 'socket.io-client'
import { IPlayer } from '../interfaces/LobbyTypes'

export default class PlayerAPI {
	getAllPlayers(): Promise<IPlayer[]> {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API.MAIN_API}${API.PLAYER}`)
				.then((res) => resolve(res.data))
				.catch((err) => reject(err))
		})
	}

	getPlayerById(id: string): Promise<IPlayer> {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API.MAIN_API}${API.PLAYER}${id}`)
				.then((res) => resolve(res.data))
				.catch((err) => reject(err))
		})
	}

	async createPlayer(data: FormData): Promise<IPlayer> {
		// return new Promise((resolve, reject) => {
		return await axios({
			method: 'post',
			url: `${API.MAIN_API}${API.PLAYER}`,
			data: data,
			headers: { 'Content-Type': 'multipart/form-data' },
		})
			.then((res) => res.data)
			.catch((err) => err)
		// .then((res) => resolve(res.data))
		// .catch((err) => reject(err))
		// })
	}

	deletePlayer(id: string): Promise<IPlayer> {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API.MAIN_API}${API.PLAYER}delete/${id}`)
				.then((res) => resolve(res.data))
				.catch((err) => reject(err))
		})
	}

	addPlayerToLobby(lobbyID: string, playerID: string) {
		return new Promise((resolve, reject) => {
			axios
				.put(`${API.MAIN_API}${API.LOBBY}add/${lobbyID}`, {
					player_id: playerID,
				})
				.then((res) => {
					resolve(res.data)
					const socket = io(API.MAIN_API)
					socket.on('connect', () => {
						socket.emit('join', {
							player_id: playerID,
							lobby_id: lobbyID,
						})
					})
				})
				.catch((err) => reject(err))
		})
	}
}
