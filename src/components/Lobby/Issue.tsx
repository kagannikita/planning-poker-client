import React from 'react'
import { Button, Card } from 'semantic-ui-react'
import { ModalState } from './DealerLayout/DealerLayout'
import { IModalCreateIssue } from './DealerLayout/IssueContainer'
import s from './lobby.module.scss'
import { IssueType } from '../../interfaces/IssueType'
import { Role } from 'src/interfaces/LobbyTypes'

export interface IssueProps extends IssueType {
	type: 'lobby' | 'game'
	playerRole: Role
	isCurrentIdState: string
	CurrentIssueId?: {
		id: string
	}
	setModalChange: React.Dispatch<React.SetStateAction<IModalCreateIssue>>
	setModalDelete: React.Dispatch<React.SetStateAction<ModalState>>
	setIsCurrentIdState: React.Dispatch<React.SetStateAction<string>>
}

const Issue = ({
	name,
	priority,
	id,
	type,
	link,
	score,
	setModalChange,
	setModalDelete,
	lobby,
	isCurrentIdState,
	playerRole
}: IssueProps) => {

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

	const styles = () => {
		if (type === 'game' && isCurrentIdState === id ) {
			return	`${s.itemActive} ${s.item} ${s[`${priority}Priority`]}`
		} else {
			return `${s.item} ${s[`${priority}Priority`]}`
		}
	}

	return (
		<Card
			centered
			className={styles()}
		>
			<Card.Content>
				<Card.Header>{name}</Card.Header>
				<Card.Meta>
					<b>{type === 'game' && isCurrentIdState === id && 'Current: '}</b>
				</Card.Meta>
				<Card.Meta>Priority: {priority}</Card.Meta>
				{type === 'game' && (
					<Card.Meta>
						<b>Score: {score}</b>
					</Card.Meta>
				)}
				<Card.Meta>
					<span about="issue link">Link: {link} </span>
				</Card.Meta>
				<Card.Description textAlign="right">
					{type === 'lobby' && (
						<Button basic color="teal" size="mini" onClick={openModalHandler}>
							Change
						</Button>
					)}
					{
						playerRole ===Role.dealer &&
					<Button
						basic
						color="red"
						icon={'remove'}
						onClick={deleteHandler}
						size="mini"
					/>}
				</Card.Description>
			</Card.Content>
		</Card>
	)
}
export default Issue
