import React, { FC, useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { VoteType } from 'src/interfaces/VoteType'
import { IVoteKickState } from './MemberLayout/MemberLayout'

interface ModalKickPlayerByVoteProps {

	allMembers: number
	kickMemberStateHandler: React.Dispatch<React.SetStateAction<VoteType>>
	kickByVoteHandler: (voteToKickPlayerId: string, playerName: string) => void
	// setVoteState: React.Dispatch<React.SetStateAction<VoteType>>
	voteData: VoteType
}

const ModalKickPlayerByVote: FC<ModalKickPlayerByVoteProps> = ({
	kickMemberStateHandler,
	kickByVoteHandler,
	voteData,
	allMembers
}) => {

	const handlerVote = () => {
		console.log('handlerVote');
		
		kickByVoteHandler(voteData.playerId, voteData.playerName)
		closeHandler()
	}

	const closeHandler = () => {
		kickMemberStateHandler({
			...voteData,
			modalIsOpen: false
		})
	}

	return (
		<Modal size="tiny" open={voteData.modalIsOpen} onClose={closeHandler}>
			<Modal.Header>Vote kick player</Modal.Header>
			<Modal.Content>
				<p>
					Do you want to vote to kick member <b>{voteData.playerName}</b>.
				</p>
				<p>
					Votes: {voteData?.votesQuanity} / {allMembers}
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
