import { Dispatch, SetStateAction, useState } from "react"
import { GameData, GameState } from "src/interfaces/GameTypes"

export interface IGameDataSocket {
  GameData: GameData,
  setGameData: Dispatch<SetStateAction<GameData>>
  emitStartGame: (gameData: GameData) => void,
  emitPauseGame: (gameData: GameData) => void
}

export const useGameDataSocket = (
  socketRef: SocketIOClient.Socket,
  lobbyId: string, 
  // playerId: string
): IGameDataSocket=> {

  const [GameData, setGameData] = useState<GameData>({
    currIssueId: '',
    timer: 10,
    issueScore: 0,
    status: GameState.init
  });
  socketRef.on('game:started', (gameData: GameData) => {
    console.log('gamestarted ', gameData.timer);
    
    setGameData({
      ...gameData
    })
  })

  socketRef.on('game:paused', (gameData: GameData) => {
    console.log('game paused ', gameData);
    setGameData({
      ...gameData
    })
  })

  const emitStartGame = (gameData: GameData) => {
    socketRef.emit('game:start', { gameData, lobbyId })
  }

  const emitPauseGame = (gameData: GameData) => {
    socketRef.emit('game:pause', { gameData, lobbyId})
  }

  return {
    GameData,
    setGameData,
    emitStartGame,
    emitPauseGame
  }
}
