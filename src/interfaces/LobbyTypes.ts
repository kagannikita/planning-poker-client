export type Role = 'dealer' | 'player' | 'spectator'

export interface IPlayer {
	id: number
	role: Role
	firstName: string
	lastName: string
	position?: string
	image?: string
}

export interface ILobby {
	id: string
	name: string
	players: IPlayer[]
}
