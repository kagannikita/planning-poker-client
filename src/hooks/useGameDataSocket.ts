import { SetStateAction, useEffect, useState } from 'react'
import { GameDataType, GameState } from '../interfaces/GameTypes'

export interface IGameDataSocket {
	GameData: GameDataType
	playersScore: string[]
  setGameData: React.Dispatch<SetStateAction<GameDataType>>
  emitStartGame: (issueId: string) => void
	emitPauseGame: () => void
	setScore: (body: { score: string; playerId: string }) => void
}

export const useGameDataSocket = (
	socketRef: SocketIOClient.Socket,
	lobbyId: string,
	// playerId: string
): IGameDataSocket => {

	const [GameData, setGameData] = useState<GameDataType>({
		currIssueId: '',
		timer: 1,
		playersScore: new Map<string, string>(),
		issueScore: 0,
		status: GameState.init,
	})
	const [playersScore, setPlayersScore] = useState<string[]>([]);

	useEffect(() => {
		socketRef.on('game:started', ({ gameData }: { gameData: GameDataType }) => {
			console.log('gamestarted timer ', gameData)
			setGameData({
				...gameData,
				playersScore: new Map(JSON.parse(gameData.playersScore as unknown as string))
			})
			if (playersScore.length) setPlayersScore((arr) => arr = [])
		})

		socketRef.on('game:paused', ({ gameData }: { gameData: GameDataType }) => {
			console.log('game paused ', gameData)
			setGameData(gameData)
		})

		socketRef.on('game:round-finished', ({ gameData }: { gameData: GameDataType }) => {
			setGameData({
				...gameData,
				playersScore: new Map(JSON.parse(gameData.playersScore as unknown as string)),
			})
			console.log('game:round-finished', GameData)
		})

		socketRef.on('game:score-setted', (scoreArr: string[]) => {
			setPlayersScore(scoreArr)
			console.log('scored', scoreArr)
		})

	}, [lobbyId, socketRef, setGameData, setPlayersScore])

	const emitStartGame = (issueId: string) => {
		setGameData((state: GameDataType) => {
			state = {...GameData, timer: 10, currIssueId: issueId}

			socketRef.emit('game:start', { gameData: state, lobbyId })
			return state
		})

		console.log(GameData);
	}

	const emitPauseGame = () => {
		socketRef.emit('game:pause', { gameData: GameData, lobbyId })
	}

	const setScore = (body: { score: string; playerId: string }) => {
		socketRef.emit('game:set-score', { ...body, lobbyId })
	}

	return {
		GameData,
		playersScore,
		setGameData,
		emitStartGame,
		emitPauseGame,
		setScore,
	}
}
