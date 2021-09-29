import React, { useEffect, useMemo, useState } from 'react'
import { Container, Button, Grid, GridRow, Header as HeaderTitle } from 'semantic-ui-react'
import { IPlayer, Role } from '../../interfaces/LobbyTypes'
import { useRouter } from 'next/router'
import { CurrentIssueContext } from 'src/context/CurrentIssueContext'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { LocalStorageEnum } from '../../interfaces/localStorageEnum'
import { useGameDataSocket, useLobbyDataSocket } from '../../hooks'
import IssueContainer from '../../components/Lobby/DealerLayout/IssueContainer'
import MemberItem from 'src/components/Lobby/MemberItem'
import { API } from 'src/interfaces/ApiEnum'
import { ModalState } from 'src/components/Lobby/DealerLayout/DealerLayout'
import ModalKickPlayerByDealer from 'src/components/Lobby/ModalKickPlayerByDealer'
import ModalKickPlayerByVote from 'src/components/Lobby/ModalKickPlayerByVote'
import { GameState } from 'src/interfaces/GameTypes'
import Timer from 'src/components/Timer/Timer'
import io from 'socket.io-client'
import CardsField from 'src/components/CardsField/CardsField'

export interface CurrentIssue {
	id: string
	name: string
}


const GamePage = ({ ...props }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
	const router = useRouter()
	const [playerId, setplayerId] = useState('');
	const [BtnDisabled, setBtnDisabled] = useState(false);

	useEffect(() => {
		const id = sessionStorage.getItem(LocalStorageEnum.playerid)
		if (!id) router.push('/404')
		setplayerId(id as string)
	}, [playerId])

	const [modalkickPlayer, setModalKickPlayer] = useState<ModalState>({
		modalIsOpen: false,
		name: '',
		id: '',
	})


	const socket = useMemo(() => io(API.MAIN_API), [playerId])
	const dataSocket = useLobbyDataSocket(
		socket,
		props.lobbyId, playerId)

	const player = dataSocket.lobbyData?.players
		.find((player) => player.id === playerId) as IPlayer

	const { GameData, emitPauseGame, emitStartGame, setGameData } = useGameDataSocket(
		socket,
		props.lobbyId)

	const [CurrentIssue, setCurrentIssue] = useState<CurrentIssue>({
		id: dataSocket.lobbyData?.issues[0]?.id || '',
		name: dataSocket.lobbyData?.issues[0]?.name || ''
	});

	const getMembersVote = (id: string) => {
		if (dataSocket.VotesQuanity.kickPlayer.get(id)) {
			return dataSocket.VotesQuanity.kickPlayer.get(id)!.length
		}
		return 0
	}
	const checkVoted = (id: string) => {
		const votedPlayer = dataSocket.VotesQuanity.kickPlayer.get(id)
		if (votedPlayer) {
			const findPlayer = votedPlayer.find((player) => player === playerId)
			return !!findPlayer
		}
		return false
	}
	console.log(CurrentIssue)

	const startRoundHandler = () => {
		// send CurrentIssue
		setGameData({ ...GameData, currIssueId: CurrentIssue.id })

		emitStartGame()
		setBtnDisabled(!BtnDisabled)
		console.log('start round', GameData);
	}

	const pauseRoundHandler = () => {
		emitPauseGame()
		setBtnDisabled(!BtnDisabled)
	}


	const nextRoundHandler = () => {
		// send
	}

	// func for dealer
	const closeGameHandler = () =>
		dataSocket.redirectTo('', true, true)

	// func for player
	const exitGameHandler = () =>
		dataSocket.redirectTo('', false, true)

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
							{
								dataSocket.lobbyData?.players.map(member => {
									if (member.role === Role.player) return
									if (member.role === Role.spectator) return
									return <MemberItem
										key={member.id}
										isYou={member.id === playerId}
										{...member}
									/>
								})
							}
						</Grid.Column>
						<Grid.Column verticalAlign="bottom" width="10">
							{
								player?.role === Role.dealer ? (
									<Button negative floated="right" onClick={closeGameHandler}>
										Close game
									</Button>
								) : (
									<Button negative floated="right" onClick={exitGameHandler}>
										Exit game
									</Button>
								)
							}

						</Grid.Column>
					</Grid.Row>
					<GridRow centered >
						<Grid.Column>
							{
								(player?.role === Role.dealer) &&
								<>
									<Button
										color="blue"
										disabled={BtnDisabled}
										onClick={startRoundHandler}>
										Run Round
									</Button>
									<Button
										color="blue"
										disabled={!BtnDisabled}
										onClick={pauseRoundHandler}>
										Pause Round
									</Button>
								</>
							}
							{
								player?.role === Role.dealer && GameData.status === GameState.roundFinished &&
								<Button color="blue" onClick={nextRoundHandler}>
									Next Round
								</Button>
							}
						</Grid.Column>
					</GridRow>
					<Grid columns="1" >
						<Grid.Column >
							<CurrentIssueContext.Provider value={{ CurrentIssue, setCurrentIssue }}>
								<IssueContainer
									type="game"
									issues={dataSocket.lobbyData?.issues}
									lobbyID={router.query.id as string}
									createIssue={dataSocket.createIssue}
									removeIssue={dataSocket.removeIssue}
									updateIssue={dataSocket.updateIssue}
									createIssuesFromFile={function (): void {
										throw new Error('Function not implemented.')
									}} />
							</CurrentIssueContext.Provider>
						</Grid.Column>
					</Grid>
					<Grid columns="1">
						<Grid.Column >
							<Timer time={GameData.timer} />
						</Grid.Column>
					</Grid>
					<Grid columns="2">
						{/* <Grid.Column stretched > */}
						<HeaderTitle as="h2">Players:</HeaderTitle>
						{
							player?.role === Role.player && dataSocket.lobbyData?.players.map(member => {
								if (member.role === Role.dealer) return
								if (member.role === Role.spectator) return
								return <Grid.Column>
									<span>Score:</span>
									<MemberItem
										key={member.id}
										votedQuantity={dataSocket.VotesQuanity.kickPlayer}
										checkVoted={checkVoted(member.id)}
										playersVoted={getMembersVote(member.id)}
										playersQuanity={dataSocket.lobbyData?.players}
										setVoteKickPlayer={dataSocket.setVotesQuanity}
										isYou={member.id === playerId}
										{...member}
									/>
								</Grid.Column>
							})
						}
						{
							player?.role === Role.dealer && dataSocket.lobbyData?.players.map(member => {
								if (member.role === Role.dealer) return
								if (member.role === Role.spectator) return
								return <Grid.Column>
									<span>Score:</span>
									<MemberItem
										key={member.id}
										isYou={member.id === playerId}
										votedQuantity={dataSocket.VotesQuanity.kickPlayer}
										checkVoted={checkVoted(member.id)}
										playersVoted={getMembersVote(member.id)}
										playersQuanity={dataSocket.lobbyData?.players}
										setKickPlayer={setModalKickPlayer}
										{...member}
									/>
								</Grid.Column>
							})
						}
						{
							player?.role === Role.spectator && dataSocket.lobbyData?.players.map(member => {
								if (member.role === Role.dealer) return
								if (member.role === Role.spectator) return
								return <Grid.Column>
									<span>Score:</span>
									<MemberItem
										key={member.id}
										isYou={member.id === playerId}
										votedQuantity={dataSocket.VotesQuanity.kickPlayer}
										checkVoted={checkVoted(member.id)}
										playersVoted={getMembersVote(member.id)}
										playersQuanity={dataSocket.lobbyData?.players}
										{...member}
									/>
								</Grid.Column>
							})
						}
						{/* </Grid.Column> */}
					</Grid>
					<Grid.Column>
						{/* <CardsField cards={dataSocket?.lobbyData?.settings?.cards as any} /> */}
					</Grid.Column>
				</Grid>
			</Container>
			{
				player?.role === Role.dealer && <ModalKickPlayerByDealer
					isOpen={modalkickPlayer.modalIsOpen}
					setKickPlayer={setModalKickPlayer}
					kickMemberHandler={dataSocket.kickPlayer}
					playerId={modalkickPlayer.id}
					playerName={modalkickPlayer.name}
				/>
			}
			{
				player?.role === Role.player && <ModalKickPlayerByVote
					allMembers={dataSocket.lobbyData?.players.filter((player) => player.role === 'player').length}
					kickMemberStateHandler={dataSocket.setVotesQuanity}
					kickByVoteHandler={dataSocket.kickPlayerByVote}
					voteData={dataSocket.VotesQuanity}
				/>
			}
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
