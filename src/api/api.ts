import axios from 'axios'
import { ILobby, IPlayer } from '../interfaces/LobbyTypes'
import * as React from 'react'
import io from 'socket.io-client'
import { useMemo } from 'react'

export enum API {
	MAIN_API = 'http://localhost:8080/',
	LOBBY = 'lobby/',
	PLAYER = 'player/',
}

export class Apis {
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

	addPlayerToLobby(lobbyID: string, playerID: string) {
		return new Promise((resolve, reject) => {
			axios
				.put(`${API.MAIN_API}${API.LOBBY}${lobbyID}`, {
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
