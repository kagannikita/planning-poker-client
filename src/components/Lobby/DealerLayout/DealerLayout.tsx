import React, {useState} from 'react'
import {Button, Container, Grid, Header as HeaderTitle} from 'semantic-ui-react'
import {IGameSettings, IPlayer, Role} from '../../../interfaces/LobbyTypes'
import MemberItem from '../MemberItem'
import s from '../lobby.module.scss'
import CopyLink from '../CopyLink'
import IssueContainer from './IssueContainer'
import ModalKickPlayerByDealer from '../ModalKickPlayerByDealer'
import {IUseLobbyDataSocket} from '../../../hooks/useLobbyDataSocket'
import GameSettings from '../../GameSettings/GameSettings'
import SettingsAPI from '../../../api/SettingsApi'
import {ISettings} from '../../../interfaces/SettingsTypes'

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


	const [settingsState, setsettingsState] = useState<IGameSettings>({...socketData.lobbyData.settings});

	const startGameHandler = async () => {
		// await new SettingsAPI().createSettings(socketData.lobbyData.id, )
		// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// TODO НА СТРОКЕ 117 я добавил функцию старт гейм, нужно либо эту удалить либо из 116 строки перенести данные сюда
	}

	const exitGameHandler = async () => {
		// router.push('/')
	}

	const [modalkickPlayer, setModalKickPlayer] = useState<ModalState>({
		modalIsOpen: false,
		name: '',
		id: '',
	})

	const [settings, setSettings] = useState<ISettings>({
		masterAsPlayer: true,
		changingCards: false,
		timerIsOn: true,
		scoreType: 'story point',
		scoreTypeShort: 'SP',
		minutes: '2',
		seconds: '30',
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

	const startGame = () => {
		api.createSettings(lobbyData.settings.id, gameSettings).then(() => {
			cardSettings().then((data) => {
				data.forEach((card) => {
					api.createCard(card)
				})
			})
		})
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
						<Button positive onClick={startGame}>
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
