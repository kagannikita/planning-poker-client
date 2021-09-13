import React, { useState } from 'react'
import { Container, Grid, Header as HeaderTitle, Button } from 'semantic-ui-react'
import { IPlayer, Role } from '../../../interfaces/LobbyTypes'
import MemberItem from '../MemberItem'
import s from '../lobby.module.scss'
import CopyLink from '../CopyLink'
import IssueContainer from './IssueContainer'
import { IssueProps } from '../Issue'
import ModalKickPlayerByDealer from '../ModalKickPlayerByDealer'
import PlayerAPI from '../../../api/PlayerApi'
import IssueType from 'src/interfaces/IssueType'
import { RootState, useStore } from 'src/store/store'
import ModalDeleteIssue from '../ModalDeleteIssue'

interface DealerLayoutProps {
	name: string
	players: IPlayer[]
	dealerPlayer: IPlayer
}

export interface ModalState {
	modalIsOpen: boolean
	name: string
	id: string
}

const DealerLayout = ({ name, players, dealerPlayer }: DealerLayoutProps): JSX.Element => {

	const [kickPlayer, setKickPlayer] = useState<ModalState>({
		modalIsOpen: false, 
		name: '',
		id: ''
 })
	// let fakePlayers: IPlayer[] = [
	// 	{ firstName: 'Max', lastName: 'masd', id: '1', role: Role.player },
	// 	{ firstName: 'John', lastName: 'masd', id: '2', role: Role.player },
	// 	{ firstName: 'Snow', lastName: 'masd', id: '3', role: Role.player },
	// 	{ firstName: 'Smith', lastName: 'masd', id: '4', role: Role.player },
	// ]
	const [playersStore, setplayersStore] = useState<IPlayer[]>(players);

	const kickMemberHandler = async (playerId: string) => {
		await new PlayerAPI().deletePlayer(playerId)
		const newPlayers = playersStore.filter(player => player.id !== playerId)
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
					return <MemberItem centered 
						key={member.id} 
						setKickPlayer={setKickPlayer} 
						{...(member as IPlayer)} />
				})}
			</Container>
			<IssueContainer type="lobby" />
			<ModalKickPlayerByDealer
				isOpen={kickPlayer.modalIsOpen}
				setKickPlayer={setKickPlayer}
				kickMemberHandler={kickMemberHandler}
				playerId={kickPlayer.id}
				playerName={kickPlayer.name}
			/>

		</>
	)
}

export default DealerLayout
