export enum GameState {
	init = 'init',
	paused = 'paused',
	started = 'started',
	roundFinished = 'round-finished',
	roundRepeat = 'round-repeat',
}

export interface GameDataType {
	status: GameState
	playersScore: Map<string, string>
	currIssueId: string
	issueScore: number
	timer: number
}
