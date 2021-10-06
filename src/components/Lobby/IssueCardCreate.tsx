import React from 'react'
import { Button, Card } from 'semantic-ui-react'
import { IModalCreateIssue } from './DealerLayout/IssueContainer'
import s from './lobby.module.scss';

interface IssueCardCreateProps {
	lobbyId: string
	setModalCreate: React.Dispatch<React.SetStateAction<IModalCreateIssue>>
}

const IssueCardCreate = ({ setModalCreate, lobbyId }: IssueCardCreateProps) => {
	return (
		<Card centered  className={s.item}>
			<Card.Content>
				<Card.Header>Create Issue:</Card.Header>
				<br/>
				<br/>
				<Card.Description >
					<Button
						size="mini"
						basic
						color='teal'
						floated="right"
						onClick={() =>
							setModalCreate({
								id: '',
								modalIsOpen: true,
								name: '',
								link: '',
								priority: 'low',
								lobby: lobbyId,
							})
						}
					>
						Add
					</Button>
				</Card.Description>
			</Card.Content>
		</Card>
	)
}

export default IssueCardCreate
