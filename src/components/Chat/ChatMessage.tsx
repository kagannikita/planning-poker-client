import React, { FC, useRef, useState } from 'react'
import { Comment, Menu, Popup } from 'semantic-ui-react'

export interface ChatMessageProps {
	author: string
	message: string
	image?: string
	isYou: boolean
}

const ChatMessage: ({ author, message, isYou }: ChatMessageProps) => JSX.Element = ({ author, message, isYou }) => {
	const [isShown, setIsShown] = useState(false)
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
	const doSomething = (selectedValue: string) => {
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
				className={isYou ? 'yourMessage' : ''}
			>
				<Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
				<Comment.Content>
					<Comment.Author as="a">{author}</Comment.Author>
					<Comment.Metadata></Comment.Metadata>
					<Comment.Text>{message}</Comment.Text>
				</Comment.Content>
			</Comment>
			{isShown && (
				<div style={{ top: position.y, left: position.x }} className="custom-context-menu" role="menubar">
					<div role="menuitem" tabIndex={-1} className="option" onClick={() => doSomething('Option 1')}>
						Option #1
					</div>
					<div role="menuitem" tabIndex={0} className="option" onClick={() => doSomething('Option 2')}>
						Option #2
					</div>
					<div role="menuitem" tabIndex={-2} className="option" onClick={() => doSomething('Option 3')}>
						Option #3
					</div>
				</div>
			)}
		</>
	)
}

export default ChatMessage
