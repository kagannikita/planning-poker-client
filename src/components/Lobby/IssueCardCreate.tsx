import React, { useState } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { IModalCreateIssue } from './DealerLayout/IssueContainer'

interface IssueCardCreateProps {
	lobbyId: string
	setModalCreate: React.Dispatch<React.SetStateAction<IModalCreateIssue>>
}

const IssueCardCreate = ({ setModalCreate, lobbyId }: IssueCardCreateProps) => {
	return (
		<Card centered>
			<Card.Content>
				<Card.Header>Create Issue:</Card.Header>
				<Card.Meta />
				<Card.Description>
					<Button size="mini" floated="right" onClick={() => setModalCreate({
						id: '',
						modalIsOpen:true,
						name: '',
						priority: 'low',
						lobby: lobbyId
					})}>
						Add
					</Button>
				</Card.Description>
			</Card.Content>
		</Card>
	)
}

export default IssueCardCreate
