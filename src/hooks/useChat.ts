import { MutableRefObject, useState } from 'react'
import { IMessage } from '../interfaces/LobbyTypes'

interface IUseSocketChat {
	messages: IMessage[]
}

export const useChat = (
	socketRef: MutableRefObject<SocketIOClient.Socket>,
	lobbyId: string,
<<<<<<< HEAD
	playerId: string
): IuseSocketChat => {
	const [messages, setMessages] = useState<IMessage[]>([])

	socketRef.current.emit('message:get')
	socketRef.current.on('messages', (messages: IMessage[]) => {
		const newMessages = messages.map((msg) =>
			msg.id === playerId ? { ...msg, currentUser: true } : msg
		)
		setMessages(newMessages)
	})

	const sendMessage = ({ msgText, senderName }: { msgText: string; senderName: string }) => {
		if (socketRef.current === null) return
		socketRef.current.emit('message:add', {
			playerId,
			msgText,
			senderName,
		})
	}

	const removeMessage = (id: string) => {
		if (socketRef.current === null) return
		socketRef.current.emit('message:remove', id)
	}

	return {
		messages,
		sendMessage,
		removeMessage
	}
}
=======
	playerId: string,
): IUseSocketChat => {
	const [messages, setMessages] = useState<IMessage[]>([])
	return {
		messages: [],
	}
}
>>>>>>> 85a2ef5630c0242c92197eb653386257055082f4
