import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, Header as HeaderTitle } from 'semantic-ui-react'
import { IPlayer, Role } from '../../../interfaces/LobbyTypes'
import { ISettings } from '../../../interfaces/SettingsTypes'
import MemberItem from '../MemberItem'
import s from '../lobby.module.scss'
import CopyLink from '../CopyLink'
import IssueContainer from './IssueContainer'
import ModalKickPlayerByDealer from '../ModalKickPlayerByDealer'
import { IUseLobbyDataSocket } from '../../../hooks/useLobbyDataSocket'
import GameSettings from '../../GameSettings/GameSettings'
import SettingsAPI from '../../../api/SettingsApi'
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
	const { createIssue, removeIssue, updateIssue, kickPlayer, lobbyData, createIssuesFromFile, redirectTo } = socketData

	const [gameLoading, setGameLoading] = useState(false);

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
		time: 150,
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

	const gameSettings = {
		is_dealer_play: settings.masterAsPlayer,
		is_change_cards: settings.changingCards,
		timer_needed: settings.timerIsOn,
		score_type: settings.scoreType,
		score_type_short: settings.scoreTypeShort,
		timer: settings.time,
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
			// cardFormData.set('image', fileCover, 'cover.png')
			cardFormData.set(
				'image',
				'http://res.cloudinary.com/plaining-poker/image/upload/v1632916481/wve1jvulhqqiooln4juc.jpg',
			)
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
		if (lobbyData.issues.length < 1) {
			isValid = false
			setModalMessageState({
				...modalMessageState,
				message: 'Issues can not be empty, add at least one issue',
				modalIsOpen: true,
			})
		}
		return isValid
	}

	const exitGameHandler = async () => {
		redirectTo('', true, true)
	}

	// const startGameHandler = async () => {
	// 	if (validateSettings()) {
	// 		await api.createSettings(lobbyData.settings.id, gameSettings)
	// 		const data = await cardSettings()
	// 		console.log( 'cards data', data);

	// 		data.forEach(async (formdata) => {
	// 			await api.createCard(formdata)
	// 		})
	// 		// redirectTo(API.GAME, true, false)
	// 	} else {
	// 		return
	// 	}
	// }

	const startGameHandler = async () => {
		if (validateSettings()) {
			setGameLoading(!gameLoading)
			await api.createSettings(lobbyData.settings.id, gameSettings)
			const data = await cardSettings()
			for (const card of data) {
				await api.createCard(card)
			}
			redirectTo(API.GAME, true, false)
		} else {
			return
		}
	}

	return (
		<>
			<HeaderTitle as="h2" className={s.title + ' heading'}>
				{lobbyData?.name}
			</HeaderTitle>
			<Grid columns="1">
				<Grid.Row className={s.lobbyInfo}>
					<Grid.Column>
						<HeaderTitle as="h3" className={'heading'}>
							Scram master
						</HeaderTitle>
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
						<Button positive 
							loading={gameLoading}
							disabled={gameLoading}
							onClick={startGameHandler} className={s.startBtn}>
							Start Game
						</Button>
					</Grid.Column>
					<Grid.Column floated="right">
						<Button negative floated="right" onClick={exitGameHandler} className={s.cancelBtn}>
							Cancel Game
						</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			<HeaderTitle as="h2" className="heading" textAlign="center">
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
				createIssuesFromFile={createIssuesFromFile}
			/>
			<ModalMessage modalMessageState={modalMessageState} setModalMessageState={setModalMessageState} />
			<ModalKickPlayerByDealer
				isOpen={modalkickPlayer.modalIsOpen}
				setKickPlayer={setModalKickPlayer}
				kickMemberHandler={kickPlayer}
				playerId={modalkickPlayer.id}
				playerName={modalkickPlayer.name}
			/>
			<HeaderTitle as="h2" className={s.title + ' heading'} textAlign="center">
				Game Settings:
			</HeaderTitle>
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
