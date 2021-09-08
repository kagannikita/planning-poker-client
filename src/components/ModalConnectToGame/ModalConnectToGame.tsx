import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { TModalState } from '../../pages'
import { Apis } from '../../api/api'
import { ILobby } from '../../interfaces/LobbyTypes'

interface ModalProps {
	isClosed: boolean
	setModalState: React.Dispatch<React.SetStateAction<TModalState>>
	dimmer: 'blurring' | undefined
	formName: string
	createLobby: () => Promise<ILobby>
	connectToLobby: () => void
	playerID: string
	setPlayerID: React.Dispatch<React.SetStateAction<string>>
}

export const ModalConnectToGame = ({
	isClosed,
	setModalState,
	dimmer,
	formName,
	createLobby,
	connectToLobby,
}: ModalProps): JSX.Element => {
	const onClose = (): void => setModalState({ isClosed: !isClosed, dimmer: undefined, formName: '' })

	const writePlayer = async (player: FormData) => {
		const api = new Apis()
		api.createPlayer(player)
	}

	const getRole = (formData: FormData) => {
		if (formName === 'Create new game') {
			formData.append('role', 'dealer')
		} else {
			const role = formData.get('role')
			if (role === null) {
				formData.set('role', 'player')
			} else {
				formData.set('role', 'spectator')
			}
		}
		return formData
	}

	const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const formData = new FormData(e.target as HTMLFormElement)
		writePlayer(getRole(formData)).then(() => {
			if (formName === 'Create new game') {
				createLobby()
			} else {
				connectToLobby()
			}
			onClose()
		})
	}

	const symbol = ' ~ ! @ # $ % * () _ — + = | : ; " \' ` < > , . ? / ^'
	return (
		<Modal dimmer={dimmer} open={!isClosed} onClose={onClose}>
			<Modal.Header className="modal-title">
				<h2>{formName}</h2>
				{formName === 'Create new game' ? null : (
					<Form.Radio form="regForm" name="role" toggle label="Connect as Observer" />
				)}
			</Modal.Header>
			<Form id="regForm" style={{ padding: '2rem' }} onSubmit={(e) => formSubmit(e)}>
				<Modal.Content>
					<Form.Field>
						<label htmlFor="firstName">
							First Name
							<span style={{ color: 'red' }}> *</span>
						</label>
						<input
							id="firstName"
							placeholder="First Name"
							name="firstName"
							type="text"
							required
							pattern="^[a-zA-Zа-яА-Я0-9 ]{0,30}[a-zA-Zа-яА-Я]+[ 0-9]*$"
							maxLength={30}
							title={`First Name can not be made of only numbers or consist of symbols ${symbol}. The name\`s lengths is up to 30 symbols`}
						/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="lastName">Last Name</label>
						<input
							id="lastName"
							placeholder="Last Name"
							name="lastName"
							type="text"
							pattern="^[a-zA-Zа-яА-Я0-9 ]{0,30}[a-zA-Zа-яА-Я]+[ 0-9]*$"
							maxLength={30}
							title={`Last Name can not be made of only numbers or consist of symbols ${symbol}. The name\`s lengths is up to 30 symbols`}
						/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="position">Your job position</label>
						<input
							id="position"
							placeholder="Senior software engineer"
							name="position"
							type="text"
							pattern="^[a-zA-Zа-яА-Я0-9 ]{0,30}[a-zA-Zа-яА-Я]+[ 0-9]*$"
							maxLength={40}
							title={`Last Name can not be made of only numbers or consist of symbols ${symbol}. The name\`s lengths is up to 40 symbols`}
						/>
					</Form.Field>
					<Form.Field className="avatar-field">
						<label htmlFor="avatar">Photo:</label>
						<div className="avatar">
							<Form.Input id="avatar" name="avatar" type="file" accept="image/*" />
						</div>
					</Form.Field>
				</Modal.Content>
				<Modal.Actions>
					<Button positive type="submit">
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
