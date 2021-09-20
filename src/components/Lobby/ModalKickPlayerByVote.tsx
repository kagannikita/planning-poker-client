import React, { FC, useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { IVoteKickState } from './MemberLayout/MemberLayout'

interface ModalKickPlayerByVoteProps {
	modalIsOpen: boolean
	playerId: string
	// kickerName: string
	kickedName: string
	votes: number
	allMembers: number
	kickMemberStateHandler: React.Dispatch<React.SetStateAction<IVoteKickState>>
	kickByVoteHandler: (voteToKickPlayerId: string) => void
}

const ModalKickPlayerByVote: FC<ModalKickPlayerByVoteProps> = ({
	kickMemberStateHandler,
	kickByVoteHandler,
	modalIsOpen,
	playerId,
	// kickerName,
	kickedName,
	votes,
	allMembers
}) => {

	const handlerVote = () => {
		kickByVoteHandler(playerId)
		closeHandler()
	}

	const closeHandler = () => {
		kickMemberStateHandler({
			modalIsOpen: false,
			kickedName: '',
			playerId: '',
			kickerName: ''
		})
	}

	return (
		<Modal size="tiny" open={modalIsOpen} onClose={closeHandler}>
			<Modal.Header>Kick player?</Modal.Header>
			<Modal.Content>
				<p>
					Do you want to vote to kick member {kickedName}.{' '}
				</p>
				<p>
					Votes: {votes} / {allMembers}
				</p>
			</Modal.Content>
			<Modal.Actions>
				<Button negative onClick={closeHandler}>
					No
				</Button>
				<Button positive onClick={handlerVote}>
					Yes
				</Button>
			</Modal.Actions>
		</Modal>
	)
}

export default ModalKickPlayerByVote
