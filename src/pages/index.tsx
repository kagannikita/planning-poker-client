import React, { useState } from 'react'
import { Container, Image } from 'semantic-ui-react'

import mainImage from '../../public/images/main_logo.png'
import { ModalConnectToGame } from '../components/ModalConnectToGame/ModalConnectToGame'
import getLobby from '../data/getLobby'
import MainForm from '../components/mainForm/mainForm'

export type TModalState = {
	dimmer: 'blurring' | undefined
	isClosed: boolean
}

const Home = (): JSX.Element => {
	const [modalState, setModalState] = useState<TModalState>({
		dimmer: undefined,
		isClosed: true,
	})
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
				<Image src={mainImage.src} className="mainLogo" centered />
				<MainForm lobbyID={lobbyID} modalHandler={modalHandler} setLobbyID={setLobbyID} findLobby={findLobby} />
			</Container>
			<ModalConnectToGame isClosed={modalState.isClosed} dimmer={modalState.dimmer} setModalState={setModalState} />
		</>
	)
}

export default Home
