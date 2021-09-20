import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { IPlayer, Role } from '../../interfaces/LobbyTypes'
import DealerLayout from '../../components/Lobby/DealerLayout/DealerLayout'
import MemberLayout from '../../components/Lobby/MemberLayout/MemberLayout'
import { LocalStorageEnum } from '../../interfaces/localStorageEnum'
import { useRouter } from 'next/router'
import { useLobbyDataSocket } from '../../hooks'
import Loader from '../../components/loader/loader'

const LobbyPage = ({ ...props }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
	const router = useRouter()
	const [playerId, setPlayerId] = useState('')
	const [Loading, setLoading] = useState(true)

	useEffect(() => {
		const id = sessionStorage.getItem(LocalStorageEnum.playerid)
		if (!id) router.push('/404')

		setPlayerId(id as string)
		setLoading(false)
	}, [router])

	const dataSocket = useLobbyDataSocket(props.lobbyId, playerId)
	const player = dataSocket.lobbyData?.players.find((player) => player.id === playerId) as IPlayer

	return (
		<>
			<Head>
				<title>Lobby Page</title>
			</Head>
			{/* <Chat /> */}
			{Loading ? (
				<Loader loaderText="loading" />
			) : (
				<Container className='main-container'>
					{player?.role === Role.dealer ? (
						<DealerLayout dealerPlayer={player} socketData={dataSocket} {...props} />
					) : (
						<MemberLayout socketData={dataSocket} />
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
