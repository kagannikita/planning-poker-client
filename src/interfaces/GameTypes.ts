export enum GameState {
	init = 'init',
	paused = 'paused',
	started = 'started',
	roundFinished = 'round-finished',
	gameFinished = 'game-finised'
}
// Map<string, number>
export interface GameDataType {
	status: GameState
	playersScore: Map<string, string>
	currIssueId: string
	issueScore: {
		[key:string]: number
	}
	timer: number
}
