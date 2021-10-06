import React, {FC, useState} from 'react'
import {Button, Form, Modal} from 'semantic-ui-react'
import {IssuesAPI} from '../../api/IssuesAPI'
import {IssueType} from '../../interfaces/IssueType'
import {IModalCreateIssue} from './DealerLayout/IssueContainer'

interface ModalChangeIssueProps {
	ModalChange: IModalCreateIssue
	lobbyID: string
	setModalChange: React.Dispatch<React.SetStateAction<IModalCreateIssue>>
	updateIssue: ({ id, name, priority }: IssueType) => void
}

const selectValues = [
	{ key: 'low', value: 'low', text: 'low' },
	{ key: 'average', value: 'average', text: 'average' },
	{ key: 'high', value: 'high', text: 'high' },
]

const ModalChangeIssue: FC<ModalChangeIssueProps> = (props) => {
	const [error, setError] = useState({
		errorLink: false,
		errorName: false,
	})

	const closeHandler = () => {
		props.setModalChange({
			link: '',
			id: '',
			name: '',
			lobby: '',
			priority: 'low',
			modalIsOpen: false,
		})
		setError({
			errorLink: false,
			errorName: false,
		})
	}

	const updateHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		if (props.ModalChange.name && props.ModalChange.link) {
			// console.log('update ', props.ModalChange)
			await new IssuesAPI().update(props.ModalChange as unknown as IssueType)
			props.updateIssue(props.ModalChange as unknown as IssueType)
			closeHandler()
		} else {
			setError({
				errorLink: true,
				errorName: true,
			})
		}
	}

	return (
		<Modal size="small" dimmer="blurring" open={props.ModalChange.modalIsOpen} onClose={closeHandler}>
			<Modal.Header>Update issue</Modal.Header>
			<Modal.Content>
				<Form>
					<Form.Input
						label="Title"
						placeholder="Issue 1"
						required
						error={error.errorName}
						value={props.ModalChange.name}
						onChange={(e) => {
							props.setModalChange({ ...props.ModalChange, name: e.target.value })
						}}
					/>
					<Form.Input
						label="link"
						placeholder="http://www.localhost.com/doc/asdas-dasd2312"
						required
						error={error.errorLink}
						value={props.ModalChange.link}
						onChange={(e) => {
							props.setModalChange({ ...props.ModalChange, link: e.target.value })
						}}
					/>
					<Form.Select
						label="Select priority"
						placeholder="Priority"
						required
						value={props.ModalChange.priority}
						options={selectValues}
						onChange={(e, data) => {
							props.setModalChange({
								...props.ModalChange,
								priority: data.value as 'low' | 'average' | 'high',
							})
						}}
					/>
					<Modal.Actions>
						<Button negative onClick={closeHandler}>
							Cancel
						</Button>
						<Button type="submit" positive onClick={updateHandler}>
							Update
						</Button>
					</Modal.Actions>
				</Form>
			</Modal.Content>
		</Modal>
	)
}

export default ModalChangeIssue
