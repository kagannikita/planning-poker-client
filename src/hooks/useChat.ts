import { MutableRefObject, useState } from 'react'
import { IMessage } from '../interfaces/LobbyTypes'

interface IUseSocketChat {
	messages: IMessage[]
}

export const useChat = (
	socketRef: MutableRefObject<SocketIOClient.Socket>,
	lobbyId: string,
	playerId: string,
): IUseSocketChat => {
	const [messages, setMessages] = useState<IMessage[]>([])
	return {
		messages: [],
	}
}
