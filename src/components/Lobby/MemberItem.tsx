import React, { Dispatch, FC, SetStateAction } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

import { IPlayer } from '../../interfaces/LobbyTypes'
import { ModalState } from './DealerLayout/DealerLayout'
import s from './lobby.module.scss'

interface MemberItemProps extends IPlayer {
	centered?: boolean
	setKickPlayer?: Dispatch<SetStateAction<ModalState>>
	setVoteKickPlayer?: Dispatch<SetStateAction<ModalState>>
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
					src={image}
				/>
				<Card.Header>{`${firstName} ${lastName}`}</Card.Header>
				<Card.Meta>{position}</Card.Meta>
				{setKickPlayer && (
					<Button
						icon="delete"
						size="tiny"
						circular
						role="button"
						onClick={() => setKickPlayer({ modalIsOpen: true, name: `${firstName} ${lastName}`, id })}
					/>
				)}
			</Card.Content>
		</Card>
	)
}

export default MemberItem
