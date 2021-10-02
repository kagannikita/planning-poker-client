import { GameDataType } from '../interfaces/GameTypes'
import { IUseLobbyDataSocket } from '../hooks/useLobbyDataSocket'

type resultsType = {
	cards: { name: string; scoreTypeShort: string; image: string }[]
	values: number[]
}

export const getRoundResult = (GameData: GameDataType, dataSocket: IUseLobbyDataSocket) => {
	const arrayOfFinalCards: [string, number][] = []

	const results: resultsType = {
		cards: [],
		values: [],
	}

	for (const key in GameData?.issueScore) {
		arrayOfFinalCards.push([key, GameData?.issueScore[key]])
	}

	const sortedArray = arrayOfFinalCards.concat().sort((a, b) => {
		return a[1] - b[1]
	})

	sortedArray.reverse().forEach((item) => {
		const card = {
			name: item[0],
			image: dataSocket?.lobbyData?.settings?.cards[0].image,
			scoreTypeShort: dataSocket?.lobbyData?.settings?.score_type_short,
		}
		results.cards.push(card)
		results.values.push(item[1])
	})

	return results
}
