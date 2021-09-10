import React, { useState } from 'react'
import { Container, Image } from 'semantic-ui-react'
import mainImage from '../../public/images/main_logo.png'
import { ModalConnectToGame } from '../components/ModalConnectToGame/ModalConnectToGame'
import MainForm from '../components/mainForm/mainForm'
import ModalError from '../components/ModalConnectToGame/ModalError'
import { API, Apis } from '../api/api'
import { useRouter } from 'next/router'
// import { store } from 'src/store/store'
import { setPlayerID } from 'src/store/playerData'
import { initialiseStore, RootState, useStore } from 'src/store/store'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export type TModalState = {
	dimmer: 'blurring' | undefined
	isClosed: boolean
	formName: string
}

export type ErrorModalState = {
	isError: boolean
	message: string
}

const Home = ({ initialReduxState }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
	const router = useRouter()
	console.log(initialReduxState);
	const store = useStore(initialReduxState)

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
		return await new Apis().createLobby(lobbyName)
	}

	const connectToLobby = async (lobbyID: string, playerID: string) => {
		await new Apis().addPlayerToLobby(lobbyID, playerID)
		store.dispatch(setPlayerID(playerID));
		console.log("home page ",store.getState());
		
		await router.push({ pathname: API.LOBBY + lobbyID, query: {playerid: playerID} })
	}

	const findLobby = async (lobbyID: string) => {
		const httpRegex = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/
		const lobbyIdRegex = /(?:lobby\/)(.{36})/
		const result = lobbyID.match(httpRegex) as RegExpMatchArray;
		const lobby = result[5].match(lobbyIdRegex) as RegExpMatchArray;
		
		if (!lobby[1]) return modalErrorHander('Incorrect lobby link')
		
		const lobbyisFound = await new Apis()
			.getLobbyById(lobby[1])
			.then(() => true)
			.catch(() => false)

		if (lobbyisFound) {
			modalHandler('Connect to lobby by id:' + lobbyID)
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
			/>
			<ModalError {...errorModalState} setErrorModalState={setErrorModalState} />
		</>
	)
}
interface HomeSSRProps {
	initialReduxState: RootState
}

export const getServerSideProps: GetServerSideProps<HomeSSRProps> = async () => {
	const reduxStore = initialiseStore({})
	// reduxStore.dispatch(setPlayerID(''))


	return { props: { initialReduxState: reduxStore.getState() } }
}

export default Home
