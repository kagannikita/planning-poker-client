import React, { useContext, useState } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { ModalState } from './DealerLayout/DealerLayout'
import { IModalCreateIssue } from './DealerLayout/IssueContainer'
import s from './lobby.module.scss'
import { IssueType } from '../../interfaces/IssueType'
import { CurrentIssueContext } from '../../context/CurrentIssueContext'

export interface IssueProps extends IssueType {
	type: 'lobby' | 'game'
	setModalChange: React.Dispatch<React.SetStateAction<IModalCreateIssue>>
	setModalDelete: React.Dispatch<React.SetStateAction<ModalState>>
}

const 	Issue = ({ name, priority, id, type, link, score, setModalChange, setModalDelete, lobby }: IssueProps) => {
	const { CurrentIssue, setCurrentIssue } = useContext(CurrentIssueContext)

	const clickOnCurrIssue = () => {
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

	// const styleCard = () => {
	// 	if(type === 'game' && CurrentIssue.id === id) {
	// 		console.log('log3');
	// 		return s.itemAcitve
	// 	} else if (type === 'lobby') {
	// 		return s.item;
	// 	} else {
	// 		console.log('log2');
	// 		return ''
	// 	}
	// }

	return (
		<Card
			centered
			className={CurrentIssue.id === id && type === 'game' ? s.itemActive : '' ? s.item : ''}
			onClick={type === 'game' ? clickOnCurrIssue : undefined}
		>
			<Card.Content>
				<Card.Header>{name}</Card.Header>
				<Card.Meta>
					<b>{CurrentIssue.id === id && 'Current: '}</b>
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
