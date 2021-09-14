import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { IssueType } from 'src/interfaces/IssueType'
import { ModalState } from './DealerLayout/DealerLayout'
import { IModalCreateIssue } from './DealerLayout/IssueContainer'
import s from './lobby.module.scss'

export interface IssueProps extends IssueType {
	type: 'lobby' | 'game'
	setModalChange: React.Dispatch<React.SetStateAction<IModalCreateIssue>>
	setModalDelete: React.Dispatch<React.SetStateAction<ModalState>>
}

const Issue = ({ name, priority, id, type, setModalChange, setModalDelete, lobby }: IssueProps) => {
	const [titleState, setTitle] = useState(name)
	const [priorityState, setPriority] = useState(priority)


	return (
		<Card centered className={type === 'lobby' ? s.item : ''}>
			<Card.Content>
				<Card.Header>{titleState}</Card.Header>
				<Card.Meta>{priorityState}</Card.Meta>
				<Card.Description textAlign="right">
					{type === 'lobby' ? <Button basic color="teal" size="mini" onClick={
						() => setModalChange({
							name,
							priority,
							id,
							lobby,
							modalIsOpen: true
						})
					}>Change</Button> : ''}
					<Button
						basic
						color="red"
						circular={type === 'game'}
						icon={type === 'game' ? 'delete' : 'remove'}
						onClick={() =>
							setModalDelete({
								id,
								name,
								modalIsOpen: true,
							})
						}
						size="mini"
					/>
				</Card.Description>
			</Card.Content>
		</Card>
	)
}
export default Issue
