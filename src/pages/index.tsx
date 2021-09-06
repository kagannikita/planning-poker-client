import React, { useState } from 'react'
import { Container, Form, Header, Image } from 'semantic-ui-react'

import s from './home.module.scss'
import mainImage from '../../public/images/main_logo.png'
import { ModalConnectToLobby } from '../components/ModalConnectToLobby/ModalConnectToLobby'
import getLobby from '../data/getLobby'

const Home = (): JSX.Element => {
	const [modalState, setModalState] = useState({
		dimmer: undefined,
		isClosed: true,
	} as { dimmer: 'blurring' | undefined; isClosed: boolean })
	const [lobbyID, setLobbyID] = useState('')

	const modalHandler = (): void =>
		setModalState({
			dimmer: 'blurring',
			isClosed: false,
		})

	const findLobby = async (lobbyID?: string) => {
		const lobby = await getLobby(lobbyID)
		if (lobby) location.pathname = `lobby/${lobby.lobbyID}`
	}

	return (
		<>
			<Container className="center aligned">
				<Image src={mainImage.src} className={s.mainLogo} centered></Image>
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
					<Form.Group inline widths="one">
						<Header as="h4">Connect to lobby by URL:</Header>
						<div className="ui action input">
							<input
								type="text"
								value={lobbyID}
								onChange={(e) => setLobbyID(e.target.value)}
								placeholder="Create session:"
							/>
							<button onClick={() => findLobby(lobbyID)} className="ui button teal">
								Connect
							</button>
						</div>
					</Form.Group>
				</Form>
			</Container>
			<ModalConnectToLobby isClosed={modalState.isClosed} dimmer={modalState.dimmer} setModalState={setModalState} />
		</>
	)
}

export default Home
