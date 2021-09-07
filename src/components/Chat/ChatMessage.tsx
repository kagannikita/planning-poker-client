import { FC } from 'react'
import { Comment } from 'semantic-ui-react'

export interface ChatMessageProps {
	author: string
	date: string
	message: string
	image?: string
	isYou: boolean
}

const ChatMessage: FC<ChatMessageProps> = ({ author, message, date, isYou }) => {
	return (
		<Comment className={isYou ? 'yourMessage' : ''}>
			<Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
			<Comment.Content>
				<Comment.Author as="a">{author}</Comment.Author>
				<Comment.Metadata>
					<span>{date}</span>
				</Comment.Metadata>
				<Comment.Text>{message}</Comment.Text>
				<Comment.Actions>
					<a>Reply</a>
				</Comment.Actions>
			</Comment.Content>
		</Comment>
	)
}

export default ChatMessage
