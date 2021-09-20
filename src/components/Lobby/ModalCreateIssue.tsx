import React, { FC, useState } from 'react'
import { Button, Form, Input, Modal, Select } from 'semantic-ui-react'
import { IModalCreateIssue } from './DealerLayout/IssueContainer'
import { IssueType } from '../../interfaces/IssueType'
import { IssuesAPI } from '../../api/IssuesAPI'

interface ModalCreateIssueProps {
	ModalCreate: IModalCreateIssue
	lobbyID: string
	setModalCreate: React.Dispatch<React.SetStateAction<IModalCreateIssue>>
	createIssue: ({ name, priority }: IssueType) => void
}

const selectValues = [
	{ key: 'low', value: 'low', text: 'low' },
	{ key: 'average', value: 'average', text: 'average' },
	{ key: 'high', value: 'high', text: 'high' },
]

const ModalCreateIssue: FC<ModalCreateIssueProps> = (props) => {
	const [error, setError] = useState({
		errorLink: false,
		errorName: false
	})
	const [newIssue, setNewIssue] = useState<IssueType>({
		id: '',
		name: '',
		link: '',
		priority: 'low',
		lobby: props.lobbyID,
	})

	const closeHandler = () => {
		setNewIssue({
			id: '',
			name: '',
			link: '',
			priority: 'low',
			lobby: props.lobbyID,
		})
		props.setModalCreate({
			...props.ModalCreate,
			modalIsOpen: false,
		})
		setError({
			errorLink: false,
			errorName: false
		})
	}
	
	const createHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		if (newIssue.name && newIssue.link) {
			await new IssuesAPI().create({
				lobby: newIssue.lobby,
				name: newIssue.name,
				link: newIssue.link,
				priority: newIssue.priority,
			})
			props.createIssue(newIssue)
			closeHandler()
		} else {
			setError({
				errorLink: true,
				errorName: true
			})
		}
	}

	return (
		<Modal size="small" dimmer="blurring" open={props.ModalCreate.modalIsOpen} onClose={closeHandler}>
			<Modal.Header>Create issue</Modal.Header>
			<Modal.Content>
				< Form >
					<Form.Input
						label="Title"
						placeholder="Issue 1"
						required
						error={error.errorName}
						value={newIssue.name}
						onChange={(e) => {
							setNewIssue({ ...newIssue, name: e.target.value })
						}}
					/>
					<Form.Input
						label="link"
						placeholder="http://www.localhost.com/doc/asdas-dasd2312"
						required
						error={error.errorLink}
						value={newIssue.link}
						onChange={(e) => {
							setNewIssue({ ...newIssue, link: e.target.value })
							setNewIssue({ ...newIssue, link: e.target.value })
						}}
					/>
					<Form.Select
						label="Select priority"
						placeholder="Priority"
						required
						value={newIssue.priority}
						options={selectValues}
						onChange={(e, data) => {
							setNewIssue({ ...newIssue, priority: data.value as 'low' | 'average' | 'high' })
						}}
					/>
					<Modal.Actions>
						<Button negative onClick={closeHandler}>
							Cancel
						</Button>
						<Button type="submit" positive onClick={createHandler}>
							Create
						</Button>
					</Modal.Actions>
				</Form >
			</Modal.Content>
		</Modal>
	)
}

export default ModalCreateIssue
