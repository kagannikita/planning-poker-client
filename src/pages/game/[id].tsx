import React, { useEffect, useMemo, useState } from 'react'
import { Button, Container, Grid, GridRow, Header as HeaderTitle } from 'semantic-ui-react'
import { IPlayer, Role } from '../../interfaces/LobbyTypes'
import { useRouter } from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { LocalStorageEnum } from '../../interfaces/localStorageEnum'
import { useGameDataSocket, useLobbyDataSocket } from '../../hooks'
import IssueContainer from '../../components/Lobby/DealerLayout/IssueContainer'
import MemberItem from '../../components/Lobby/MemberItem'
import { API } from '../../interfaces/ApiEnum'
import { ModalState } from '../../components/Lobby/DealerLayout/DealerLayout'
import ModalKickPlayerByDealer from '../../components/Lobby/ModalKickPlayerByDealer'
import ModalKickPlayerByVote from '../../components/Lobby/ModalKickPlayerByVote'
import { GameState } from '../../interfaces/GameTypes'
import Timer from '../../components/Timer/Timer'
import io from 'socket.io-client'
import MemberGameStatus from '../../components/MemberGameStatus/MemberGameStatus'
import cls from './gamePage.module.scss'
import { VoteType } from '../../interfaces/VoteType'
import { checkVoted, getMembersVote } from '../../functions/checkVote'
import { getRoundResult } from '../../functions/getRoundResult'
import GameResultField from '../../components/GameResultField/GameResultField'
import ModalMessage from '../../components/ModalMessage/ModalMessage'
import { IssuesAPI } from '../../api/IssuesAPI'
import GameResultTableContainer from '../../components/GameResultTable/GameResultContainer'
import CardsField from '../../components/CardsField/CardsField'

export interface CurrentIssueType {
	id: string
	name: string
}

type voteKickSettingsType = React.Dispatch<React.SetStateAction<VoteType>> | undefined
type kickSettingsType = React.Dispatch<React.SetStateAction<ModalState>> | undefined

