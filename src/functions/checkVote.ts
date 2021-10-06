import { IUseLobbyDataSocket } from "../hooks/useLobbyDataSocket"


export const getMembersVote = (id: string, dataSocket: IUseLobbyDataSocket) => {
	if (dataSocket.VotesQuanity.kickPlayer.get(id)) {
		return dataSocket.VotesQuanity.kickPlayer.get(id)!.length
	}
	return 0
}

export const checkVoted = (id: string, playerId: string, dataSocket: IUseLobbyDataSocket) => {
	const votedPlayer = dataSocket.VotesQuanity.kickPlayer.get(id)
	if (votedPlayer) {
		const findPlayer = votedPlayer.find((player) => player === playerId)
		return !!findPlayer
	}
	return false
}
