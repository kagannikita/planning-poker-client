import React from 'react'
import { Button, Card } from 'semantic-ui-react'
import s from './lobby.module.scss'

export interface IssueLobbyProps {
	title: string
	priority: string
}

interface IssueLobbyState {
	title: string
	priority: string
}

class IssueLobby extends React.Component<IssueLobbyProps, IssueLobbyState> {
	state = {
		title: this.props.title,
		priority: this.props.priority,
	}

	render() {
		return (
			<Card centered className={s.item}>
				<Card.Content>
					<Card.Header>{this.state.title}</Card.Header>

					<Card.Meta>{this.state.priority}</Card.Meta>
					<Card.Description textAlign="right">
						<Button size="mini">Change</Button>
						<Button size="mini">Delete</Button>
					</Card.Description>
				</Card.Content>
			</Card>
		)
	}
}

export default IssueLobby
