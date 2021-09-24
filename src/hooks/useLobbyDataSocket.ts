import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import { useBeforeUnload } from '.'
import { API } from '../interfaces/ApiEnum'
import { ILobby, IMessage } from '../interfaces/LobbyTypes'
import { IssueType } from '../interfaces/IssueType'
import router from 'next/router'
import { LocalStorageEnum } from '../interfaces/localStorageEnum'
import { VoteType } from '../interfaces/VoteType'

export interface IUseLobbyDataSocket {
	lobbyData: ILobby
	VotesQuanity: VoteType
	// btnDeleteState: boolean
	setVotesQuanity: Dispatch<SetStateAction<VoteType>>
	kickPlayer: (player_id: string) => void
	kickPlayerByVote: (voteToKickPlayerId: string, playerName: string) => void

	createIssue: ({ name, priority }: IssueType) => void
	removeIssue: (id: string) => void
	updateIssue: ({ id, name, priority }: IssueType) => void
	renameLobbyNameHandler: (name: string) => void
}

export const useLobbyDataSocket = (
	socketRef: MutableRefObject<SocketIOClient.Socket>,
	lobbyId: string,
	playerId: string): IUseLobbyDataSocket => {

	const [lobbyData, setLobbyData] = useState<any>()
	const [VotesQuanity, setVotesQuanity] = useState<VoteType>({
		modalIsOpen: false,
		playerId: '',
		playerName: '',
		kickPlayer: new Map<string, string[]>(),
		currentPlayer: '',
	})
	// const [btnDeleteState, setBtnDeleteState] = useState(false)

	useEffect(() => {

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

		//// redirects 

		socketRef.current.on('player:deleted', () => {
			router.push('/')
			sessionStorage.clear()
		})

		socketRef.current.on('redirect:get', (pathname: string) => {
			router.push({ hostname: pathname, query: lobbyId })
		})

		socketRef.current.on('kick:voted', (data: VoteType, btnBlocked: boolean) => {
			data.currentPlayer = playerId
			data.kickPlayer = new Map(JSON.parse(data.kickPlayer as unknown as string))
			console.log('kick voted', data)
			// setBtnDeleteState(btnBlocked)
			setVotesQuanity(data)
		})

		// socketRef.current.on('player:kicked', ({ btnBlocked }: { btnBlocked: boolean }) => {
		// 	console.log('player:kicked', btnBlocked)
		// 	// setVotesQuanity({})
		// 	setBtnDeleteState(btnBlocked)
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

	const createIssue = ({ name, priority, score = '-' }: IssueType) => {
		console.log('create issue ', name, priority, lobbyId, score)

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
		VotesQuanity,
		// btnDeleteState,
		setVotesQuanity,
		kickPlayer,
		kickPlayerByVote,
		createIssue,
		removeIssue,
		updateIssue,
		renameLobbyNameHandler,
	}
}
