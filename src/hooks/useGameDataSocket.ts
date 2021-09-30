import { SetStateAction, useEffect, useState } from 'react'
import { GameDataType, GameState } from '../interfaces/GameTypes'

export interface IGameDataSocket {
	GameData: GameDataType
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
    timer: 11,
    playersScore: new Map<string, number>(),
    issueScore: 0,
    status: GameState.init,
  })
 
	useEffect(() => {
    socketRef.on('game:started', ({ gameData }: { gameData: GameDataType }) => {
			console.log('gamestarted timer ', gameData.timer)

			setGameData({
				currIssueId: gameData.currIssueId,
        timer: gameData.timer,
        issueScore: gameData.issueScore,
        status: gameData.status,
        playersScore: gameData.playersScore
			})
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

		socketRef.on('game:score-setted', () => {
			console.log('scored')
		})
  }, [lobbyId, socketRef, setGameData])



  const emitStartGame = (issueId: string) => {
    setGameData((state: GameDataType) => {
      state = {...GameData, currIssueId: issueId}
      
      socketRef.emit('game:start', { gameData: state, lobbyId })
      return state
    })

    console.log(GameData);
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
