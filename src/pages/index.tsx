import React, { useState } from 'react'
import { Container, Form, Header, Image, Input } from 'semantic-ui-react'
import s from './home.module.scss'
import mainImage from '../../public/images/main_logo.png'
import { ModalConnectToLobby } from '../components/ModalConnectToLobby/ModalConnectToLobby'
import ModalError from '../components/ModalConnectToLobby/ModalError'
import { Apis } from '../api/api'

interface LobbyInputState {
	isSearching: boolean
	name: string
	error: boolean
}

const Home = (): JSX.Element => {
	const [modalState, setModalState] = useState({
		dimmer: undefined,
		isClosed: true,
	} as { dimmer: 'blurring' | undefined; isClosed: boolean })

	const [lobbyState, setLobbyState] = useState<LobbyInputState>({
		isSearching: false,
		name: '',
		error: false,
	})

	const playerID = '60951fe9-7fd6-43b0-aa7d-65b63f060b64'

	const modalHandler = (): void =>
		setModalState({
			dimmer: 'blurring',
			isClosed: false,
		})

	const connectToLobby = async (lobbyID: string) => {
		if (!lobbyState.name) return
		setLobbyState({
			isSearching: true,
			name: lobbyID,
			error: false,
		})

		if (lobbyID && playerID !== '') {
			await new Apis().addPlayerToLobby(lobbyID, playerID)
			location.pathname = `lobby/${lobbyID}`
			setLobbyState({
				isSearching: false,
				name: '',
				error: false,
			})
		} else {
			setLobbyState({
				isSearching: false,
				name: '',
				error: true,
			})
		}
	}

	return (
		<>
			<Container className="center aligned">
				<Image src={mainImage.src} centered></Image>
				<Form id={s.form} className="center aligned">
					<Header as="h1" className={s.heading} size="huge">
						Start your planning:
					</Header>
					<Form.Group inline widths="two">
						<Header as="h4">Create session:</Header>
						<Form.Button color="blue" onClick={modalHandler}>
							Start new game
						</Form.Button>
					</Form.Group>
					<Header as="h1" className={s.heading} size="huge">
						OR:
					</Header>
					<Header as="h4" textAlign="left">
						Connect to lobby by URL:
					</Header>
					<Input
						action={{
							color: 'blue',
							labelPosition: 'left',
							icon: 'search',
							content: 'Connect',
							onClick: () => connectToLobby(lobbyState.name),
						}}
						iconPosition="left"
						error={lobbyState.error}
						onChange={(e) =>
							setLobbyState({
								...lobbyState,
								name: e.target.value,
							})
						}
						type="text"
						input={{
							value: lobbyState.name,
						}}
						loading={lobbyState.isSearching}
						placeholder="Search..."
					/>
				</Form>
			</Container>
			<ModalConnectToLobby isClosed={modalState.isClosed} dimmer={modalState.dimmer} setModalState={setModalState} />
			{lobbyState.error && <ModalError message="Lobby not found or incorrect ID" />}
		</>
	)
}

export default Home
