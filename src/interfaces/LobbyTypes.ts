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
	timer: string
}

export interface IGameSettings extends IGameSettingsToUpload {
	id: string
	cards: ICardSettings[]
}

export interface ICardSettings {
	name?: string
	is_cover: boolean
	image: string
	settings: IGameSettings
	id?: string
}

// {
// 	"name": "swag",
// 		"is_cover": "true",
// 			"settings": {
// 		"id": "ec150d01-0392-4ace-8bce-4ee94343b3a7",
// 			"created": "2021-09-18T11:47:12.896Z",
// 				"updated": "2021-09-18T15:24:37.751Z",
// 					"is_dealer_play": true,
// 						"is_change_cards": true,
// 							"timer_needed": true,
// 								"score_type": "sawdaw",
// 									"score_type_short": "SP",
// 										"timer": "1943-03-09T00:02:00.000Z"
// 	},
// 	"image": "http://res.cloudinary.com/plaining-poker/image/upload/v1631978883/vhoz8j6il2o2zgonsz0b.jpg",
// 		"id": "ab82d145-5d64-467d-b9e2-0f4be75c6730",
// 			"created": "2021-09-18T15:28:03.258Z",
// 				"updated": "2021-09-18T15:28:03.258Z"
// }
