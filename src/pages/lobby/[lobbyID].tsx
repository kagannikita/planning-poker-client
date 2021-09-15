import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { IPlayer, Role } from '../../interfaces/LobbyTypes'
import DealerLayout from '../../components/Lobby/DealerLayout/DealerLayout'
import MemberLayout from '../../components/Lobby/MemberLayout/MemberLayout'
import { LocalStorageEnum } from '../../interfaces/localStorageEnum'
import { useRouter } from 'next/router'
import LobbyAPI from '../../api/LobbyApi'
import { useLobbyDataSocket } from '../../hooks'
import io from 'socket.io-client'
import { IssueType } from '../../interfaces/IssueType'
import { IssuesAPI } from '../../api/IssuesAPI'

const LobbyPage = ({ ...props }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
	const router = useRouter()
	const socket = React.useMemo<SocketIOClient.Socket>(() => io('http://localhost:8082'), [])
	const [player, setPlayer] = useState<IPlayer | Partial<IPlayer>>({})

	useEffect(() => {
		const id = localStorage.getItem(LocalStorageEnum.playerid)
		const player = props.players.find((player) => player.id === id) as IPlayer

		if (!player) router.push('/404')
		setPlayer(player)
		socket.on('connect', () => {
			socket.emit('join', {
				name: player.id,
				lobby_id: props.lobbyId,
			})
		})
		socket.on('joined', async (content: { players: IPlayer[] }) => {
			console.log('Content: ', content.players)
			// туда обновляй мемберов
		})
	}, [router, props.players, socket])

	const dataSocket = useLobbyDataSocket(props.lobbyId, player.id as string)

	return (
		<>
			<Head>
				<title>Lobby Page</title>
			</Head>
			{/* <Chat /> */}
			<Container>
				{player?.role === Role.dealer ? (
					<DealerLayout dealerPlayer={player as IPlayer} socketData={dataSocket} {...props} />
				) : (
					<MemberLayout {...props} />
				)}
			</Container>
		</>
	)
}

interface LobbySSRProps {
	name: string
	lobbyId: string
	players: IPlayer[]
	issues: IssueType[]
}

export const getServerSideProps: GetServerSideProps<LobbySSRProps> = async ({ query }) => {
	const lobby = await new LobbyAPI()
		.getLobbyById(query.lobbyID as string)
		.then((data) => data)
		.catch((err) => err)
	if (!lobby) return { notFound: true }
	const issues = await new IssuesAPI().getAllByLobbyId(query.lobbyID as string)

	return {
		props: {
			name: lobby.name,
			lobbyId: query.lobbyID as string,
			players: lobby.players,
			issues,
		},
	}
}

export default LobbyPage
