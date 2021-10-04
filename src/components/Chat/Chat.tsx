import { Header, Comment, Form, Button } from 'semantic-ui-react'
import s from './Chat.module.scss'
import ChatMessage, { ChatMessageProps } from './ChatMessage'
import { MutableRefObject, useRef, useState } from 'react'
import { IUseLobbyDataSocket } from '../../hooks/useLobbyDataSocket'

interface ChatProps {
	messages: ChatMessageProps[]
	yourMember: string
	lobbyId: string
	socketData: IUseLobbyDataSocket
}
const Chat = ({ messages, yourMember, lobbyId, socketData }: ChatProps): JSX.Element => {
	const inputRef = useRef() as MutableRefObject<HTMLTextAreaElement>
	return (
		<Comment.Group minimal className={s.chatBlock}>
			<Header as="h3" dividing>
				Chat
			</Header>
			<div className="chat">
				<div className="chat__content">
					{messages.map((mess) => {
						return (
							<ChatMessage
								key={mess.id}
								id={mess.id}
								members={mess.members}
								message={mess.message}
								yourMember={yourMember}
							/>
						)
					})}
				</div>
			</div>
			<Form reply>
				<textarea className={s.textArea} ref={inputRef} name="messageArea" id="messageArea" />
				<Button
					content="Send"
					htmlFor="messageArea"
					labelPosition="left"
					icon="chat"
					primary
					onClick={() => {
						socketData.sendMessage({ message: inputRef.current.value, yourMember, lobbyId })
						inputRef.current.value = ''
					}}
				/>
			</Form>
		</Comment.Group>
	)
}

export default Chat
