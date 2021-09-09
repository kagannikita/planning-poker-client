import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import React from 'react'
import { Container } from 'semantic-ui-react'
import { Apis } from '../../api/api'
import MemberLayout from '../../components/Lobby/MemberLayout/MemberLayout'
import { IPlayer, Role } from '../../interfaces/LobbyTypes'
import Chat from '../../components/Chat/Chat'
import DealerLayout from '../../components/Lobby/DealerLayout/DealerLayout'

const LobbyPage = ({ player, ...props }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
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
	if(params && query.playerid !==undefined) {
		const { name, players } = await new Apis().getLobbyById(params.lobbyID as string)
		const player = players.find(player => player.id === query.playerid) as IPlayer

		return { props: { name: name, players: players, player: player } }
	} else if (params) {
		const { name, players } = await new Apis().getLobbyById(params?.lobbyID as string)
		return { props: { name: name, players: players, player: null } }
	} else {
		return { props: { name: '', players: [], player: null } }
	}
}

export default LobbyPage
