import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useBeforeUnload } from '.'
import { ILobby, IPlayer } from '../interfaces/LobbyTypes'
import { IssueType } from '../interfaces/IssueType'
import router from 'next/router'
import { LocalStorageEnum } from '../interfaces/localStorageEnum'
import { VoteType } from '../interfaces/VoteType'
import { ChatMessageProps } from '../components/Chat/ChatMessage'

export interface IUseLobbyDataSocket {
	lobbyData: ILobby
	chatMessages: ChatMessageProps[]
	VotesQuanity: VoteType
	setVotesQuanity: Dispatch<SetStateAction<VoteType>>
	kickPlayer: (player_id: string) => void
	kickPlayerByVote: (voteToKickPlayerId: string, playerName: string) => void
	redirectTo: (pathname: string, isDealer: boolean, exit: boolean) => void
	createIssue: ({ name, priority }: IssueType) => void
	removeIssue: (id: string) => void
	updateIssue: (issue: IssueType) => void
	renameLobbyNameHandler: (name: string) => void
	createIssuesFromFile: () => void
	sendMessage: ({ message, yourMember, lobbyId }: any) => void
}

export const useLobbyDataSocket = (
	socketRef: SocketIOClient.Socket,
	lobbyId: string,
	playerId: string,
	messages?: ChatMessageProps[],
): IUseLobbyDataSocket => {
	const [lobbyData, setLobbyData] = useState<any>()
	const [chatMessages, setChatMessages] = useState(messages)
	const [VotesQuanity, setVotesQuanity] = useState<VoteType>({
		modalIsOpen: false,
		playerId: '',
		playerName: '',
		kickPlayer: new Map<string, string[]>(),
		currentPlayer: '',
	})

	useEffect(() => {
		socketRef.emit('join', { player_id: playerId, lobby_id: lobbyId })

		socketRef.on('lobby:get', ({ data, player_id }: { data: ILobby; player_id: string }) => {
			setLobbyData(data)
		})

		socketRef.on('vote:data', ({ kickPlayer }: { kickPlayer: any }) => {
			setVotesQuanity({
				...VotesQuanity,
				kickPlayer: new Map(JSON.parse(kickPlayer)),
			})
		})

		//// redirects

		socketRef.on('player:deleted', () => {
			router.push(`http://localhost:3000/`)
			sessionStorage.clear()
		})

		socketRef.on('redirect:get', (body: { pathname: string; lobbyId: string }) => {
			router.push(`http://localhost:3000/` + body.pathname + body.lobbyId)
		})

		socketRef.on('kick:voted', (data: VoteType) => {
			data.currentPlayer = playerId
			data.kickPlayer = new Map(JSON.parse(data.kickPlayer as unknown as string))
			console.log('kick voted', data)
			setVotesQuanity(data)
		})
		socketRef.on('message:get', ({ message, members }: { message: string; members: IPlayer[] }) => {
			const newValue = { message: message, members: members }
			console.log('before: ', chatMessages)
			setChatMessages((prevState) => [...prevState!, newValue])
			console.log(newValue)
		})
		return () => {
			if (socketRef === null) return
			socketRef.disconnect()
		}
	}, [playerId, lobbyId, setVotesQuanity, socketRef])

	const redirectTo = (pathname: string, isDealer: boolean, exit = false) => {
		socketRef.emit('redirect', { pathname, lobbyId, playerId, isDealer, exit })
	}

	const kickPlayer = (player_id: string) => {
		socketRef.emit('player:delete', { player_id, lobby_id: lobbyId })
	}

	const kickPlayerByVote = (voteToKickPlayerId: string, playerName: string) => {
		console.log('kickVote', voteToKickPlayerId, playerName)
		const currentPlayer = sessionStorage.getItem(LocalStorageEnum.playerid) as string
		socketRef.emit('vote-kick', { voteToKickPlayerId, lobby_id: lobbyId, playerName, currentPlayer })
	}
	const sendMessage = ({ message, yourMember, lobbyId }: any) => {
		socketRef.emit('chat:sendMsg', { message, yourMember, lobbyId })
	}
	const createIssue = ({ name, priority, score = '-' }: IssueType) => {
		socketRef.emit('issue:added', {
			name,
			lobby_id: lobbyId,
		})
	}

	const createIssuesFromFile = () => {
		socketRef.emit('issue:file-added', lobbyId)
	}

	const updateIssue = (issue: IssueType) => {
		console.log(issue, 'aaaaaaaaaaaaa')

		socketRef.emit('issue:update', {
			...issue,
			lobby_id: lobbyId,
		})
	}
	const removeIssue = (id: string) => {
		socketRef.emit('issue:delete', {
			id,
			lobby_id: lobbyId,
		})
	}

	const renameLobbyNameHandler = (name: string) => {
		socketRef.emit('lobby:rename', {
			id: lobbyData?.id,
			name,
		})
	}

	useBeforeUnload(() => {
		socketRef.emit('leave', { player_id: playerId, lobby_id: lobbyId })
	})

	return <IUseLobbyDataSocket>{
		lobbyData,
		chatMessages,
		VotesQuanity,
		redirectTo,
		setVotesQuanity,
		kickPlayer,
		sendMessage,
		kickPlayerByVote,
		createIssue,
		createIssuesFromFile,
		removeIssue,
		updateIssue,
		renameLobbyNameHandler,
	}
}
