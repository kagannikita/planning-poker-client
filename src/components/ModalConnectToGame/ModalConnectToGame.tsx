import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { TModalState } from '../../pages'

interface ModalLobbyProps {
	isClosed: boolean
	setModalState: React.Dispatch<React.SetStateAction<TModalState>>
	dimmer: 'blurring' | undefined
}

export const ModalConnectToGame = ({ isClosed, setModalState, dimmer }: ModalLobbyProps): JSX.Element => {
	const onClose = (): void => setModalState({ isClosed: !isClosed, dimmer: undefined })

	return (
		<Modal dimmer={dimmer} open={!isClosed} onClose={onClose}>
			<Modal.Header className="modal-title">
				<h2>Connect to lobby</h2>
				<Form.Radio toggle label="Connect as Observer" />
			</Modal.Header>
			<Form style={{ padding: '2rem' }}>
				<Modal.Content>
					<Form.Field>
						<label htmlFor="firstName">First Name</label>
						<input id="firstName" placeholder="First Name" />
					</Form.Field>
					<Form.Field>
						<label htmlFor="lastName">Last Name</label>
						<input id="lastName" placeholder="Last Name" />
					</Form.Field>
					<Form.Field>
						<label htmlFor="position">Your job position</label>
						<input id="position" placeholder="Senior software engineer" />
					</Form.Field>
					<Form.Field className="avatar-field">
						<label htmlFor="avatar">Photo:</label>
						<div className="avatar">
							<Form.Input id="avatar" type="file" />
						</div>
					</Form.Field>
				</Modal.Content>
				<Modal.Actions>
					<Button positive onClick={onClose}>
						Confirm
					</Button>
					<Button negative onClick={onClose}>
						Cancel
					</Button>
				</Modal.Actions>
			</Form>
		</Modal>
	)
}
