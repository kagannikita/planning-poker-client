import { useState } from 'react'
import { Container, Grid, Header as HeaderTitle, Button } from 'semantic-ui-react'
import { IPlayer, Role } from '../../../interfaces/LobbyTypes'
import MemberItem from '../MemberItem'
import s from '../lobby.module.scss'
import CopyLink from '../CopyLink'
import IssueContainer from './IssueContainer'
import { IssueLobbyProps } from '../Issue'
import ModalKickPlayerByDealer from '../ModalKickPlayerByDealer'

interface DealerLayoutProps {
	name: string,
	players: IPlayer[]
}

export interface KickPlayer {
	modalIsOpen: boolean,
	playerName: string
}

const DealerLayout = ({name, players}: DealerLayoutProps):JSX.Element => {
	const [kickPlayer, setKickPlayer] = useState<KickPlayer>({modalIsOpen: false, playerName: ''});
	
	const kickMemberHandler = () => {}

	const issues: IssueLobbyProps[] = [
		{ title: 'Issue 1', priority: 'Low priority' },
		{ title: 'Issue 2', priority: 'Mid priority' },
		{ title: 'Issue 3', priority: 'High priority' },
	]
	return (
		<>
			<HeaderTitle as="h1" className={s.title}>
				{name}
			</HeaderTitle>
			<Grid columns="1">
				<Grid.Row color="blue">
					<Grid.Column>
						<HeaderTitle as="h3">Scram master</HeaderTitle>
						{players.map((dealer) => {
							if (dealer.role === Role.dealer) {
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
				{players.map((member) => {
					if (member.role === Role.dealer) {
						return
					}
					return <MemberItem centered key={member.id} setKickPlayer={setKickPlayer} {...(member as IPlayer)} />
				})}
				{/* <MemberItem centered setKickPlayer={setKickPlayer} firstName="asdad" lastName="asdad" id='asdasd' role={Role.player}  /> */}
			</Container>
			<IssueContainer issues={issues} />
			<ModalKickPlayerByDealer 
				isOpen={kickPlayer.modalIsOpen}
				setKickPlayer={setKickPlayer}
				kickMemberHandler={kickMemberHandler}
				playerId="1" 
				playerName="Max" />
		</>
	)
}

export default DealerLayout
