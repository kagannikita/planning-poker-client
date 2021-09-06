import axios from 'axios'
import { ILobby } from '../interfaces/LobbyTypes'

const getLobby = async (lobbyID?: string) => {
	const res = await axios.get('lobby.json')
	const data = res.data as ILobby[]
	const lobby = data.find((lobby) => lobby.lobbyID === Number(lobbyID))
	return lobby
}

export default getLobby
