import React, { useContext, useState } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { ModalState } from './DealerLayout/DealerLayout'
import { IModalCreateIssue } from './DealerLayout/IssueContainer'
import s from './lobby.module.scss'
import { IssueType } from '../../interfaces/IssueType'
import { CurrentIssueContext } from '../../context/CurrentIssueContext'
import { CurrentIssueType } from '../../pages/game/[id]'

export interface IssueProps extends IssueType {
	type: 'lobby' | 'game'
	isCurrent: boolean
	CurrentIssueId?: {
		id: string
	}
	setModalChange: React.Dispatch<React.SetStateAction<IModalCreateIssue>>
	setModalDelete: React.Dispatch<React.SetStateAction<ModalState>>
}

const Issue = ({
	name,
	priority,
	id,
	type,
	link,
	score,
	CurrentIssueId,
	setModalChange,
	setModalDelete,
	lobby,
	isCurrent,
}: IssueProps) => {
	const clickOnCurrIssue = () => {
		if (!CurrentIssueId) return
		CurrentIssueId.id = id
	}

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
		if (type === 'game' && isCurrent) {
			return `${s.itemActive} ${s.item} ${s[`${priority}Priority`]}`
		} else {
			return `${s.item} ${s[`${priority}Priority`]}`
		}
	}

	return (
		<Card centered className={styles()} onClick={type === 'game' ? clickOnCurrIssue : undefined}>
			<Card.Content>
				<Card.Header>{name}</Card.Header>
				<Card.Meta>
					<b>{type === 'game' && isCurrent && 'Current: '}</b>
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
					<Button basic color="red" icon={'remove'} onClick={deleteHandler} size="mini" />
				</Card.Description>
			</Card.Content>
		</Card>
	)
}
export default Issue
