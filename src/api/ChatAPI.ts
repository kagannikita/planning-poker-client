import axios from 'axios'
import { API } from '../interfaces/ApiEnum'
import { ChatMessageProps } from '../components/Chat/ChatMessage'

export const getMessagesByLobbyId = (id: string): Promise<ChatMessageProps[]> => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${API.MAIN_API}${API.CHAT}${id}`)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err))
	})
}
