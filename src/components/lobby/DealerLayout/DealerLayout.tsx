import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { Container, Grid, Header as HeaderTitle, Button } from 'semantic-ui-react'
import { LobbyMock } from '../../../data/lobby'
import { IMember } from '../../../interfaces/LobbyTypes'
import MemberItem from '../MemberItem'
import s from '../lobby.module.scss'
import CopyLink from '../CopyLink'
import IssueContainer from './IssueContainer'
import { IssueLobbyProps } from '../Issue'

const DealerLayout = () => {
	const router = useRouter()
	const { lobbyID } = router.query
	const members = LobbyMock.find((lobby) => lobby.lobbyID === Number(lobbyID))?.members

	const issues: IssueLobbyProps[] = [
		{ title: 'Issue 1', priority: 'Low priority' },
		{ title: 'Issue 2', priority: 'Mid priority' },
		{ title: 'Issue 3', priority: 'High priority' },
	]
	return (
		<>
			<HeaderTitle as="h1" className={s.title}>
				{lobbyID}
			</HeaderTitle>
			<Grid columns="1">
				<Grid.Row color="blue">
					<Grid.Column>
						<HeaderTitle as="h3">Scram master</HeaderTitle>
						{members?.map((dealer) => {
							if (dealer.role === 'dealer') {
								return <MemberItem key={dealer.id} {...(dealer as IMember)} />
							}
							return
						})}
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<CopyLink router={router} />
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
				{members?.map((member, i) => {
					if (member.role === 'dealer') {
						return
					}
					return <MemberItem centered={true} key={i} {...(member as IMember)} />
				})}
			</Container>
			<IssueContainer issues={issues} />
		</>
	)
}

export default DealerLayout
