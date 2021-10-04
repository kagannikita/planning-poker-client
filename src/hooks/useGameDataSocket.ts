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
			
			setGameData(() => gameData)
			setGameStatus(()=> gameData.status)
			setVoteResults(()=>gameData.issueScore)
		})

		socketRef.on('game:started', async ({ gameData }: { gameData: GameDataType }) => {
			setGameData({
				...gameData,
				playersScore: new Map(JSON.parse(gameData.playersScore as unknown as string)),
			})
		})

		socketRef.on('game:paused', ({ gameData }: { gameData: GameDataType }) => {
			setVoteResults(()=> gameData.issueScore)
			setGameStatus(() => gameData.status)
			setGameData(gameData)
		})

		socketRef.on(`game:get-status`, (status: GameState) => {
			setGameStatus(()=> status)
		})

		socketRef.on('game:response-round-results', (res: Map<string, number>) => {
			setVoteResults(res);
			console.log('game: response rund res ', res);
		})
		
		socketRef.on('game:response-game-results', async () =>{
			const issues = await new IssuesAPI().getAllByLobbyId(lobbyId)
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
		socketRef.emit('game:set-score', { ...body, lobbyId })
	}

	const emitResponseGameResults = () => {
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
