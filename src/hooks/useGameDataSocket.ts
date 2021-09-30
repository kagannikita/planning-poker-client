import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { GameData, GameState } from '../interfaces/GameTypes'

export interface IGameDataSocket {
	GameData: GameData
	setGameData: Dispatch<SetStateAction<GameData>>
	emitStartGame: () => void
	emitPauseGame: () => void
	setScore: (body: { score: string; playerId: string }) => void
}

export const useGameDataSocket = (
	socketRef: SocketIOClient.Socket,
	lobbyId: string,
	// playerId: string
): IGameDataSocket => {
	const [GameData, setGameData] = useState<GameData>({
		currIssueId: '',
		timer: 10,
		playersScore: new Map<string, number>(),
		issueScore: 0,
		status: GameState.init,
	})

	useEffect(() => {
		socketRef.on('game:started', ({ gameData }: { gameData: GameData }) => {
			console.log('gamestarted timer ', gameData.timer)
			console.log('gamestarted ', gameData)

			setGameData({
				...gameData,
				playersScore: new Map(JSON.parse(gameData.playersScore as unknown as string)),
			})
		})

		socketRef.on('game:paused', ({ gameData }: { gameData: GameData }) => {
			console.log('game paused ', gameData)
			setGameData({
				...gameData,
			})
		})

		socketRef.on('game:round-finished', ({ gameData }: { gameData: GameData }) => {
			setGameData({
				...gameData,
				playersScore: new Map(JSON.parse(gameData.playersScore as unknown as string)),
			})
			console.log('game:round-finished', new Map(JSON.parse(gameData.playersScore as unknown as string)))
		})

		socketRef.on('game:score-setted', () => {
			console.log('scored')
		})
	}, [lobbyId, socketRef])

	const emitStartGame = () => {
		socketRef.emit('game:start', { gameData: GameData, lobbyId })
	}

	const emitPauseGame = () => {
		socketRef.emit('game:pause', { gameData: GameData, lobbyId })
	}

	const setScore = (body: { score: string; playerId: string }) => {
		socketRef.emit('game:set-score', { ...body })
	}

	return {
		GameData,
		setGameData,
		emitStartGame,
		emitPauseGame,
		setScore,
	}
}
