import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useBeforeUnload } from '.'
import { ILobby } from '../interfaces/LobbyTypes'
import { IssueType } from '../interfaces/IssueType'
import router from 'next/router'
import { LocalStorageEnum } from '../interfaces/localStorageEnum'
import { VoteType } from '../interfaces/VoteType'

export interface IUseLobbyDataSocket {
	lobbyData: ILobby
	VotesQuanity: VoteType
	setVotesQuanity: Dispatch<SetStateAction<VoteType>>
	kickPlayer: (player_id: string) => void
	kickPlayerByVote: (voteToKickPlayerId: string, playerName: string) => void
	redirectTo: (pathname: string, isDealer: boolean, exit: boolean) => void
	createIssue: ({ name, priority }: IssueType) => void
	removeIssue: (id: string) => void
	updateIssue: ({ id, name, priority }: IssueType) => void
	renameLobbyNameHandler: (name: string) => void
	createIssuesFromFile: () => void
}

export const useLobbyDataSocket = (
	socketRef: SocketIOClient.Socket,
	lobbyId: string,
	playerId: string,
): IUseLobbyDataSocket => {

	const [lobbyData, setLobbyData] = useState<any>()
	
	const [VotesQuanity, setVotesQuanity] = useState<VoteType>({
		modalIsOpen: false,
		playerId: '',
		playerName: '',
		kickPlayer: new Map<string, string[]>(),
		currentPlayer: '',
	})
	
	
	useEffect(() => {
		socketRef.emit('join', { player_id: playerId, lobby_id: lobbyId })

		socketRef.on('lobby:get', ({ data, player_id, }: { data: ILobby; player_id: string }) => {
			console.log(data, player_id)

			setLobbyData(data)
		})

		socketRef.on('vote:data', ({ kickPlayer }: { kickPlayer: any}) => {
			console.log(kickPlayer)

			setVotesQuanity({
				...VotesQuanity,
				kickPlayer: new Map(JSON.parse(kickPlayer)),
			})
		})

		//// redirects

		socketRef.on('player:deleted', () => {
			console.log('deleted')

			router.push(`http://localhost:3000/`)
			sessionStorage.clear()
		})

		socketRef.on('redirect:get', (body: { pathname: string; lobbyId: string }) => {
			console.log(body)
			router.push(`http://localhost:3000/` + body.pathname + body.lobbyId)
		})

		socketRef.on('kick:voted', (data: VoteType) => {
			data.currentPlayer = playerId
			data.kickPlayer = new Map(JSON.parse(data.kickPlayer as unknown as string))
			console.log('kick voted', data)
			setVotesQuanity(data)
		})

		return () => {
			if (socketRef === null) return
			socketRef.disconnect()
		}
	}, [playerId, lobbyId])

	const redirectTo = (pathname: string, isDealer: boolean, exit: boolean = false) => {
		socketRef.emit('redirect', { pathname, lobbyId, playerId, isDealer, exit })
	}

	const kickPlayer = (player_id: string) => {
		console.log(player_id)

		socketRef.emit('player:delete', { player_id, lobby_id: lobbyId })
	}

	const kickPlayerByVote = (voteToKickPlayerId: string, playerName: string) => {
		console.log('kickVote', voteToKickPlayerId, playerName)
		const currentPlayer = sessionStorage.getItem(LocalStorageEnum.playerid) as string
		socketRef.emit('vote-kick', { voteToKickPlayerId, lobby_id: lobbyId, playerName, currentPlayer })
	}

	const createIssue = ({ name, priority, score = '-' }: IssueType) => {
		console.log('create issue ', name, priority, lobbyId, score)

		socketRef.emit('issue:added', {
			name,
			lobby_id: lobbyId,
		})
	}

	const createIssuesFromFile = () => {
		socketRef.emit('issue:file-added', lobbyId)
	}

	const updateIssue = ({ name, link }: IssueType) => {
		socketRef.emit('issue:update', {
			name,
			link,
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
		VotesQuanity,
		redirectTo,
		setVotesQuanity,
		kickPlayer,
		kickPlayerByVote,
		createIssue,
		createIssuesFromFile,
		removeIssue,
		updateIssue,
		renameLobbyNameHandler,
	}
}
