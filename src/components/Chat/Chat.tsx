import { Header, Comment } from 'semantic-ui-react'
import { Role } from 'src/interfaces/LobbyTypes'
import s from './Chat.module.scss'
import ChatInput from './ChatInput'
import ChatMessage, { ChatMessageProps } from './ChatMessage'

interface ChatProps {
	messages: ChatMessageProps[]
	yourMember: string
}


const Chat = ({ messages, yourMember }: ChatProps): JSX.Element => {
	const msgs: ChatMessageProps[] = [
		{
			id: 'asd',
			members: [{
				id: '123123',
				firstName: 'alex',
				role: Role.player,
				lastName: 'asdasd',
				image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwS70r6aZEg6-wofSf66x7MU7FiZSEFSOIQA&usqp=CAU'
			}],
			message: 'sadasd',
			yourMember: 'a'
		},
		{
			id: yourMember,
			members: [{
				id: yourMember,
				firstName: 'max',
				role: Role.dealer,
				lastName: 'aasd',
				image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwS70r6aZEg6-wofSf66x7MU7FiZSEFSOIQA&usqp=CAU'
			}],
			message: 'hello world',
			yourMember: yourMember,
		},
		{
			id: 'asd',
			members: [{
				id: '123123',
				firstName: 'alex',
				role: Role.player,
				lastName: 'asdasd',
				image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwS70r6aZEg6-wofSf66x7MU7FiZSEFSOIQA&usqp=CAU'
			}],
			message: 'sadasd',
			yourMember: 'a'
		},
		{
			id: yourMember,
			members: [{
				id: yourMember,
				firstName: 'max',
				role: Role.dealer,
				lastName: 'aasd',
				image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwS70r6aZEg6-wofSf66x7MU7FiZSEFSOIQA&usqp=CAU'
			}],
			message: 'hello world',
			yourMember: yourMember,
		},
		{
			id: 'asd',
			members: [{
				id: '123123',
				firstName: 'alex',
				role: Role.player,
				lastName: 'asdasd',
				image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwS70r6aZEg6-wofSf66x7MU7FiZSEFSOIQA&usqp=CAU'
			}],
			message: 'sadasd',
			yourMember: 'a'
		},
		{
			id: yourMember,
			members: [{
				id: yourMember,
				firstName: 'max',
				role: Role.dealer,
				lastName: 'aasd',
				image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwS70r6aZEg6-wofSf66x7MU7FiZSEFSOIQA&usqp=CAU'
			}],
			message: 'hello world',
			yourMember: yourMember,
		},
		{
			id: 'asd',
			members: [{
				id: '123123',
				firstName: 'alex',
				role: Role.player,
				lastName: 'asdasd',
				image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwS70r6aZEg6-wofSf66x7MU7FiZSEFSOIQA&usqp=CAU'
			}],
			message: 'sadasd',
			yourMember: 'a'
		},
		{
			id: yourMember,
			members: [{
				id: yourMember,
				firstName: 'max',
				role: Role.dealer,
				lastName: 'aasd',
				image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwS70r6aZEg6-wofSf66x7MU7FiZSEFSOIQA&usqp=CAU'
			}],
			message: 'hello world',
			yourMember: yourMember,
		},
		{
			id: 'asd',
			members: [{
				id: '123123',
				firstName: 'alex',
				role: Role.player,
				lastName: 'asdasd',
				image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwS70r6aZEg6-wofSf66x7MU7FiZSEFSOIQA&usqp=CAU'
			}],
			message: 'sadasd',
			yourMember: 'a'
		},
		{
			id: yourMember,
			members: [{
				id: yourMember,
				firstName: 'maaaaaaaax',
				role: Role.dealer,
				lastName: 'aasd',
				image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwS70r6aZEg6-wofSf66x7MU7FiZSEFSOIQA&usqp=CAU'
			}],
			message: 'hello wasddddddddddddddddddddddddorld',
			yourMember: yourMember,
		},
	]

	return (
		<Comment.Group minimal className={s.chatBlock}>
			<Header as="h3" dividing>
				Chat
			</Header>
			<div className="chat">
				<div className="ui chat__content">
					{msgs.map((mess) => {
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
