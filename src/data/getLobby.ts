import axios from 'axios'
import { ILobby } from '../interfaces/LobbyTypes'

const getLobby = async (lobbyID?: string) => {
	const res = await axios.get('lobby.json')
	const data = res.data as ILobby[]
	return data.find((lobby) => lobby.id === lobbyID)
}

export default getLobby
