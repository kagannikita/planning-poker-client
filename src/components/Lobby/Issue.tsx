import React, { useState } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { ModalState } from './DealerLayout/DealerLayout'
import { IModalCreateIssue } from './DealerLayout/IssueContainer'
import s from './lobby.module.scss'
import { IssueType } from '../../interfaces/IssueType'

export interface IssueProps extends IssueType {
	type: 'lobby' | 'game'
	setModalChange: React.Dispatch<React.SetStateAction<IModalCreateIssue>>
	setModalDelete: React.Dispatch<React.SetStateAction<ModalState>>
}

const Issue = ({ name, priority, id, type, link, setModalChange, setModalDelete, lobby }: IssueProps) => {

	const deleteHandler = () => {
		setModalDelete({
			id,
			name,
			modalIsOpen: true,
		})
	}

	const openModalHandler = () => {
		setModalChange({
			name,
			priority,
			id,
			link,
			lobby,
			modalIsOpen: true,
		})
	}
	return (
		<Card centered className={type === 'lobby' ? s.item : ''}>
			<Card.Content>
				<Card.Header>{name}</Card.Header>
				<Card.Meta>{priority}</Card.Meta>
				<Card.Meta>{link}</Card.Meta>
				<Card.Description textAlign="right">
					{type === 'lobby' && 
						<Button
							basic
							color="teal"
							size="mini"
							onClick={openModalHandler}
						>
							Change
						</Button>
					}
					<Button
						basic
						color="red"
						circular={type === 'game'}
						icon={type === 'game' ? 'delete' : 'remove'}
						onClick={deleteHandler}
						size="mini"
					/>
				</Card.Description>
			</Card.Content>
		</Card>
	)
}
export default Issue
