import React, { Dispatch, FC, SetStateAction } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

import { IPlayer } from '../../interfaces/LobbyTypes'
import { KickPlayer } from './DealerLayout/DealerLayout'
import s from './lobby.module.scss'

interface MemberItemProps extends IPlayer {
	centered?: boolean
	setKickPlayer?: Dispatch<SetStateAction<KickPlayer>>
	setVoteKickPlayer?: Dispatch<SetStateAction<KickPlayer>>
}

const MemberItem: FC<MemberItemProps> = ({
	firstName,
	lastName,
	id,
	image,
	position,
	centered,
	role,
	setKickPlayer,
}): JSX.Element => {

	return (
		<Card centered={centered} className={role !== 'dealer' ? s.item : ''}>
			<Card.Content>
				<Image
					floated="right"
					size="mini"
					src={image || 'https://react.semantic-ui.com/images/avatar/large/steve.jpg'}
				/>
				<Card.Header>{`${firstName} ${lastName}`}</Card.Header>
				<Card.Meta>{position}</Card.Meta>
				{setKickPlayer && (
					<Button
						icon="delete"
						size="tiny"
						circular
						role="delete player"
						onClick={() => setKickPlayer({ modalIsOpen: true, playerName: `${firstName} ${lastName}`, id })}
					/>
				)}
			</Card.Content>
		</Card>
	)
}

export default MemberItem
