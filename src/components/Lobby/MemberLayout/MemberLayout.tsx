import React from 'react'
import {Button, Container, Grid, Header as HeaderTitle} from 'semantic-ui-react'
import {IPlayer} from '../../../interfaces/LobbyTypes'
import MemberItem from '../MemberItem'
import s from '../lobby.module.scss'
import CopyLink from '../CopyLink'
import ModalKickPlayerByVote from '../ModalKickPlayerByVote'
import {IUseLobbyDataSocket} from '../../../hooks/useLobbyDataSocket'
import {checkVoted, getMembersVote} from '../../../functions/checkVote'

interface MemberLayoutProps {
	socketData: IUseLobbyDataSocket
	yourId: string
}

export interface IVoteKickState {
	modalIsOpen: boolean
	playerId: string
	kickerName?: string
	kickedName: string
}

const MemberLayout = ({ socketData, yourId }: MemberLayoutProps): JSX.Element => {
	// const getMembersVote = (id: string) => {
	// 	if (socketData.VotesQuanity.kickPlayer.get(id)) {
	// 		return socketData.VotesQuanity.kickPlayer.get(id)!.length
	// 	}
	// 	return 0
	// }
	// const checkVoted = (id: string) => {
	// 	const votedPlayer = socketData.VotesQuanity.kickPlayer.get(id)
	// 	if (votedPlayer) {
	// 		const findPlayer = votedPlayer.find((player) => player === yourId)
	// 		return !!findPlayer
	// 	}
	// 	return false
	// }

	const exitLobbyHandler = () => socketData.redirectTo('', false, true)

	return (
		<>
			<HeaderTitle as="h2" className={s.title + ' heading'}>
				{socketData.lobbyData?.name}
			</HeaderTitle>
			<Grid columns="1">
				<Grid.Row className={s.lobbyInfo}>
					<Grid.Column>
						<HeaderTitle as="h3" className={'heading'}>
							Scram master
						</HeaderTitle>
						{socketData.lobbyData?.players.map((dealer) => {
							if (dealer.role === 'dealer') {
								return <MemberItem key={dealer.id} {...(dealer as IPlayer)} />
							}
							return
						})}
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<CopyLink />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row columns="2">
					<Grid.Column floated="right">
						<Button negative className={s.cancelBtn} floated="right" onClick={exitLobbyHandler}>
							Exit Lobby
						</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			<HeaderTitle as="h2" className="heading" textAlign="center">
				Members:
			</HeaderTitle>
			<Container className={s.itemsContainer}>
				{socketData.lobbyData?.players.map((member) => {
					if (member.role === 'dealer') return
					return (
						<MemberItem
							isYou={member.id === yourId}
							votedQuantity={socketData.VotesQuanity.kickPlayer}
							checkVoted={checkVoted(member.id, yourId, socketData)}
							playersVoted={getMembersVote(member.id, socketData)}
							playersQuanity={socketData.lobbyData?.players}
							setVoteKickPlayer={socketData.setVotesQuanity}
							centered={true}
							key={member.id}
							{...(member as IPlayer)}
						/>
					)
				})}
			</Container>
			<ModalKickPlayerByVote
				allMembers={socketData.lobbyData?.players.filter((player) => player.role === 'player').length}
				kickMemberStateHandler={socketData.setVotesQuanity}
				kickByVoteHandler={socketData.kickPlayerByVote}
				voteData={socketData.VotesQuanity}
			/>
		</>
	)
}

export default MemberLayout
