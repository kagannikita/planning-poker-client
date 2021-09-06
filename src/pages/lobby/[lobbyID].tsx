import Head from 'next/head'
import React from 'react'
import { Container } from 'semantic-ui-react'
import Chat from '../../components/Chat/Chat'
import DealerLayout from '../../components/Lobby/DealerLayout/DealerLayout'

const LobbyPage = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>Lobby Page</title>
			</Head>
			<Chat />
			<Container>
				<DealerLayout />
			</Container>
		</>
	)
}

export default LobbyPage
