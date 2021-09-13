import * as React from 'react'
import io from 'socket.io-client'
import { useLocation } from 'react-router-dom'
import { useRouter } from 'next/router'

type Props = {}

interface Message {
	name: string
	message: string
}

const Chat = (props: Props) => {
	const location = useRouter()
	const queryParams = React.useMemo(() => {
		return {
			room_id: location.query.room_id,
			name: location.query.name,
		}
	}, [location])
	const socket = React.useMemo<SocketIOClient.Socket>(() => io('http://localhost:8080'), [])
	const inputRef = React.useRef() as React.MutableRefObject<any>

	const [messages, setMessages] = React.useState<Message[]>([])

	React.useEffect(() => {
		socket.on('receive-message', (content: { message: string; name: string }) => {
			console.log(content)
			setMessages((prevState) => [...prevState, content])
		})

		socket.on('connect', () => {
			socket.emit('join', {
				name: queryParams.name,
				room_id: queryParams.room_id,
			})
		})
	}, [socket, queryParams])

	function sendMessage() {
		const message = inputRef.current.value
		socket.emit('send-message', { message })
		const name = queryParams.name as string
		console.log('Name', queryParams.name)
		const content = { message, name }
		setMessages((prevState) => [...prevState, content])
	}

	return (
		<div>
			<h1>Chat Fullcycle</h1>
			<ul>
				{messages.map((message, key) => (
					<li key={key}>
						{message.name} - {message.message}
					</li>
				))}
			</ul>
			<p>
				<label htmlFor="message">Message</label>
				<input type="text" id="message" ref={inputRef} />
				<button type="button" onClick={() => sendMessage()}>
					Enviar
				</button>
			</p>
		</div>
	)
}
Chat.getInitialProps = async () => {
	return {}
}
export default Chat
