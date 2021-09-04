export type Role = 'dealer' | 'player' | 'spectator'

export interface IMember {
	id: number
	role: Role
	firstName: string
	lastName: string
	position?: string
	image?: string
}

export interface ILobby {
	lobbyID: number
	members: IMember[]
}
