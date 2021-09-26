import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import io from 'socket.io-client'
import Head from 'next/head'
import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { IPlayer, Role } from '../../interfaces/LobbyTypes'
import DealerLayout from '../../components/Lobby/DealerLayout/DealerLayout'
import MemberLayout from '../../components/Lobby/MemberLayout/MemberLayout'
import { LocalStorageEnum } from '../../interfaces/localStorageEnum'
import { useRouter } from 'next/router'
import { useLobbyDataSocket } from '../../hooks'
import Loader from '../../components/loader/loader'
import { API } from 'src/interfaces/ApiEnum'

const LobbyPage = ({ ...props }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
	const router = useRouter()
	const [playerId, setPlayerId] = useState('')
	const [Loading, setLoading] = useState(true)

	useEffect(() => {
		const id = sessionStorage.getItem(LocalStorageEnum.playerid)
		if (!id) router.push('/404')
		setPlayerId(id as string)
	}, [router, playerId])
	const socket = useMemo(() => io(API.MAIN_API, { query: props.lobbyId }), [playerId])

	const dataSocket = useLobbyDataSocket(socket, props.lobbyId, playerId)
	const player = dataSocket.lobbyData?.players.find((player) => player.id === playerId) as IPlayer
	useEffect(() => {
		setLoading(false)
	}, [player])

	return (
		<>
			<Head>
				<title>Lobby Page</title>
			</Head>
			{/* <Chat /> */}
			{Loading ? (
				<Loader loaderText="loading" />
			) : (
				<Container className="main-container">
					{player?.role === Role.dealer ? (
						<DealerLayout dealerPlayer={player} socketData={dataSocket} {...props} />
					) : (
						<MemberLayout socketData={dataSocket} you={playerId} />
					)}
				</Container>
			)}
		</>
	)
}

interface LobbySSRProps {
	// name: string
	lobbyId: string
	// players: IPlayer[]
	// issues: IssueType[]
}

export const getServerSideProps: GetServerSideProps<LobbySSRProps> = async ({ query }) => {
	// const lobby = await new LobbyAPI()
	// 	.getLobbyById(query.lobbyID as string)
	// 	.then((data) => data)
	// 	.catch((err) => err)
	// 	if (!lobby) return { notFound: true }
	// const issues = await new IssuesAPI().getAllByLobbyId(query.lobbyID as string);

	return {
		props: {
			// name: lobby.name,
			lobbyId: query.lobbyID as string,
			// players: lobby.players,
			// issues
		},
	}
}

export default LobbyPage
