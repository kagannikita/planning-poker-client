import { FC, useState } from 'react'
import { Button, Input, Modal, Select } from 'semantic-ui-react'
import IssueType from '../../interfaces/IssueType'
// import { deleteIssue } from '../../store/IssuesSlice'
import { ModalState } from './DealerLayout/DealerLayout'

interface ModalCreateIssueProps {
	state: ModalState
	setModalCreateIssueState: React.Dispatch<React.SetStateAction<ModalState>>
}

const selectValues = [
	{key: 'low', value: 'low', text: 'low'},
	{key: 'average', value: 'average', text: 'average'},
	{key: 'high', value: 'high', text: 'high'}
]

const ModalCreateIssue: FC<ModalCreateIssueProps> = (props) => {
	const [newIssue, setNewIssue] = useState<IssueType>({
		id: '',
		title: '',
		priority: 'low'
	});
	const closeHandler = () => {
		props.setModalCreateIssueState({
			...props.state,
			modalIsOpen: false,
		})
	}

	const createHandler = () => {
		// deleteIssue(props.state.id)
		closeHandler()
	}


	return (
		<Modal size="tiny" open={props.state.modalIsOpen} onClose={closeHandler}>
			<Modal.Header>Delete issue?</Modal.Header>
			<Modal.Content>
				<Input label="title"  placeholder="Issue 1" onChange={(e) => setNewIssue({...newIssue, title: e.target.value})} />
				<Select 
				placeholder='Select priority' 
				value={newIssue.priority} 
				options={selectValues}
				onChange={(e, data) => {
					console.log(data.value);
					
					setNewIssue({ ...newIssue })
				}} />
			</Modal.Content>
			<Modal.Actions>
				<Button negative onClick={closeHandler}>
					Cancel
				</Button>
				<Button positive onClick={createHandler}>
					Create
				</Button>
			</Modal.Actions>
		</Modal>
	)
}

export default ModalCreateIssue
