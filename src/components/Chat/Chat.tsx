import { FC } from 'react'
import { Header, Comment } from 'semantic-ui-react'
import s from './Chat.module.scss'
import ChatInput from './ChatInput'
import ChatMessage, { ChatMessageProps } from './ChatMessage'

const Chat: FC = () => {
	const messages: ChatMessageProps[] = [
		{ author: 'Jessica', message: 'Hello World', isYou: false },
		{ author: 'Jimmy', message: 'Hello World', isYou: false },
		{ author: 'Brad', message: 'Hello World', isYou: true },
		{ author: 'Jessica', message: 'Hello World', isYou: false },
		{ author: 'Jessica', message: 'Hello World last', isYou: false },
	]

	return (
		<Comment.Group minimal className={s.chatBlock}>
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
