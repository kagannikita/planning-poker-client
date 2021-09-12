import React, { useState } from 'react'
import { Container, Grid, Header as HeaderTitle, Button } from 'semantic-ui-react'
import { IPlayer } from '../../../interfaces/LobbyTypes'
import MemberItem from '../MemberItem'
import s from '../lobby.module.scss'
import CopyLink from '../CopyLink'


interface MemberLayoutProps {
  name: string,
  players: IPlayer[]
}

const MemberLayout = ({name, players}: MemberLayoutProps): JSX.Element => {

	const [voteKickPlayer, setvoteKickPlayer] = useState({
		modalIsOpen: false,
		playerName: ''
	});

	const voteKickPlayerHandler = (playerName: string, ) => {

	}
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
							if (dealer.role === 'dealer') {
								return <MemberItem key={dealer.id} {...(dealer as IPlayer)} />
							}
							return
						})}
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<CopyLink/>
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
				{players.map((member) => {
					if (member.role === 'dealer') return
					return <MemberItem centered={true} key={member.id} {...(member as IPlayer)} />
				})}
			</Container>
		</>
	)
}

export default MemberLayout
