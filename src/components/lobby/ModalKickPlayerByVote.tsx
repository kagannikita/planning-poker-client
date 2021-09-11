import React, { FC, useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'

interface ModalKickPlayerByDealerProps {
	playerId: string
	kickerName: string
	kickedName: string
	kickMemberHandler: (playerId: string) => void
}

const ModalKickPlayerByDealer: FC<ModalKickPlayerByDealerProps> = ({
	kickMemberHandler,
	playerId,
	kickerName,
	kickedName,
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const handlerVote = () => {
		kickMemberHandler(playerId)
		setIsOpen(!isOpen)
	}
	return (
		<Modal size="tiny" open={isOpen} onClose={() => setIsOpen(!isOpen)}>
			<Modal.Header>Kick player?</Modal.Header>
			<Modal.Content>
				<p>
					{kickerName} want to kick member {kickedName}. Do you agree with it?{' '}
				</p>
			</Modal.Content>
			<Modal.Actions>
				<Button negative onClick={() => setIsOpen(!isOpen)}>
					No
				</Button>
				<Button positive onClick={handlerVote}>
					Yes
				</Button>
			</Modal.Actions>
		</Modal>
	)
}

export default ModalKickPlayerByDealer
