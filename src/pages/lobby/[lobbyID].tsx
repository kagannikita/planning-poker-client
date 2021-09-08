import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import React from 'react'
import { Container } from 'semantic-ui-react'
import { Apis } from '../../api/api'
import MemberLayout from '../../components/Lobby/MemberLayout/MemberLayout'
import { IPlayer } from '../../interfaces/LobbyTypes'
import Chat from '../../components/Chat/Chat'
import DealerLayout from '../../components/Lobby/DealerLayout/DealerLayout'

const LobbyPage = ({player, ...props}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {

	return (
		<>
			<Head>
				<title>Lobby Page</title>
			</Head>
			<Chat />
			<Container>
				{player?.role === "dealer" ? <DealerLayout {...props} /> : <MemberLayout {...props} />}
			</Container>
		</>
	)
}

interface LobbySSRProps {
	name: string,
	players: IPlayer[],
	player?: IPlayer,
}
export const getServerSideProps: GetServerSideProps<LobbySSRProps> = async ({params, query}) => {
	if (!params) return { props:{name: '', players: []}}
	const player = await new Apis().getPlayerById(query.playerid as string)
	const {name, players} = await new Apis().getLobbyById(params.lobbyID as string)

	return { props: { name: name, players: players, player: player } }
}


export default LobbyPage
