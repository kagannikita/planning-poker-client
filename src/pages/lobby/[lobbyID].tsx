import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import React, { useEffect, useMemo, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { IPlayer, Role } from '../../interfaces/LobbyTypes'
import DealerLayout from '../../components/Lobby/DealerLayout/DealerLayout'
import MemberLayout from '../../components/Lobby/MemberLayout/MemberLayout'
import { LocalStorageEnum } from '../../interfaces/localStorageEnum'
import { useRouter } from 'next/router'
import { useLobbyDataSocket } from '../../hooks'
import Loader from '../../components/loader/loader'
import io from 'socket.io-client'
import Chat from '../../components/Chat/Chat'
import { API } from '../../interfaces/ApiEnum'
import { getMessagesByLobbyId } from '../../api/ChatAPI'
import { ChatMessageProps } from '../../components/Chat/ChatMessage'

const LobbyPage = ({ ...props }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
	const router = useRouter()
	const [Loading, setLoading] = useState(true)
	const [playerId, setPlayerId] = useState<string>('')

	useEffect(() => {
		const id = sessionStorage.getItem(LocalStorageEnum.playerid)
		if (id === null) router.push('/404')

		setPlayerId(id as string)
	}, [playerId])

	const sockets = useMemo(() => io(API.MAIN_API), [playerId])
	const dataSocket = useLobbyDataSocket(sockets, props.lobbyId, playerId, props.messages)
	const player = dataSocket?.lobbyData?.players.find((player) => player.id === playerId) as IPlayer
	useEffect(() => {
		setLoading(false)
	}, [player])

	return (
		<>
			<Head>
				<title>Lobby Page</title>
			</Head>
			<Chat
				messages={dataSocket.chatMessages}
				yourMember={playerId}
				lobbyId={props.lobbyId}
				socketData={dataSocket}
				myRole={player?.role}
			/>
			{Loading ? (
				<Loader loaderText="loading" />
			) : (
				<Container className="main-container">
					{player?.role === Role.dealer ? (
						<DealerLayout dealerPlayer={player} socketData={dataSocket} {...props} />
					) : (
						<MemberLayout socketData={dataSocket} yourId={playerId} />
					)}
				</Container>
			)}
		</>
	)
}

interface LobbySSRProps {
	lobbyId: string
	messages: ChatMessageProps[]
}

export const getServerSideProps: GetServerSideProps<LobbySSRProps> = async ({ query }) => {
	const messages = await getMessagesByLobbyId(query.lobbyID as string)
	return {
		props: {
			lobbyId: query.lobbyID as string,
			messages,
		},
	}
}

export default LobbyPage
