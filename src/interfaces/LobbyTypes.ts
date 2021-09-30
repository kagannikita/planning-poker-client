import { IssueType } from './IssueType'

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

export interface IMessage {
	text: string
	date: Date
	name: string
	id?: string
}

export interface ILobby {
	id: string
	name: string
	players: IPlayer[]
	issues: IssueType[]
	settings: IGameSettings
}

export interface IGameSettingsToUpload {
	is_dealer_play: boolean
	is_change_cards: boolean
	timer_needed: boolean
	score_type: string
	score_type_short: string
	timer: number
}

export interface IGameSettings extends IGameSettingsToUpload {
	id: string
	cards: ICardSettings[]
}

export interface ICardSettings {
	name: string
	// is_cover: boolean,
	image: File
	settings: IGameSettings
	id?: string
	cardValue?: string
}
