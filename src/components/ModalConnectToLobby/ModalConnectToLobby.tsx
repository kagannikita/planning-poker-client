import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'

export interface ModalLobbyProps {
	isClosed: boolean
	setModalState: React.Dispatch<
		React.SetStateAction<{
			dimmer: 'blurring' | undefined
			isClosed: boolean
		}>
	>
	dimmer: 'blurring' | undefined
}

export const ModalConnectToLobby = ({ isClosed, setModalState, dimmer }: ModalLobbyProps): JSX.Element => {
	const onClose = (): void => setModalState({ isClosed: !isClosed, dimmer: undefined })

	return (
		<Modal dimmer={dimmer} open={!isClosed} onClose={onClose}>
			<Modal.Header as="h1">Connect to lobby</Modal.Header>
			<Form style={{ padding: '2rem' }}>
				<Modal.Content>
					<Form.Radio toggle label="Connect as Observer" />
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
						<input id="position" placeholder="Programmer" />
					</Form.Field>
					<label htmlFor="avatar">Image:</label>
					<Form.Group>
						<Form.Input id="avatar" label="Choose File" type="file"></Form.Input>
					</Form.Group>
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
