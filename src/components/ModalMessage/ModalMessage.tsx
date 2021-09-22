import React, { FC } from 'react'
import { Button, Modal } from 'semantic-ui-react'

interface ModalMessageProps {
	modalMessageState: { modalIsOpen: boolean; message: string }
	setModalMessageState: React.Dispatch<React.SetStateAction<{ modalIsOpen: boolean; message: string }>>
}

const ModalMessage: FC<ModalMessageProps> = ({ modalMessageState, setModalMessageState }) => {
	const closeHandler = () => {
		setModalMessageState({ ...modalMessageState, modalIsOpen: false })
	}

	return (
		<Modal size="small" dimmer="blurring" open={modalMessageState.modalIsOpen} onClose={closeHandler}>
			<Modal.Header>Sorry, but :</Modal.Header>
			<Modal.Content>
				<h3>{modalMessageState.message}</h3>
				<Modal.Actions>
					<Button type="submit" positive onClick={closeHandler}>
						OK
					</Button>
				</Modal.Actions>
			</Modal.Content>
		</Modal>
	)
}

export default ModalMessage
