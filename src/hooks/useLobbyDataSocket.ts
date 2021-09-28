import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import { useBeforeUnload } from '.'
import { API } from '../interfaces/ApiEnum'
import { ILobby, IMessage } from '../interfaces/LobbyTypes'
import { IssueType } from '../interfaces/IssueType'
import router from 'next/router'
import { LocalStorageEnum } from '../interfaces/localStorageEnum'
import { VoteType } from '../interfaces/VoteType'
import { SocketState } from '../context/SocketContext'

export interface IUseLobbyDataSocket {
	lobbyData: ILobby
	VotesQuanity: VoteType
	// btnDeleteState: boolean
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
	socketRef: SocketState,
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
	console.log('useLobby', playerId);
	
	socketRef?.lobbySpace.emit('join', { playerId, lobbyId })

	useEffect(() => {
		socketRef.lobbySpace.on('lobby:get', ({ data, playerID, }: { data: ILobby; playerID: string }) => {
			console.log(data, playerID)

			setLobbyData(data)
		})

		socketRef.mainSpace.on('vote:data', ({ kickPlayer, btnBlocked }: { kickPlayer: any; btnBlocked: boolean }) => {
			console.log(kickPlayer)

			// setBtnDeleteState(btnBlocked)
			setVotesQuanity({
				...VotesQuanity,
				kickPlayer: new Map(JSON.parse(kickPlayer)),
			})
		})

		//// redirects

		socketRef.lobbySpace.on('player:deleted', () => {
			console.log('deleted')

			router.push(`http://localhost:3000/`)
			sessionStorage.clear()
		})

		socketRef.gameSpace.on('redirect:get', (body: { pathname: string; lobbyId: string }) => {
			console.log(body)
			router.push(`http://localhost:3000/` + body.pathname + body.lobbyId)
			// router.push({ hostname: body.path, pathname: body.lobbyId})
		})

		socketRef.lobbySpace.on('kick:voted', (data: VoteType) => {
			data.currentPlayer = playerId
			data.kickPlayer = new Map(JSON.parse(data.kickPlayer as unknown as string))
			console.log('kick voted', data)
			setVotesQuanity(data)
		})

		return () => {
			if (socketRef === null) return
			socketRef.mainSpace.disconnect()
			socketRef.issueSpace.disconnect()
			socketRef.gameSpace.disconnect()
			socketRef.lobbySpace.disconnect()
		}
	}, [])

	const redirectTo = (pathname: string, isDealer: boolean, exit: boolean = false) => {
		socketRef.gameSpace.emit('redirect', { pathname, lobbyId, playerId, isDealer, exit })
		// router.push({ hostname: API.GAME, path: lobbyId})
	}

	const kickPlayer = (player_id: string) => {
		console.log(player_id)

		socketRef.lobbySpace.emit('player:delete', { player_id, lobby_id: lobbyId })
	}

	const kickPlayerByVote = (voteToKickPlayerId: string, playerName: string) => {
		console.log('kickVote', voteToKickPlayerId, playerName)
		const currentPlayer = sessionStorage.getItem(LocalStorageEnum.playerid) as string
		socketRef.lobbySpace.emit('vote-kick', { voteToKickPlayerId, lobby_id: lobbyId, playerName, currentPlayer })
	}

	const createIssue = ({ name, priority, score = '-' }: IssueType) => {
		console.log('create issue ', name, priority, lobbyId, score)

		socketRef.issueSpace.emit('issue:added', {
			name,
			lobby_id: lobbyId,
		})
	}

	const createIssuesFromFile = () => {
		socketRef.issueSpace.emit('issue:file-added', lobbyId)
	}

	const updateIssue = ({ name, link }: IssueType) => {
		socketRef.issueSpace.emit('issue:update', {
			name,
			link,
			lobby_id: lobbyId,
		})
	}
	const removeIssue = (id: string) => {
		socketRef.issueSpace.emit('issue:delete', {
			id,
			lobby_id: lobbyId,
		})
	}

	const renameLobbyNameHandler = (name: string) => {
		socketRef.lobbySpace.emit('lobby:rename', {
			id: lobbyData?.id,
			name,
		})
	}

	useBeforeUnload(() => {
		if (socketRef === null) return
		socketRef.lobbySpace.emit('leave', { player_id: playerId, lobby_id: lobbyId })
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
