import { Header, Comment } from 'semantic-ui-react'
import s from './Chat.module.scss'
import ChatInput from './ChatInput'
import ChatMessage, { ChatMessageProps } from './ChatMessage'

interface ChatProps {
	messages: ChatMessageProps[]
	yourMember: string
}

const Chat = ({ messages, yourMember }: ChatProps): JSX.Element => {
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
			<ChatInput />
		</Comment.Group>
	)
}

export default Chat
