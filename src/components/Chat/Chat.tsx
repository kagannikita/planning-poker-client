import { FC } from 'react'
import { Header, Comment } from 'semantic-ui-react'
import s from './Chat.module.scss'
import ChatInput from './ChatInput'
import ChatMessage, { ChatMessageProps } from './ChatMessage'

const Chat = () => {
	const messages: ChatMessageProps[] = [
		{ date: '03/09/21 14:00', author: 'Jessica', message: 'Hello World', isYou: false },
		{ date: '03/09/21 14:20', author: 'Jimmy', message: 'Hello World', isYou: false },
		{ date: '03/09/21 14:30', author: 'Brad', message: 'Hello World', isYou: true },
		{ date: '03/09/21 14:40', author: 'Jessica', message: 'Hello World', isYou: false },
		{ date: '03/09/21 14:40', author: 'Jessica', message: 'Hello World last', isYou: false },
	]

	// s.chatBlock

	return (
		<Comment.Group minimal >
			<Header as="h3" dividing>
				Chat
			</Header>
			<div className="chat">
				<div className="chat__content">
					{messages.map((mess, i) => (
						<ChatMessage key={i} {...mess} />
					))}
				</div>
			</div>
			<ChatInput />
		</Comment.Group>
	)
}

export default Chat
