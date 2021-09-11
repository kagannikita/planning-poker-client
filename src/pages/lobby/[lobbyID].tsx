import { GetServerSideProps, InferGetServerSidePropsType, Redirect } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import { Container } from 'semantic-ui-react'
import { Apis } from '../../api/api'
import MemberLayout from '../../components/Lobby/MemberLayout/MemberLayout'
import { IPlayer, Role } from '../../interfaces/LobbyTypes'
import Chat from '../../components/Chat/Chat'
import DealerLayout from '../../components/Lobby/DealerLayout/DealerLayout'
// import { store } from 'src/store/store'

const LobbyPage = ({ player, ...props }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
	// const reduxStore = initialiseStore({})
	// console.log('lobby page', useStore(props).getState());
	
	return (
		<>
			<Head>
				<title>Lobby Page</title>
			</Head>
			<Chat />
			<Container>{player?.role === Role.dealer ? <DealerLayout {...props} /> : <MemberLayout {...props} />}</Container>
		</>
	)
}

interface LobbySSRProps {
	name: string
	players: IPlayer[]
	player: IPlayer | null
}
export const getServerSideProps: GetServerSideProps<LobbySSRProps> = async ({ params, query }) => {
	
	if (query.lobbyID && query.playerid === undefined) {
		const lobby = await new Apis()
			.getLobbyById(query.lobbyID as string)
			.then((data) => data)
			.catch((err) => {
				return err
			})
		if (!lobby) return { notFound: true }
		return { props: { name: lobby.name, players: lobby.players, player: null } }
	}

	const { name, players } = await new Apis().getLobbyById(params?.lobbyID as string)
	const player = players.find((player) => player.id === query.playerid) as IPlayer
	if (!player) return { notFound: true }

	return { props: { name: name, players: players, player: player } }
}

export default LobbyPage
