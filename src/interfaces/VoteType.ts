type kickPlayer = Map<string, string[]>

export interface VoteType {
	playerId: string
	playerName: string
	currentPlayer: string
	modalIsOpen: boolean
	kickPlayer: kickPlayer
}
