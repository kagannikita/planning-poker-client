import React, { useState } from 'react'
import { Comment } from 'semantic-ui-react'
import { IPlayer } from '../../interfaces/LobbyTypes'

export interface ChatMessageProps {
	id?: string
	members: IPlayer[]
	message: string
	yourMember?: string
}

const ChatMessage: ({ members, message, yourMember }: ChatMessageProps) => JSX.Element = ({
	members,
	message,
	yourMember,
}) => {
	const [isShown, setIsShown] = useState(false)
	console.log(members)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const showContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault()
		setIsShown(false)
		const newPosition = {
			x: event.pageX,
			y: event.pageY,
		}
		setPosition(newPosition)
		setIsShown(true)
	}
	const hideContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
		setIsShown(false)
	}

	const [selectedValue, setSelectedValue] = useState<string>()

	const editMessage = (selectedValue: string) => {
		alert(selectedValue)
	}
	const deleteMessage = (selectedValue: string) => {
		alert(selectedValue)
	}
	return (
		<>
			<Comment
				onContextMenu={showContextMenu}
				onClick={hideContextMenu}
				onMouseOver={hideContextMenu}
				secondary="true"
				tabIndex={0}
				className={yourMember === members[0].id ? 'yourMessage' : ''}
			>
				<Comment.Avatar
					src={
						members[0].image === null
							? `https://ui-avatars.com/api/?name=${members[0].firstName}+${members[0].lastName}`
							: members[0].image
					}
				/>
				<Comment.Content>
					<Comment.Author as="a">{members[0].firstName + ' ' + members[0].lastName}</Comment.Author>
					<Comment.Metadata />
					<Comment.Text>{message}</Comment.Text>
				</Comment.Content>
			</Comment>
			{isShown && (
				<div style={{ top: position.y, left: position.x }} className="custom-context-menu" role="menubar">
					{yourMember === members[0].id && (
						<div role="menuitem" tabIndex={-1} className="option" onClick={() => editMessage('Edit')}>
							Edit message
						</div>
					)}
					{(yourMember === members[0].id || members[0].role !== 'dealer') && (
						<div role="menuitem" tabIndex={0} className="option" onClick={() => deleteMessage('Delete')}>
							Delete message
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default ChatMessage
