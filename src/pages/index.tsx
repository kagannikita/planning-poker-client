import React, { useState } from 'react'
import { Container, Image } from 'semantic-ui-react'
import mainImage from '../../public/images/main_logo.png'
import { ModalConnectToGame } from '../components/ModalConnectToGame/ModalConnectToGame'
import MainForm from '../components/mainForm/mainForm'
import ModalError from '../components/ModalConnectToGame/ModalError'
import { Apis } from '../api/api'
// import { useRouter } from 'next/router'

export type TModalState = {
	dimmer: 'blurring' | undefined
	isClosed: boolean
	formName: string
}

export type ErrorModalState = {
	isError: boolean
	message: string
}

const Home = (): JSX.Element => {
	// const router = useRouter();
	const [modalState, setModalState] = useState<TModalState>({
		dimmer: undefined,
		isClosed: true,
		formName: '',
	})
	const [errorModalState, setErrorModalState] = useState<ErrorModalState>({
		isError: false,
		message: '',
	})

	const [lobbyID, setLobbyID] = useState('')
	const [playerID, setplayerID] = useState('')

	const modalHandler = (formName: string): void =>
		setModalState({
			dimmer: 'blurring',
			isClosed: false,
			formName,
		})

	const modalErrorHander = (message: string) =>
		setErrorModalState({
			message,
			isError: !errorModalState.isError,
		})

	const createLobby = async () => {
		const newLobby = await new Apis().createLobby('123')
		console.log(newLobby)
		return newLobby
	}

	const connectToLobby = async () => {}

	const findLobby = async (lobbyID: string) => {
		// const lobby = await new Apis().addPlayerToLobby(lobbyID, '')
		const lobby = await new Apis().getLobbyById(lobbyID)
		// console.log(lobby);
		// location.pathname = `lobby/` + lobbyID
		if (lobby) {
			modalHandler('Connect to lobby ' + lobbyID)
			// router.push({ pathname: API.LOBBY + lobbyID, query: { playerid: "60951fe9-7fd6-43b0-aa7d-65b63f060b64" }})
		} else {
			modalErrorHander('Lobby not found or Incorrect lobby id')
		}
	}
	return (
		<>
			<Container className="center aligned">
				<Image src={mainImage.src} className="mainLogo" centered />
				<MainForm lobbyID={lobbyID} modalHandler={modalHandler} setLobbyID={setLobbyID} findLobby={findLobby} />
			</Container>
			<ModalConnectToGame
				isClosed={modalState.isClosed}
				dimmer={modalState.dimmer}
				setModalState={setModalState}
				formName={modalState.formName}
				playerID={playerID}
				setPlayerID={setplayerID}
				createLobby={createLobby}
				connectToLobby={connectToLobby}
			/>
			<ModalError {...errorModalState} setErrorModalState={setErrorModalState} />
		</>
	)
}

export default Home
