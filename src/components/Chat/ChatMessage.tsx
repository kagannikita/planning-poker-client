import React, { useState } from 'react'
import { Comment } from 'semantic-ui-react'
import { IPlayer, Role } from '../../interfaces/LobbyTypes'

export interface ChatMessageProps {
	id?: string
	members: IPlayer[]
	message: string
	yourMember?: string
	myRole?: string
	putMessage: () => void
	deleteMessage: () => void
}

const ChatMessage: ({
	members,
	message,
	yourMember,
	putMessage,
	deleteMessage,
	myRole,
}: ChatMessageProps) => JSX.Element = ({ members, message, yourMember, myRole, putMessage, deleteMessage }) => {
	return (
		<>
			<Comment className={yourMember === members[0].id ? 'yourMessage' : ''}>
				<Comment.Avatar
					src={
						members[0].image === null
							? `https://ui-avatars.com/api/?name=${members[0].firstName}+${members[0].lastName}`
							: members[0].image
					}
				/>
				<Comment.Content>
					<Comment.Author as="a">{members[0].firstName + ' ' + members[0].lastName}</Comment.Author>
					<Comment.Text>{message}</Comment.Text>
					<Comment.Actions className={yourMember === members[0].id ? 'yourMessage' : ''}>
						{yourMember === members[0].id ? <Comment.Action onClick={putMessage}>Edit</Comment.Action> : ''}
						{myRole === Role.dealer || yourMember === members[0].id ? (
							<Comment.Action onClick={deleteMessage}>Delete</Comment.Action>
						) : (
							''
						)}
					</Comment.Actions>
				</Comment.Content>
			</Comment>
		</>
	)
}

export default ChatMessage
