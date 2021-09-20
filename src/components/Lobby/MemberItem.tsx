import React, { Dispatch, FC, SetStateAction } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

import { IPlayer } from '../../interfaces/LobbyTypes'
import { ModalState } from './DealerLayout/DealerLayout'
import s from './lobby.module.scss'
import { IVoteKickState } from './MemberLayout/MemberLayout'

const PLAYERS_FOR_VOTE = 4

interface MemberItemProps extends IPlayer {
	playersQuanity?: number
	centered?: boolean
	setKickPlayer?: Dispatch<SetStateAction<ModalState>>
	setVoteKickPlayer?: Dispatch<React.SetStateAction<IVoteKickState>>
}

const MemberItem: FC<MemberItemProps> = ({
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
					src={image || `https://res.cloudinary.com/plaining-poker/image/upload/v1631009714/free-icon-avatar-close-up-15235_x5s1vy.svg`}
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
								negative
								compact
								onClick={() => setVoteKickPlayer({ modalIsOpen: true, kickedName: `${firstName} ${lastName}`, playerId: id })}
							/>
					)}
				</Card.Description>
			</Card.Content>

		</Card>
	)
}

export default MemberItem
