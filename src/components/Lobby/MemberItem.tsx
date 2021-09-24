import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

import { IPlayer } from '../../interfaces/LobbyTypes'
import { ModalState } from './DealerLayout/DealerLayout'
import s from './lobby.module.scss'
import { IVoteKickState } from './MemberLayout/MemberLayout'
import { LocalStorageEnum } from '../../interfaces/localStorageEnum'
import { VoteType } from '../../interfaces/VoteType'

const PLAYERS_FOR_VOTE = 3

interface MemberItemProps extends IPlayer {
	playersQuanity?: IPlayer[]
	votedQuantity?: Map<string, string[]>
	isYou?: boolean
	checkVoted?: boolean
	playersVoted?: number
	centered?: boolean
	btnDisabled?: boolean
	setKickPlayer?: Dispatch<SetStateAction<ModalState>>
	setVoteKickPlayer?: React.Dispatch<React.SetStateAction<VoteType>>
}

const MemberItem: FC<MemberItemProps> = ({
	btnDisabled,
	votedQuantity,
	isYou,
	checkVoted,
	playersQuanity,
	playersVoted,
	firstName,
	lastName,
	id,
	image,
	position,
	centered,
	role,
	setKickPlayer,
	setVoteKickPlayer,
}): JSX.Element => {
	const members = playersQuanity?.filter((player) => player.role === 'player').length

	return (
		<Card centered={centered} className={role !== 'dealer' ? s.item : ''}>
			<Card.Content className={s.lobbyInfo__userInfo}>
				<Image
					floated="right"
					size="mini"
					circular
					src={image || `https://ui-avatars.com/api/?name=${firstName}+${lastName}`}
				/>

				<Card.Header>{`${firstName} ${lastName}`} </Card.Header>
				<Card.Meta>{position}</Card.Meta>
				<Card.Meta>{role}</Card.Meta>
				<Card.Description>
					{setKickPlayer && (
						<Button
							icon="delete"
							compact
							negative
							floated="right"
							role="button"
							onClick={() => setKickPlayer({ modalIsOpen: true, name: `${firstName} ${lastName}`, id })}
						/>
					)}
					{role !== 'spectator' && setVoteKickPlayer && members && members > PLAYERS_FOR_VOTE && (
						<Card.Meta>
							Votes: {playersVoted}/{members}{' '}
						</Card.Meta>
					)}
					{isYou ||
						checkVoted ||
						(role !== 'spectator' && setVoteKickPlayer && members && members > PLAYERS_FOR_VOTE && (
							<Button
								icon="remove circle"
								role="button"
								floated="right"
								disabled={btnDisabled}
								negative
								compact
								onClick={() =>
									setVoteKickPlayer({
										modalIsOpen: true,
										playerName: `${firstName} ${lastName}`,
										kickPlayer: votedQuantity!,
										playerId: id,
										currentPlayer: window.sessionStorage.getItem(LocalStorageEnum.playerid) as string,
									})
								}
							/>
						))}
				</Card.Description>
			</Card.Content>
		</Card>
	)
}

export default MemberItem
