import React, { Dispatch, FC, SetStateAction } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { VoteType } from 'src/interfaces/VoteType'

import { IPlayer } from '../../interfaces/LobbyTypes'
import { ModalState } from './DealerLayout/DealerLayout'
import s from './lobby.module.scss'
import { IVoteKickState } from './MemberLayout/MemberLayout'

const PLAYERS_FOR_VOTE = 3

interface MemberItemProps extends IPlayer {
	playersQuanity?: number
	centered?: boolean
	btnDisabled?: boolean
	setKickPlayer?: Dispatch<SetStateAction<ModalState>>
	setVoteKickPlayer?: React.Dispatch<React.SetStateAction<VoteType>>
}

const MemberItem: FC<MemberItemProps> = ({
	btnDisabled,
	playersQuanity,
	firstName,
	lastName,
	id,
	image,
	position,
	centered,
	role,
	setKickPlayer,
	setVoteKickPlayer
}): JSX.Element => {
	return (
		<Card centered={centered} className={role !== 'dealer' ? s.item : ''}>
			<Card.Content >

				<Image
					floated="right"
					size="mini"
					circular
					src={image || `https://ui-avatars.com/api/?name=${firstName}+${lastName}`}
				/>

				<Card.Header>{`${firstName} ${lastName}`} </Card.Header>
				<Card.Meta>{position}</Card.Meta>
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
					{setVoteKickPlayer && playersQuanity && playersQuanity > PLAYERS_FOR_VOTE && (
							<Button
								icon="remove circle"
								role="button"
								floated="right"
								disabled={btnDisabled}
								negative
								compact
								onClick={() => setVoteKickPlayer({ 
									modalIsOpen: true, 
									playerName: `${firstName} ${lastName}`, 
									votesQuanity: 0,
									playerId: id
								})}
							/>
					)}
				</Card.Description>
			</Card.Content>

		</Card>
	)
}

export default MemberItem
