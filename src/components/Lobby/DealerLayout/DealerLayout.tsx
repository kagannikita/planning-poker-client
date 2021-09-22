import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, Header as HeaderTitle } from 'semantic-ui-react'
import { IGameSettings, IPlayer, Role } from '../../../interfaces/LobbyTypes'
import { ISettings } from '../../../interfaces/SettingsTypes'
import MemberItem from '../MemberItem'
import s from '../lobby.module.scss'
import CopyLink from '../CopyLink'
import IssueContainer from './IssueContainer'
import ModalKickPlayerByDealer from '../ModalKickPlayerByDealer'
import { IUseLobbyDataSocket } from '../../../hooks/useLobbyDataSocket'
import GameSettings from '../../GameSettings/GameSettings'
import SettingsAPI from '../../../api/SettingsApi'
import router from 'next/router'
import { API } from '../../../interfaces/ApiEnum'
import ModalMessage from '../../ModalMessage/ModalMessage'
import { descOfCards } from '../../GameSettings/DeckOfCards'

interface DealerLayoutProps {
	dealerPlayer: IPlayer
	socketData: IUseLobbyDataSocket
}

export interface ModalState {
	modalIsOpen: boolean
	name: string
	id: string
}

const DealerLayout = ({ dealerPlayer, socketData }: DealerLayoutProps): JSX.Element => {
	const { createIssue, removeIssue, updateIssue, kickPlayer, lobbyData } = socketData

	const [settingsState, setsettingsState] = useState<IGameSettings>({ ...socketData.lobbyData.settings })

	const exitGameHandler = async () => {
		// router.push('/')
	}

	const [modalkickPlayer, setModalKickPlayer] = useState<ModalState>({
		modalIsOpen: false,
		name: '',
		id: '',
	})

	const [modalMessageState, setModalMessageState] = useState({
		modalIsOpen: false,
		message: 'Something wrong',
	})

	const [settings, setSettings] = useState<ISettings>({
		masterAsPlayer: true,
		changingCards: false,
		timerIsOn: true,
		scoreType: 'story point',
		scoreTypeShort: 'SP',
		minutes: '2',
		seconds: '30',
		deckOfCards: 'fibonacci',
	})

	const [defaultCover, setDefaultCover] = useState<string>(`https://
	res.cloudinary.com/plaining-poker/image/upload/v1631879184/dibpHF_vba7zs.jpg`)

	const [cards, setCards] = useState([
		{
			image: defaultCover,
			scoreTypeShort: 'default',
			name: 'unknown',
		},
		{
			image: defaultCover,
			scoreTypeShort: settings.scoreTypeShort,
			name: '1',
		},
		{
			image: defaultCover,
			scoreTypeShort: settings.scoreTypeShort,
			name: '2',
		},
	])

	const setDeckOfCards = () => {
		const card = (name: string) => {
			return {
				image: defaultCover,
				scoreTypeShort: settings.scoreTypeShort,
				name,
			}
		}
		if (settings.deckOfCards === 'fibonacci') setCards(descOfCards.fibonacci.map((name) => card(name)))
		if (settings.deckOfCards === 'planningPoker') setCards(descOfCards.planningPoker.map((name) => card(name)))
		if (settings.deckOfCards === 'custom') setCards(descOfCards.custom.map((name) => card(name)))
	}

	useEffect(() => {
		setDeckOfCards()
	}, [settings.deckOfCards])

	const gameTime = () => {
		let minutes = settings.minutes
		let seconds = settings.seconds
		if (settings.minutes.length === 1) minutes = `0${settings.minutes}`
		if (settings.seconds.length === 1) seconds = `0${settings.seconds}`
		return `1943-03-09T00:${minutes}:${seconds}Z`
	}

	const gameSettings = {
		is_dealer_play: settings.masterAsPlayer,
		is_change_cards: settings.changingCards,
		timer_needed: settings.timerIsOn,
		score_type: settings.scoreType,
		score_type_short: settings.scoreTypeShort,
		timer: gameTime(),
	}

	const getCoverFromUrl = (src: string) => {
		return fetch(src)
			.then((res) => res.arrayBuffer())
			.then((buf) => new File([buf], 'cover.png', { type: 'image/png' }))
	}

	const cardSettings = async () => {
		const fileCover = await getCoverFromUrl(cards[0].image)

		return cards.map((card) => {
			const cardFormData = new FormData()
			cardFormData.set('name', card.name)
			cardFormData.set('image', fileCover, 'cover.png')
			cardFormData.set('is_cover', 'true')
			cardFormData.set('settings', lobbyData.settings.id)
			return cardFormData
		})
	}

	const api = new SettingsAPI()

	const validateSettings = () => {
		let isValid = true
		if (cards.length < 1) {
			isValid = false
			setModalMessageState({
				...modalMessageState,
				message: 'Game cards can not be empty, add at least one card',
				modalIsOpen: true,
			})
		}
		if (!gameSettings.score_type_short) {
			isValid = false
			setModalMessageState({
				...modalMessageState,
				message: 'Score type (Short) can not be empty, fill in this field',
				modalIsOpen: true,
			})
		}
		return isValid
	}

	const startGameHandler = async () => {
		if (validateSettings()) {
			api.createSettings(lobbyData.settings.id, gameSettings).then((data) => {
				console.log(data)
				cardSettings().then((data) => {
					data.forEach((card) => {
						api.createCard(card).then((data) => console.log(data))
					})
				})
			})
			// await new SettingsAPI().createSettings(socketData.lobbyData.id, )
			// router.push({ hostname: API.GAME, pathname: socketData.lobbyData.id })
		}
	}

	return (
		<>
			<HeaderTitle as="h1" className={s.title}>
				{lobbyData?.name}
			</HeaderTitle>
			<Grid columns="1">
				<Grid.Row color="blue">
					<Grid.Column>
						<HeaderTitle as="h3">Scram master</HeaderTitle>
						<MemberItem {...(dealerPlayer as IPlayer)} />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<CopyLink />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row columns="2">
					<Grid.Column floated="left">
						<Button positive onClick={startGameHandler}>
							Start Game
						</Button>
					</Grid.Column>
					<Grid.Column floated="right">
						<Button negative floated="right" onClick={exitGameHandler}>
							Cancel Game
						</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			<HeaderTitle as="h1" textAlign="center">
				Members:
			</HeaderTitle>
			<Container className={s.itemsContainer}>
				{lobbyData?.players.map((member) => {
					if (member.role === Role.dealer) {
						return
					}
					return <MemberItem centered key={member.id} setKickPlayer={setModalKickPlayer} {...(member as IPlayer)} />
				})}
			</Container>
			<IssueContainer
				type="lobby"
				lobbyID={socketData.lobbyData?.id as string}
				issues={lobbyData?.issues}
				createIssue={createIssue}
				removeIssue={removeIssue}
				updateIssue={updateIssue}
			/>
			<ModalMessage modalMessageState={modalMessageState} setModalMessageState={setModalMessageState} />
			<ModalKickPlayerByDealer
				isOpen={modalkickPlayer.modalIsOpen}
				setKickPlayer={setModalKickPlayer}
				kickMemberHandler={kickPlayer}
				playerId={modalkickPlayer.id}
				playerName={modalkickPlayer.name}
			/>
			<Container>
				<GameSettings
					lobbySettingsId={lobbyData.settings.id}
					settings={settings}
					setSettings={setSettings}
					cards={cards}
					setCards={setCards}
					defaultCover={defaultCover}
					setDefaultCover={setDefaultCover}
				/>
			</Container>
		</>
	)
}

export default DealerLayout
