import React, { useState } from 'react'
import { Container, Grid, Header as HeaderTitle, Button } from 'semantic-ui-react'
import { IPlayer, Role } from '../../../interfaces/LobbyTypes'
import MemberItem from '../MemberItem'
import s from '../lobby.module.scss'
import CopyLink from '../CopyLink'
import IssueContainer from './IssueContainer'
import ModalKickPlayerByDealer from '../ModalKickPlayerByDealer'
import { IUseLobbyDataSocket } from '../../../hooks/useLobbyDataSocket'

interface DealerLayoutProps {
	// name: string
	// players: IPlayer[]
	dealerPlayer: IPlayer
	socketData: IUseLobbyDataSocket
	// issues: IssueType[]
	// lobbyId: string
}

export interface ModalState {
	modalIsOpen: boolean
	name: string
	id: string
}

const DealerLayout = ({ dealerPlayer, socketData }: DealerLayoutProps): JSX.Element => {
	const { createIssue, removeIssue, updateIssue, kickPlayer, lobbyData } = socketData

	const [modalkickPlayer, setModalKickPlayer] = useState<ModalState>({
		modalIsOpen: false,
		name: '',
		id: '',
	})

	return (
		<>
			<HeaderTitle as="h1" className={s.title}>
				{lobbyData?.name}
			</HeaderTitle>
			<Grid columns="1">
				<Grid.Row color="blue">
					<Grid.Column>
						<HeaderTitle as="h3">Scram master</HeaderTitle>
						<MemberItem {...(dealerPlayer as IPlayer)} />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<CopyLink />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row columns="2">
					<Grid.Column floated="left">
						<Button positive>Start Game</Button>
					</Grid.Column>
					<Grid.Column floated="right">
						<Button negative floated="right">
							Cancel Game
						</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			<HeaderTitle as="h1" textAlign="center">
				Members:
			</HeaderTitle>
			<Container className={s.itemsContainer}>
				{lobbyData?.players.map((member) => {
					if (member.role === Role.dealer) {
						return
					}
					return <MemberItem centered key={member.id} setKickPlayer={setModalKickPlayer} {...(member as IPlayer)} />
				})}
			</Container>
			<IssueContainer
				type="lobby"
				lobbyID={socketData.lobbyData?.id as string}
				issues={socketData.issues}
				createIssue={createIssue}
				removeIssue={removeIssue}
				updateIssue={updateIssue}
			/>

			<ModalKickPlayerByDealer
				isOpen={modalkickPlayer.modalIsOpen}
				setKickPlayer={setModalKickPlayer}
				kickMemberHandler={kickPlayer}
				playerId={modalkickPlayer.id}
				playerName={modalkickPlayer.name}
			/>
		</>
	)
}

export default DealerLayout
