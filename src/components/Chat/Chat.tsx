import { Header, Comment, Form, Button } from 'semantic-ui-react'
import s from './Chat.module.scss'
import ChatMessage, { ChatMessageProps } from './ChatMessage'
import { MutableRefObject, useRef, useState } from 'react'
import { IUseLobbyDataSocket } from '../../hooks/useLobbyDataSocket'
import { IPlayer } from '../../interfaces/LobbyTypes'

export interface IChat {
	id?: string
	lobbyId?: string
	members?: IPlayer[]
	message: string
}

interface ChatProps {
	messages: IChat[]
	yourMember: string
	myRole: string
	lobbyId: string
	socketData: IUseLobbyDataSocket
}
const Chat = ({ messages, yourMember, lobbyId, myRole, socketData }: ChatProps): JSX.Element => {
	const inputRef = useRef() as MutableRefObject<HTMLTextAreaElement>
	const [currMsg, setCurrMsg] = useState<string>('')
	console.log(messages)
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
								members={mess.members!}
								message={mess.message}
								yourMember={yourMember}
								myRole={myRole}
								putMessage={() => {
									inputRef.current.value = mess.message
									setCurrMsg(mess.id!)
								}}
								deleteMessage={() => {
									socketData.deleteMessage({ chatId: mess.id, lobbyId: lobbyId })
								}}
							/>
						)
					})}
				</div>
			</div>
			<Form reply>
				<textarea
					className={s.textArea}
					ref={inputRef}
					placeholder="Write message..."
					name="messageArea"
					id="messageArea"
				/>
				<Button
					content={currMsg === '' ? 'Send' : 'Update'}
					htmlFor="messageArea"
					labelPosition="left"
					icon="chat"
					primary
					onClick={() => {
						if (inputRef.current.value === '') return
						if (currMsg === '') {
							socketData.sendMessage({ message: inputRef.current.value, yourMember: yourMember, lobbyId: lobbyId })
						} else {
							socketData.putMessage({ message: inputRef.current.value, chatId: currMsg, lobbyId: lobbyId })
						}
						inputRef.current.value = ''
						setCurrMsg('')
					}}
				/>
			</Form>
		</Comment.Group>
	)
}

export default Chat
