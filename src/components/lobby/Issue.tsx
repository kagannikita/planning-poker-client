import React, { useState } from 'react'
import { Button, Card } from 'semantic-ui-react'
import s from './lobby.module.scss'

export interface IssueLobbyProps {
	title: string
	priority: string
}

const IssueLobby = ({ title, priority }: IssueLobbyProps) => {
	const [titleState, setTitle] = useState('')
	const [priorityState, setPriority] = useState('')
	setTitle(title)
	setPriority(priority)
	return (
		<Card centered className={s.item}>
			<Card.Content>
				<Card.Header>{titleState}</Card.Header>

				<Card.Meta>{priorityState}</Card.Meta>
				<Card.Description textAlign="right">
					<Button size="mini">Change</Button>
					<Button size="mini">Delete</Button>
				</Card.Description>
			</Card.Content>
		</Card>
	)
}
// class IssueLobby extends React.Component<IssueLobbyProps, IssueLobbyState> {
// 	state = {
// 		title: this.props.title,
// 		priority: this.props.priority,
// 	}
//
// 	render() {
// 		return (
// 			<Card centered className={s.item}>
// 				<Card.Content>
// 					<Card.Header>{this.state.title}</Card.Header>
//
// 					<Card.Meta>{this.state.priority}</Card.Meta>
// 					<Card.Description textAlign="right">
// 						<Button size="mini">Change</Button>
// 						<Button size="mini">Delete</Button>
// 					</Card.Description>
// 				</Card.Content>
// 			</Card>
// 		)
// 	}
// }

export default IssueLobby
