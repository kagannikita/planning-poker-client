import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button, Card } from 'semantic-ui-react'
import IssueType from 'src/interfaces/IssueType'
import { ModalState } from './DealerLayout/DealerLayout'
import s from './lobby.module.scss'

export interface IssueProps extends IssueType {
	type: "lobby" | "game"
	setModalDeleteIssueState: React.Dispatch<React.SetStateAction<ModalState>>
	// issuesArr: Issue[]
}

const Issue = ({ title, priority, id, type, setModalDeleteIssueState }: IssueProps) => {
	const [titleState, setTitle] = useState(title)
	const [priorityState, setPriority] = useState(priority)

	const changeHandler = () => {
		
	}


	return (
		<Card centered className={type === "lobby" ? s.item : ''}>
			<Card.Content>
				<Card.Header>{titleState}</Card.Header>
				<Card.Meta>{priorityState}</Card.Meta>

				<Card.Description textAlign="right">
					{type === "lobby" ?	<Button size="mini">Change</Button> : ''}
					<Button 
						basic={type === "game" ? true : false} 
						circular={type === "game" ? true : false} 
						icon={type === "game" ? "delete" : ""} 
						role="delete"
						onClick={() => setModalDeleteIssueState({
							id,
							name: title,
							modalIsOpen: true
						})}
						size="mini"></Button>
				</Card.Description>
			</Card.Content>
		</Card>
	)
}

export default Issue
