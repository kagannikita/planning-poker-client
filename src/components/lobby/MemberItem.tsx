import React, { FC } from 'react'
import { Card, Image } from 'semantic-ui-react'

import { IMember } from '../../interfaces/LobbyTypes'
import s from './lobby.module.scss'
interface MemberItemProps extends IMember {
	centered?: boolean
}

const MemberItem: FC<MemberItemProps> = ({ firstName, lastName, image, position, centered, role }): JSX.Element => {
	return (
		<Card centered={centered} className={role !== 'dealer' ? s.item : ''}>
			<Card.Content>
				<Image
					floated="right"
					size="mini"
					src={image || 'https://react.semantic-ui.com/images/avatar/large/steve.jpg'}
				/>
				<Card.Header>{`${firstName} ${lastName}`}</Card.Header>
				<Card.Meta>{position || 'Developer'}</Card.Meta>
			</Card.Content>
		</Card>
	)
}

export default MemberItem
