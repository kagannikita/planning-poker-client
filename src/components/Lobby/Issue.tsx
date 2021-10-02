import React, { useContext, useState } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { ModalState } from './DealerLayout/DealerLayout'
import { IModalCreateIssue } from './DealerLayout/IssueContainer'
import s from './lobby.module.scss'
import { IssueType } from '../../interfaces/IssueType'
import { CurrentIssueContext } from '../../context/CurrentIssueContext'
import { CurrentIssueType } from 'src/pages/game/[id]'

export interface IssueProps extends IssueType {
	type: 'lobby' | 'game'
	isCurrent: boolean
	setModalChange: React.Dispatch<React.SetStateAction<IModalCreateIssue>>
	setModalDelete: React.Dispatch<React.SetStateAction<ModalState>>
	setCurrentIssue?: React.Dispatch<React.SetStateAction<CurrentIssueType>>
}

const 	Issue = ({ 
	name, 
	priority, 
	id, 
	type, 
	link, 
	score, 
	setModalChange, 
	setModalDelete,
	setCurrentIssue,
	lobby,
	isCurrent
}: IssueProps) => {

	const clickOnCurrIssue = () => {
		if(!setCurrentIssue) return
		setCurrentIssue({
			id,
			name,
		})
		
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
		return	`${s.itemActive} ${s.item} ${s[`${priority}Priority`]}`
		} else {
			return	`${s.item} ${s[`${priority}Priority`]}`
		}
	}

	return (
		<Card
			centered
			className={styles()}
			onClick={type === 'game' ? clickOnCurrIssue : undefined}
		>
			<Card.Content>
				<Card.Header>{name}</Card.Header>
				<Card.Meta>
					<b>{type === 'game' && isCurrent && 'Current: '}</b>
				</Card.Meta>
				<Card.Meta>{priority}</Card.Meta>
				{type === 'game' && <Card.Meta>{score}</Card.Meta>}
				<Card.Meta>
					<span about="issue link">{link} </span>
				</Card.Meta>
				<Card.Description textAlign="right">
					{type === 'lobby' && (
						<Button basic color="teal" size="mini" onClick={openModalHandler}>
							Change
						</Button>
					)}
					<Button
						basic
						color="red"
						icon={'remove'}
						onClick={deleteHandler}
						size="mini"
					/>
				</Card.Description>
			</Card.Content>
		</Card>
	)
}
export default Issue
