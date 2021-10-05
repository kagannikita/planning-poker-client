import { SetStateAction, useEffect, useState } from 'react'
import { IssuesAPI } from 'src/api/IssuesAPI';
import { GameDataType, GameState } from '../interfaces/GameTypes'

export interface IGameDataSocket {
	GameData: GameDataType
	gameStatus: GameState
	voteResults: {}
  setGameData: React.Dispatch<SetStateAction<GameDataType>>
  emitStartGame: (issueId: string) => void
	emitPauseGame: () => void
	emitContinueGame: () => void
	emitResponseGameResults: () => void
	setScore: (body: { score: string; playerId: string }) => void
}

export const useGameDataSocket = (
	socketRef: SocketIOClient.Socket,
	lobbyId: string,
	timerProp: number,
	// playerId: string
): IGameDataSocket => {

	const [gameStatus, setGameStatus] = useState<GameState>(GameState.init);
	const [voteResults, setVoteResults] = useState({});
	const [GameData, setGameData] = useState<GameDataType>({
		currIssueId: '',
		timer: 0,
		playersScore: new Map<string, string>(),
		issueScore: {},
		status: gameStatus,
	})

	useEffect(() => {
		socketRef.emit('game:join')

		socketRef.on('game:joined', ({ gameData }: { gameData: GameDataType })=> {
			console.log('gameData: joined ', gameData);
			
			setGameData({
				...gameData,
				// playersScore: new Map(JSON.parse(gameData.playersScore as unknown as string)) || new Map(),
			})
			setGameStatus(()=> gameData.status)
			setVoteResults(()=>gameData.issueScore)
		})

		socketRef.on('game:started', ({ gameData }: { gameData: GameDataType }) => {
			if (GameData.status !== gameData.status) setGameStatus(() => gameData.status)
			if (GameData.issueScore !== gameData.issueScore) setVoteResults(() => gameData.issueScore)
			setGameData({
				...gameData,
				playersScore: new Map(JSON.parse(gameData.playersScore as unknown as string)),
			})
		})

		socketRef.on('game:paused', ({ gameData }: { gameData: GameDataType }) => {
			if (GameData.status !== gameData.status) setGameStatus(() => gameData.status)
			if (GameData.issueScore !== gameData.issueScore) setVoteResults(() => gameData.issueScore)
			setGameData(gameData)
		})


		socketRef.on('game:response-round-results', (res: any) => {
			setVoteResults(res);
			setGameData((state)=>state={
				...GameData,
				issueScore: res
			})
			console.log('game: response rund res ', res, GameData);
		})
		
		socketRef.on('game:response-game-results', async () =>{
			console.log('gameResult');
			
			setGameStatus(GameState.gameFinished)
			setGameData({...GameData, status: GameState.gameFinished})
		})

	}, [lobbyId, socketRef, setGameData, setVoteResults, setGameStatus])

	const emitStartGame = (issueId: string) => {
		setGameData(() => {
			const state = {
				currIssueId: issueId,
				timer: timerProp,
				playersScore: new Map<string, string>(),
				issueScore: {},
				status: GameState.init,
			}
			socketRef.emit('game:start', { gameData: state, lobbyId })
			return state
		})
	}

	const emitContinueGame = () => {
		setGameData(() => {
			const state = {
				...GameData,
				status: GameState.started,
			}
			setGameStatus(() => GameState.started)

			socketRef.emit('game:start', { gameData: state, lobbyId })
			return state
		})
	}

	const emitPauseGame = () => {
		setGameStatus(() => GameState.paused)
		setGameData({
				...GameData,
				status: GameState.paused,
			})
		socketRef.emit('game:pause', { gameData: GameData, lobbyId })
	}

	const setScore = (body: { score: string; playerId: string }) => {
		console.log('set scored');
		
		socketRef.emit('game:set-score', { ...body, lobbyId })
	}

	const emitResponseGameResults = () => {
		console.log('emit response game Result');
		
		socketRef.emit('game:get-game-results', {lobbyId})
	}

	return {
		GameData,
		gameStatus,
		voteResults,
		setGameData,
		emitStartGame,
		emitPauseGame,
		emitContinueGame,
		emitResponseGameResults,
		setScore,
	}
}
