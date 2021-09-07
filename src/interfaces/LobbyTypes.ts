export type Role = 'dealer' | 'player' | 'spectator'

export interface IMember {
	id: string
	role: Role
	firstName: string
	lastName: string
	position?: string
	image?: string
}

export interface ILobby {
	id: string
	members: IMember[]
}
