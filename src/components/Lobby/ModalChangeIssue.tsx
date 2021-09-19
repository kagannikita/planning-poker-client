import { FC } from 'react'
import { Button, Input, Modal, Select } from 'semantic-ui-react'
import { IssuesAPI } from '../../api/IssuesAPI'
import { IssueType } from '../../interfaces/IssueType'
import { IModalCreateIssue } from './DealerLayout/IssueContainer'

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
	const closeHandler = () => {
		props.setModalChange({
			...props.ModalChange,
			modalIsOpen: false,
		})
	}

	const updateHandler = async () => {
		console.log('update ', props.ModalChange)
		await new IssuesAPI().update(props.ModalChange)
		props.updateIssue(props.ModalChange)
		closeHandler()
	}

	return (
		<Modal size="tiny" dimmer="blurring" open={props.ModalChange.modalIsOpen} onClose={closeHandler}>
			<Modal.Header>Update issue</Modal.Header>
			<Modal.Content>
				<Input
					label="title"
					placeholder="Issue 1"
					value={props.ModalChange.name}
					onChange={(e) => {
						props.setModalChange({ ...props.ModalChange, name: e.target.value })
					}}
				/>
				<Select
					placeholder="Select priority"
					value={props.ModalChange.priority}
					options={selectValues}
					onChange={(e, data) => {
						props.setModalChange({
							...props.ModalChange,
							priority: data.value as 'low' | 'average' | 'high',
						})
					}}
				/>
			</Modal.Content>
			<Modal.Actions>
				<Button negative onClick={closeHandler}>
					Cancel
				</Button>
				<Button positive onClick={() => updateHandler()}>
					Update
				</Button>
			</Modal.Actions>
		</Modal>
	)
}

export default ModalChangeIssue
