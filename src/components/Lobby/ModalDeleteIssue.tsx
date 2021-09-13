import { FC } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { deleteIssue } from '../../store/IssuesSlice'
import { ModalState } from './DealerLayout/DealerLayout'

interface ModalDeleteIssueProps {
	state: ModalState
	setModalDeleteIssueState: React.Dispatch<React.SetStateAction<ModalState>>
}

const ModalDeleteIssue: FC<ModalDeleteIssueProps> = (props) => {
	const closeHandler = () => {
		props.setModalDeleteIssueState({
			...props.state,
			modalIsOpen: false,
		})
	}

	const deleteHandler = () => {
		deleteIssue(props.state.id)
		closeHandler()
	}

	return (
		<Modal size="tiny" open={props.state.modalIsOpen} onClose={closeHandler}>
			<Modal.Header>Delete issue?</Modal.Header>
			<Modal.Content>
				<p>
					Are you really want to delete issue <b>{props.state.name}</b> from game session?
				</p>
			</Modal.Content>
			<Modal.Actions>
				<Button negative onClick={closeHandler}>
					No
				</Button>
				<Button positive onClick={deleteHandler}>
					Yes
				</Button>
			</Modal.Actions>
		</Modal>
	)
}

export default ModalDeleteIssue
