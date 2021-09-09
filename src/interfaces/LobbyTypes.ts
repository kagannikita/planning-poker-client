export enum Role {
	dealer = 'dealer',
	player = 'player',
	spectator = 'spectator',
}

export interface IPlayer {
	id: string
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
