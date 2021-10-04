import { Header, Comment, Form, Button } from 'semantic-ui-react'
import s from './Chat.module.scss'
import ChatMessage, { ChatMessageProps } from './ChatMessage'
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import io from 'socket.io-client'
import { API } from '../../interfaces/ApiEnum'
import { ILobby, IPlayer } from '../../interfaces/LobbyTypes'

interface ChatProps {
	messages: ChatMessageProps[]
	yourMember: string
	lobbyId: string
}
const Chat = ({ messages, yourMember, lobbyId }: ChatProps): JSX.Element => {
	const inputRef = useRef() as MutableRefObject<HTMLInputElement>
	const [message, setMessage] = useState<ChatMessageProps[]>([])
	const socket = useMemo(() => io(API.MAIN_API), [yourMember])
	useEffect(() => {
		socket.on('message:get', ({ message, members }: { message: string; members: IPlayer[] }) => {
			console.log('Data from get: ', message)
			setMessage((prevState) => [...prevState, { message, members }])
		})
	}, [socket, message])
	const sendMessage = () => {
		const message = inputRef.current.value
		socket.emit('chat:sendMsg', { message, yourMember, lobbyId })
	}
	return (
		<Comment.Group minimal className={s.chatBlock}>
			<Header as="h3" dividing>
				Chat
			</Header>
			<div className="chat">
				<div className="chat__content">
					{message.map((mess) => {
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
				<input type="text" className={s.textArea} ref={inputRef} name="messageArea" id="messageArea" />
				<Button content="Send" htmlFor="messageArea" labelPosition="left" icon="chat" primary onClick={sendMessage} />
			</Form>
		</Comment.Group>
	)
}

export default Chat
