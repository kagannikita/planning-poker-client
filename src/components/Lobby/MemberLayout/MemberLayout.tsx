import React, { useState } from 'react'
import { Container, Grid, Header as HeaderTitle, Button } from 'semantic-ui-react'
import { IPlayer } from '../../../interfaces/LobbyTypes'
import MemberItem from '../MemberItem'
import s from '../lobby.module.scss'
import CopyLink from '../CopyLink'
import { IUseLobbyDataSocket } from 'src/hooks/useLobbyDataSocket'
import ModalKickPlayerByVote from '../ModalKickPlayerByVote'

interface MemberLayoutProps {
	socketData: IUseLobbyDataSocket
}

export interface IVoteKickState {
	modalIsOpen: boolean,
	playerId: string,
	kickerName?: string,
	kickedName: string
}

const MemberLayout = ({ socketData }: MemberLayoutProps): JSX.Element => {
	const [voteKickPlayer, setvoteKickPlayer] = useState<IVoteKickState>({
		modalIsOpen: false,
		playerId: '',
		kickerName: '',
		kickedName: ''
	})

	return (
		<>
			<HeaderTitle as="h1" className={s.title}>
				{socketData.lobbyData?.name}
			</HeaderTitle>
			<Grid columns="1">
				<Grid.Row color="blue">
					<Grid.Column>
						<HeaderTitle as="h3">Scram master</HeaderTitle>
						{socketData.lobbyData?.players.map((dealer) => {
							if (dealer.role === 'dealer') {
								return <MemberItem 
								key={dealer.id} 
								{...(dealer as IPlayer)} />
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
						<Button negative floated="right">
							Exit Game
						</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			<HeaderTitle as="h1" textAlign="center">
				Members:
			</HeaderTitle>
			<Container className={s.itemsContainer}>
				{socketData.lobbyData?.players.map((member) => {
					if (member.role === 'dealer') return
					return <MemberItem
						playersQuanity={socketData.lobbyData?.players.length}
						centered={true} 
						key={member.id} 
						{...(member as IPlayer)}
						setVoteKickPlayer={setvoteKickPlayer}
					 />
				})}
			</Container>
			<ModalKickPlayerByVote 
			{...voteKickPlayer}
				allMembers={socketData.lobbyData?.players.length}
			kickMemberStateHandler={setvoteKickPlayer} 
			kickByVoteHandler={socketData.kickPlayerByVote}
			votes={socketData.VotesQuanity}	 />
		</>
	)
}

export default MemberLayout
