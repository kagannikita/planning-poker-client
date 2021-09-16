import { FC, useState } from 'react'
import { Button, Input, Modal, Select } from 'semantic-ui-react'
import { IssuesAPI } from 'src/api/IssuesAPI'
import { IssueType } from 'src/interfaces/IssueType'
import { IModalCreateIssue } from '../Lobby/DealerLayout/IssueContainer'

interface ModalCreateIssueProps {
	ModalCreate: IModalCreateIssue
	lobbyID: string
	setModalCreate: React.Dispatch<React.SetStateAction<IModalCreateIssue>>
	// issues: IssueType[]
	// setIssuesState: React.Dispatch<React.SetStateAction<IssueType[]>>
	createIssue: ({ name, priority }: IssueType) => void
}

const selectValues = [
	{key: 'low', value: 'low', text: 'low'},
	{key: 'average', value: 'average', text: 'average'},
	{key: 'high', value: 'high', text: 'high'}
]

export const ModalCreateIssue: FC<ModalCreateIssueProps> = (props) => {

	const [newIssue, setNewIssue] = useState<IssueType>({
		id: '',
		name: '',
		priority: 'low',
		lobby: props.lobbyID
	});

	const closeHandler = () => {
		setNewIssue({
			id: '',
			name: '',
			priority: 'low',
			lobby: props.lobbyID
		})
		props.setModalCreate({
			id: '',
			name: '',
			priority: 'low',
			lobby: props.lobbyID,
			modalIsOpen: false,
		})
	}

	const createHandler = async () => {
		// const {id} = await new IssuesAPI().create(newIssue)
		// newIssue.id = id;
		props.createIssue(newIssue);
		// props.setIssuesState([...props.issues, newIssue])
		closeHandler()
	}


	return (
		<Modal size="tiny" dimmer="blurring" open={props.ModalCreate.modalIsOpen} onClose={closeHandler}>
		 <Modal.Header>Create issue</Modal.Header>
			<Modal.Content>
				<Input label="title"  
				placeholder="Issue 1" 
					value={newIssue.name}
				onChange={(e) => {
					setNewIssue({ ...newIssue, name: e.target.value })
				}} />
				<Select 
				placeholder='Select priority' 
					value={newIssue.priority}
				options={selectValues}
				onChange={(e, data) => {
					setNewIssue({ ...newIssue, 
						priority: data.value as "low" | "average" | "high"})
				}} />
			</Modal.Content>
			<Modal.Actions>
				<Button negative onClick={closeHandler}>
					Cancel
				</Button>
				<Button positive onClick={() => createHandler()}>
					Create
				</Button> 
			</Modal.Actions>
		</Modal>
	)
}

export default ModalCreateIssue
