import React, { useState } from 'react'
import { Container, Grid, Header as HeaderTitle, Button } from 'semantic-ui-react'
import { IPlayer, Role } from '../../../interfaces/LobbyTypes'
import MemberItem from '../MemberItem'
import s from '../lobby.module.scss'
import CopyLink from '../CopyLink'
import IssueContainer from './IssueContainer'
import ModalKickPlayerByDealer from '../ModalKickPlayerByDealer'
import PlayerAPI from '../../../api/PlayerApi'
import { IUseLobbyDataSocket } from '../../../hooks/useLobbyDataSocket'

interface DealerLayoutProps {
	name: string
	players: IPlayer[]
	dealerPlayer: IPlayer
	socketData: IUseLobbyDataSocket
}

export interface ModalState {
	modalIsOpen: boolean
	name: string
	id: string
}

const DealerLayout = ({ name, players, dealerPlayer, socketData }: DealerLayoutProps): JSX.Element => {
	const  {	issues, createIssue, removeIssue, updateIssue } = socketData;

	const [modalkickPlayer, setModalKickPlayer] = useState<ModalState>({
		modalIsOpen: false,
		name: '',
		id: '',
	})
	// let fakePlayers: IPlayer[] = [
	// 	{ firstName: 'Max', lastName: 'masd', id: '1', role: Role.player },
	// 	{ firstName: 'John', lastName: 'masd', id: '2', role: Role.player },
	// 	{ firstName: 'Snow', lastName: 'masd', id: '3', role: Role.player },
	// 	{ firstName: 'Smith', lastName: 'masd', id: '4', role: Role.player },
	// ]
	const [playersStore, setplayersStore] = useState<IPlayer[]>(players)

	const kickMemberHandler = async (playerId: string) => {
		await new PlayerAPI().deletePlayer(playerId)
		const newPlayers = playersStore.filter((player) => player.id !== playerId)
		setplayersStore(newPlayers)
	}

	// const issues: Issue[] = [
	// 	{ title: 'Issue 1', priority: 'low', id:'1' },
	// 	{ title: 'Issue 2', priority: 'average',  id:'2' },
	// 	{ title: 'Issue 3', priority: 'high',  id:'3' },
	// 	{ title: 'Issue 4', priority: 'low', id:'4' },
	// ]
	return (
		<>
			<HeaderTitle as="h1" className={s.title}>
				{name}
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
				{playersStore.map((member) => {
					if (member.role === Role.dealer) {
						return
					}
					return <MemberItem centered key={member.id} setKickPlayer={setModalKickPlayer} {...(member as IPlayer)} />
				})}
			</Container>
			<IssueContainer 
				type="lobby" 
				issues={issues} 
				createIssue={createIssue} 
				removeIssue={removeIssue} 
				updateIssue={updateIssue} />
			<ModalKickPlayerByDealer
				isOpen={modalkickPlayer.modalIsOpen}
				setKickPlayer={setModalKickPlayer}
				kickMemberHandler={kickMemberHandler}
				playerId={modalkickPlayer.id}
				playerName={modalkickPlayer.name}
			/>
		</>
	)
}

export default DealerLayout