const GamePage = ({ ...props }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
	const router = useRouter()
	const [playerId, setplayerId] = useState('')
	const [BtnDisabled, setBtnDisabled] = useState(false)
	const [pickCard, setPickCard] = useState<boolean>(false)

	const [modalkickPlayer, setModalKickPlayer] = useState<ModalState>({
		modalIsOpen: false,
		name: '',
		id: '',
	})

	const [modalMessageState, setModalMessageState] = useState({
		modalIsOpen: false,
		message: 'Something wrong',
	})

	const socket = useMemo(() => io(API.MAIN_API), [playerId])

	const dataSocket = useLobbyDataSocket(socket, props.lobbyId, playerId)

	const CurrentIssueId = {
		id: dataSocket?.lobbyData?.issues.find((iss) => iss.score === '-')?.id || 'finished',
	}

	useEffect(() => {
		const id = sessionStorage.getItem(LocalStorageEnum.playerid)
		if (!id) router.push('/404')
		setplayerId(id as string)
	}, [playerId, router])

	const player = dataSocket.lobbyData?.players.find((player) => player.id === playerId) as IPlayer

	const {
		GameData,
		gameStatus,
		voteResults,
		emitPauseGame,
		emitStartGame,
		emitContinueGame,
		setGameData,
		emitResponseGameResults,
		setScore,
	} = useGameDataSocket(socket, props.lobbyId, dataSocket?.lobbyData?.settings?.timer, player?.role)

	if (GameData?.status !== GameState.roundFinished && dataSocket?.lobbyData?.settings?.timer && GameData.timer === 0)
		setGameData({ ...GameData, timer: dataSocket?.lobbyData?.settings?.timer })

	if (GameData?.status === GameState.gameFinished) {

		// setModalMessageState({
		// 	...modalMessageState
		// 	message: `Game finished`,
		// 	modalIsOpen: true,
		// })
	}

	const startRoundHandler = async () => {
		if (GameData.status === GameState.init || GameData.status === GameState.roundFinished) {
			pauseRoundHandler()
			emitStartGame(CurrentIssueId.id)
			setBtnDisabled(true)
		} else {
			emitContinueGame()
			setBtnDisabled(true)
		}
	}

	const pauseRoundHandler = () => {
		emitPauseGame()
		setBtnDisabled(false)
	}

	const nextRoundHandler = async () => {
		const resultsCard = getRoundResult(GameData, dataSocket)

		if (GameData.status === GameState.roundFinished && resultsCard.cards.length > 1) {
			return setModalMessageState({
				...modalMessageState,
				message: `You cannot continue until you reach 
				a unanimous decision. Repeat the round`,
				modalIsOpen: true,
			})
		}

		// send
		const issue = dataSocket?.lobbyData?.issues.find((iss, i, arr) => {
			if (iss.id === CurrentIssueId.id) {
				if (arr[i + 1]) {
					CurrentIssueId.id = arr[i + 1].id
					return iss
				} else {
					CurrentIssueId.id = 'finished'
					return iss
				}
			}

			return
		})

		if (issue) {
			await new IssuesAPI().update({ ...issue, score: `${resultsCard.cards[0].name}` })
			dataSocket.updateIssue({ ...issue, score: `${resultsCard.cards[0].name}` })
		}

		if (CurrentIssueId.id !== 'finished') {
			await startRoundHandler()
		} else {

			emitResponseGameResults()
		}
	}

	// func for dealer
	const closeGameHandler = () => dataSocket.redirectTo('', true, true)

	// func for player
	const exitGameHandler = () => dataSocket.redirectTo('', false, true)

	const arrayOfCards = dataSocket.lobbyData?.settings.cards.map((card) => {
		return {
			image: card.image,
			name: card.name,
			scoreTypeShort: dataSocket.lobbyData?.settings.score_type_short,
		}
	})

	const setSelectedCard = (cardName: string) => {
		setScore({ score: cardName, playerId: playerId })
	}

	if (gameStatus === GameState.started && !pickCard) {
		setPickCard(true)
	}

	const resultCards = Array.from(GameData?.playersScore).map((str) => {
		return {
			name: `${str}`,
			scoreTypeShort: dataSocket?.lobbyData?.settings.score_type_short,
			image: dataSocket?.lobbyData?.settings.cards[0].image,
		}
	})

	const getValue = (memberID: string): string => {
		const value = Array.from(GameData.playersScore).find((item) => item[0] === memberID)
		return value ? value[1] : ''
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
							{dataSocket.lobbyData?.players.map((member) => {
								if (member.role === Role.player) return
								if (member.role === Role.spectator) return
								return <MemberItem key={member.id} isYou={member.id === playerId} {...member} />
							})}
						</Grid.Column>
						<Grid.Column verticalAlign="bottom" width="10">
							{player?.role === Role.dealer ? (
								<Button negative floated="right" onClick={closeGameHandler}>
									Close game
								</Button>
							) : (
								<Button negative floated="right" onClick={exitGameHandler}>
									Exit game
								</Button>
							)}
						</Grid.Column>
					</Grid.Row>

					<GridRow centered>
						{player?.role === Role.dealer && (
							<>
								<Button
									color="blue"
									disabled={GameData?.status !== GameState.roundFinished && BtnDisabled}
									onClick={startRoundHandler}
								>
									Run Round
								</Button>
								<Button color="blue" disabled={!BtnDisabled} onClick={pauseRoundHandler}>
									Pause Round
								</Button>
							</>
						)}
						{player?.role === Role.dealer && (
							<Button color="blue" disabled={gameStatus !== GameState.roundFinished} onClick={nextRoundHandler}>
								Next Round
							</Button>
						)}
					</GridRow>
					<Grid columns="1">
						<Grid.Column>
							<IssueContainer
								type="game"
								playerRole={player?.role}
								issues={dataSocket?.lobbyData?.issues}
								lobbyID={router.query.id as string}
								createIssue={dataSocket.createIssue}
								removeIssue={dataSocket.removeIssue}
								updateIssue={dataSocket.updateIssue}
								CurrentIssueId={CurrentIssueId}
								createIssuesFromFile={function (): void {
									throw new Error('Function not implemented.')
								}}
							/>
						</Grid.Column>
					</Grid>
					<Grid columns="1">
						<Grid.Column>
							<Timer time={GameData?.timer} timerNeeded={dataSocket.lobbyData?.settings.timer_needed} />
							<GameResultTableContainer issues={dataSocket?.lobbyData?.issues} />
						</Grid.Column>
					</Grid>
					<Grid columns="1">
						<Grid.Column stretched>
							<HeaderTitle as="h2">Players:</HeaderTitle>
							{dataSocket.lobbyData?.players.map((member) => {
								let voteKickSettings: voteKickSettingsType = dataSocket.setVotesQuanity
								let kickSettings: kickSettingsType = setModalKickPlayer

								if (member.role === Role.dealer && !dataSocket?.lobbyData?.settings.is_dealer_play) return
								if (member.role === Role.spectator) return

								if (player?.role === Role.dealer) {
									voteKickSettings = undefined
								} else if (player?.role === Role.player) {
									kickSettings = undefined
								} else if (player?.role === Role.spectator) {
									voteKickSettings = undefined
									kickSettings = undefined
								}
								return (
									<div className={cls.playerCard} key={member.id}>
										<MemberGameStatus gameStatus={GameData.status} cardValue={getValue(member.id)} />
										<MemberItem
											{...member}
											isYou={member.id === playerId}
											votedQuantity={dataSocket.VotesQuanity.kickPlayer}
											playersQuanity={dataSocket.lobbyData?.players}
											checkVoted={checkVoted(member.id, playerId, dataSocket)}
											playersVoted={getMembersVote(member.id, dataSocket)}
											setVoteKickPlayer={voteKickSettings}
											setKickPlayer={kickSettings}
										/>
									</div>
								)
							})}
						</Grid.Column>
					</Grid>
					<GridRow centered id="resultField">
						{gameStatus === GameState.roundFinished ? (
							<GameResultField
								cards={getRoundResult(GameData, dataSocket).cards}
								values={getRoundResult(GameData, dataSocket).values}
							/>
						) : (
							<CardsField cardIsOpen={false} cards={resultCards} />
						)}
					</GridRow>
					{dataSocket.lobbyData?.settings.cards ? (
						(player?.role === Role.dealer && dataSocket?.lobbyData?.settings.is_dealer_play) ||
						player?.role === Role.player ? (
								<GridRow centered>
									<CardsField
										cards={arrayOfCards}
										pickCards={pickCard}
										setSelectedCard={setSelectedCard}
										gameData={GameData}
										voteAfterRoundEnd={dataSocket?.lobbyData?.settings.is_change_cards}
									/>
								</GridRow>
							) : null
					) : null}
				</Grid>
			</Container>
			<ModalMessage modalMessageState={modalMessageState} setModalMessageState={setModalMessageState} />
			{player?.role === Role.dealer && (
				<ModalKickPlayerByDealer
					isOpen={modalkickPlayer.modalIsOpen}
					setKickPlayer={setModalKickPlayer}
					kickMemberHandler={dataSocket.kickPlayer}
					playerId={modalkickPlayer.id}
					playerName={modalkickPlayer.name}
				/>
			)}
			{player?.role === Role.player && (
				<ModalKickPlayerByVote
					allMembers={dataSocket.lobbyData?.players.filter((player) => player.role === 'player').length}
					kickMemberStateHandler={dataSocket.setVotesQuanity}
					kickByVoteHandler={dataSocket.kickPlayerByVote}
					voteData={dataSocket.VotesQuanity}
				/>
			)}
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
