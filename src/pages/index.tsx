import React, { useState } from 'react'
import { Container, Image } from 'semantic-ui-react'
import mainImage from '../../public/images/main_logo.png'
import { ModalConnectToGame } from '../components/ModalConnectToGame/ModalConnectToGame'
import MainForm from '../components/mainForm/mainForm'
import ModalError from '../components/ModalConnectToGame/ModalError'
import { API } from '../interfaces/ApiEnum'
import { useRouter } from 'next/router'
import { LocalStorageEnum } from '../interfaces/localStorageEnum'
import PlayerAPI from '../api/PlayerApi'
import LobbyAPI from '../api/LobbyApi'

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
	const router = useRouter()

	const [modalState, setModalState] = useState<TModalState>({
		dimmer: undefined,
		isClosed: true,
		formName: '',
	})
	const [errorModalState, setErrorModalState] = useState<ErrorModalState>({
		isError: false,
		message: '',
	})

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [lobbyID, setLobbyID] = useState('')

	const modalHandler = (formName: string): void =>
		setModalState({
			dimmer: 'blurring',
			isClosed: false,
			formName,
		})

	const modalErrorHander = (message: string) =>
		setErrorModalState({
			message,
			isError: true,
		})

	const createLobby = async (lobbyName: string) => {
		return await new LobbyAPI().createLobby(lobbyName)
	}

	const connectToLobby = async (lobbyID: string, playerID: string) => {
		await new PlayerAPI().addPlayerToLobby(lobbyID, playerID)
		sessionStorage.setItem(LocalStorageEnum.playerid, playerID)
		await router.push({ pathname: API.LOBBY + lobbyID })
	}

	const findLobby = async (lobbyID: string) => {
		const httpRegex = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/
		const lobbyIdRegex = /(?:lobby\/)(.{36})/
		const result = lobbyID.match(httpRegex) as RegExpMatchArray

		const lobby = result[5].match(lobbyIdRegex) as RegExpMatchArray
		if (!lobby) return modalErrorHander('Incorrect lobby link')
		if (lobby[1] === null) return modalErrorHander('Incorrect lobby link')

		const lobbyisFound = await new LobbyAPI()
			.getLobbyById(lobby[1])
			.then(() => true)
			.catch(() => false)

		if (lobbyisFound) {
			setLobbyID(lobby[1])
			modalHandler('Connect to lobby by id:' + lobby[1])
		} else {
			modalErrorHander('Lobby not found or Incorrect lobby link')
		}
	}
	return (
		<>
			<Container className="center aligned">
				<Image src={mainImage.src} className="mainLogo" centered />
				<MainForm lobbyID={lobbyID} modalHandler={modalHandler} setLobbyID={setLobbyID} findLobby={findLobby} />
			</Container>
			<ModalConnectToGame
				{...modalState}
				setModalState={setModalState}
				lobbyID={lobbyID}
				createLobby={createLobby}
				connectToLobby={connectToLobby}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			/>
			<ModalError {...errorModalState} setErrorModalState={setErrorModalState} />
		</>
	)
}

export default Home
