import React, { useState } from 'react'
import { Button, Card } from 'semantic-ui-react'
import s from './lobby.module.scss'

export interface IssueLobbyProps {
	title: string
	priority: string
	type: "lobby" | "game"
}

const IssueLobby = ({ title, priority, type }: IssueLobbyProps) => {
	const [titleState, setTitle] = useState(title)
	const [priorityState, setPriority] = useState(priority)
	return (
		<Card centered className={type === "lobby" ? s.item : ''}>
			<Card.Content>
				<Card.Header>{titleState}</Card.Header>
				<Card.Meta>{priorityState}</Card.Meta>

				<Card.Description textAlign="right">
					{type === "lobby" ?	<Button size="mini">Change</Button> : ''}
					<Button basic={type === "game" ? true : false} circular={type === "game" ? true : false } 
						icon={type === "game" ? "delete" : ""} size="mini"></Button>
				</Card.Description>
			</Card.Content>
		</Card>
	)
}

export default IssueLobby
