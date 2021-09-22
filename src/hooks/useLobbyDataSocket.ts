import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useBeforeUnload } from '.'
import { API } from '../interfaces/ApiEnum'
import { ILobby, IMessage } from '../interfaces/LobbyTypes'
import { IssueType } from '../interfaces/IssueType'
import router from 'next/router'
import { LocalStorageEnum } from '../interfaces/localStorageEnum'
import { VoteType } from '../interfaces/VoteType'

export interface IUseLobbyDataSocket {
	lobbyData: ILobby
	messages: IMessage[]
	VotesQuanity: VoteType
	btnDeleteState: boolean
	setVotesQuanity: Dispatch<SetStateAction<VoteType>>
	kickPlayer: (player_id: string) => void
	kickPlayerByVote: (voteToKickPlayerId: string, playerName: string) => void
	sendMessage: ({ msgText, senderName }: { msgText: string; senderName: string }) => void
	removeMessage: (id: string) => void
	createIssue: ({ name, priority }: IssueType) => void
	removeIssue: (id: string) => void
	updateIssue: ({ id, name, priority }: IssueType) => void
	renameLobbyNameHandler: (name: string) => void
}

export const useLobbyDataSocket = (lobbyId: string, playerId: string): IUseLobbyDataSocket => {
	const [lobbyData, setLobbyData] = useState<any>()
	const [messages, setMessages] = useState<IMessage[]>([])
	const [VotesQuanity, setVotesQuanity] = useState<VoteType>({
		modalIsOpen: false,
		playerId: '',
		playerName: '',
		kickPlayer: new Map<string, string[]>(),
		currentPlayer: '',
	})
	const [btnDeleteState, setBtnDeleteState] = useState(false)

	const socketRef = useRef<SocketIOClient.Socket | null>(null)

	useEffect(() => {
		socketRef.current = io(API.MAIN_API, {
			query: { lobbyId },
		})

		socketRef.current.emit('join', { name: playerId, lobby_id: lobbyId })

		socketRef.current.on('lobby:get', ({ data, name }: { data: ILobby; name: string }) => {
			setLobbyData(data)
		})

		socketRef.current.on('vote:data', ({ kickPlayer, btnBlocked }: { kickPlayer: any; btnBlocked: boolean }) => {
			console.log(kickPlayer)

			// setBtnDeleteState(btnBlocked)
			setVotesQuanity({
				...VotesQuanity,
				kickPlayer: new Map(JSON.parse(kickPlayer)),
			})
		})

		socketRef.current.on('player:deleted', () => {
			router.push('/')
			sessionStorage.clear()
		})

		socketRef.current.on('kick:voted', (data: VoteType, btnBlocked: boolean) => {
			data.currentPlayer = playerId
			data.kickPlayer = new Map(JSON.parse(data.kickPlayer as unknown as string))
			console.log('kick voted', data)
			setBtnDeleteState(btnBlocked)
			setVotesQuanity(data)
		})

		socketRef.current.on('player:kicked', ({ btnBlocked }: { btnBlocked: boolean }) => {
			console.log('player:kicked', btnBlocked)
			// setVotesQuanity({})
			setBtnDeleteState(btnBlocked)
		})

		// socketRef.current.emit('message:get')

		// socketRef.current.on('messages', (messages: IMessage[]) => {
		//   const newMessages = messages.map((msg) =>
		//     msg.id === userId ? { ...msg, currentUser: true } : msg
		//   )
		//   setMessages(newMessages)
		// })

		return () => {
			if (socketRef.current === null) return
			socketRef.current.disconnect()
		}
	}, [lobbyId, playerId])

	const kickPlayer = (player_id: string) => {
		socketRef.current?.emit('player:delete', { player_id, lobby_id: lobbyId })
	}

	const kickPlayerByVote = (voteToKickPlayerId: string, playerName: string) => {
		console.log('kickVote', voteToKickPlayerId, playerName)
		const currentPlayer = sessionStorage.getItem(LocalStorageEnum.playerid) as string
		socketRef.current!.emit('vote-kick', { voteToKickPlayerId, lobby_id: lobbyId, playerName, currentPlayer })
	}

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

	const createIssue = ({ name, priority }: IssueType) => {
		console.log('create issue ', name, priority, lobbyId)

		if (socketRef.current === null) return
		socketRef.current.emit('issue:added', {
			name,
			lobby_id: lobbyId,
		})
	}

	const updateIssue = ({ name, link }: IssueType) => {
		if (socketRef.current === null) return
		socketRef.current.emit('issue:update', {
			name,
			link,
			lobby_id: lobbyId,
		})
	}
	const removeIssue = (id: string) => {
		if (socketRef.current === null) return
		socketRef.current.emit('issue:delete', {
			id,
			lobby_id: lobbyId,
		})
	}

	const renameLobbyNameHandler = (name: string) => {
		if (socketRef.current === null) return
		socketRef.current.emit('lobby:rename', {
			id: lobbyData?.id,
			name,
		})
	}

	useBeforeUnload(() => {
		if (socketRef.current === null) return
		socketRef.current.emit('leave', { player_id: playerId, lobby_id: lobbyId })
	})

	return <IUseLobbyDataSocket>{
		lobbyData,
		messages,
		VotesQuanity,
		btnDeleteState,
		setVotesQuanity,
		kickPlayer,
		kickPlayerByVote,
		sendMessage,
		removeMessage,
		createIssue,
		removeIssue,
		updateIssue,
		renameLobbyNameHandler,
	}
}
