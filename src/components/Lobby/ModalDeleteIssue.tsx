import { FC } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { ModalState } from './DealerLayout/DealerLayout'
import { IssueType } from '../../interfaces/IssueType'

interface ModalDeleteIssueProps {
	state: ModalState
	issuesArr: IssueType[] | undefined
	setModalDelete: React.Dispatch<React.SetStateAction<ModalState>>
	removeIssue: (id: string) => void
}

const ModalDeleteIssue: FC<ModalDeleteIssueProps> = (props) => {
	const closeHandler = () => {
		props.setModalDelete({
			...props.state,
			modalIsOpen: false,
		})
	}

	const deleteHandler = async () => {
		props.removeIssue(props.state.id)
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
