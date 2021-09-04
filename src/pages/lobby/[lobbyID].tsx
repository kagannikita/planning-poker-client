import Head from 'next/head'
import React from 'react'
import { Container } from 'semantic-ui-react'
import DealerLayout from '../../components/lobby/DealerLayout/DealerLayout'

const LobbyPage = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>Lobby Page</title>
			</Head>
			<Container>
				<DealerLayout />
			</Container>
		</>
	)
}

export default LobbyPage
