import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { TModalState } from '../../pages'
import { Apis } from '../../api/api'

interface ModalProps {
	isClosed: boolean
	setModalState: React.Dispatch<React.SetStateAction<TModalState>>
	dimmer: 'blurring' | undefined
	formName: string
}

export const ModalConnectToGame = ({ isClosed, setModalState, dimmer, formName }: ModalProps): JSX.Element => {
	const onClose = (): void => setModalState({ isClosed: !isClosed, dimmer: undefined, formName: '' })

	const writePlayer = (player: FormData) => {
		const api = new Apis()
		console.log(api)
	}

	const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const formData = new FormData(e.target as HTMLFormElement)
		writePlayer(formData)
		onClose()
	}

	const symbol = ' ~ ! @ # $ % * () _ — + = | : ; " \' ` < > , . ? / ^'
	return (
		<Modal dimmer={dimmer} open={!isClosed} onClose={onClose}>
			<Modal.Header className="modal-title">
				<h2>{formName}</h2>
				<Form.Radio toggle label="Connect as Observer" />
			</Modal.Header>
			<Form style={{ padding: '2rem' }} onSubmit={(e) => formSubmit(e)}>
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
