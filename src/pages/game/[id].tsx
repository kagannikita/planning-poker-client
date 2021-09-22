import React, { FC, useEffect, useState } from 'react'
import { Container, Button, Grid, GridRow, Header as HeaderTitle } from 'semantic-ui-react'
import { IPlayer, Role } from '../../interfaces/LobbyTypes'
import DealerLayouGame from '../../components/Game/DealerPageName'
import MemberItem from 'src/components/Lobby/MemberItem'
import IssueContainer from 'src/components/Lobby/DealerLayout/IssueContainer'
import { useLobbyDataSocket } from 'src/hooks'
import { LocalStorageEnum } from 'src/interfaces/localStorageEnum'
import { useRouter } from 'next/router'
import { CurrentIssueContext } from 'src/context/CurrentIssueContext'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export interface CurrentIssue {
	id: string,
	name: string,
}


const GamePage = ({ ...props }: InferGetServerSidePropsType<typeof getServerSideProps>):JSX.Element => {
	const router = useRouter()
	const [playerId, setplayerId] = useState('');
	const [GameState, setGameState] = useState<'pause' | 'started'>('pause');
	useEffect(() => {
		const id = sessionStorage.getItem(LocalStorageEnum.playerid)
		if (!id) router.push('/404')
		setplayerId(id as string)
	}, [ playerId])
	
	const dataSocket = useLobbyDataSocket(props.lobbyId, playerId)
	
	const [CurrentIssue, setCurrentIssue] = useState<CurrentIssue>({
		id: dataSocket.lobbyData?.issues[0]?.id || '',
		name: dataSocket.lobbyData?.issues[0]?.name || ''
	});
	console.log('current issue', CurrentIssue);
	
	const startRoundHandler = () => {
		// send CurrentIssue
	}

	const nextRoundHandler = () => {
		// send 
	}

	return (
		<>
			<Container>
				<Grid columns="3">
					<Grid.Row>
						<HeaderTitle as="h1">Game Page</HeaderTitle>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<HeaderTitle as="h3">Scram master</HeaderTitle>
							{/* <MemberItem firstName="Max" lastName="Yazykov" role={Role.dealer} id="asd" /> */}
							{dataSocket.lobbyData?.players.map((dealer) => {
              if (dealer.role === Role.dealer) {
                return <MemberItem key={dealer.id} {...(dealer as IPlayer)} />
              }
              return
            })}
						</Grid.Column>
						<Grid.Column verticalAlign="bottom" width="10">
							<Button negative floated="right">
								Stop game
							</Button>
						</Grid.Column>
					</Grid.Row>
						<GridRow centered columns='3'>
						<Grid.Column >
							<Button color="blue" onClick={startRoundHandler}>Run Round</Button>
							<Button color="blue" onClick={nextRoundHandler}>Next Round</Button>
						</Grid.Column>
						</GridRow>
					<Grid columns="1">
						<Grid.Column width="14">
							<HeaderTitle as="h2">Issues:</HeaderTitle>

							<CurrentIssueContext.Provider value={{ CurrentIssue, setCurrentIssue}}>
								<IssueContainer type="game"
								issues={dataSocket.lobbyData?.issues}
								lobbyID={router.query.id as string}
								createIssue={dataSocket.createIssue}
								removeIssue={dataSocket.removeIssue}
								updateIssue={dataSocket.updateIssue}
								/>
							</CurrentIssueContext.Provider>
						</Grid.Column>
					</Grid>
				</Grid>
			</Container>
		</>
	)
}

interface GameSSRProps {
	lobbyId: string
}

export const getServerSideProps: GetServerSideProps<GameSSRProps> = async ({ query }) => {
	return {
		props: {
			lobbyId: query.id as string,
		},
	}
}

export default GamePage
