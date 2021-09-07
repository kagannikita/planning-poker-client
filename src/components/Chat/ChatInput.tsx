import { FC } from 'react'
import { Form, Button } from 'semantic-ui-react'
import s from './Chat.module.scss'

const ChatInput: FC = () => {
	return (
		<Form reply>
			<textarea className={s.textArea} name="message area" id="messageArea" cols={30} rows={10} />
			<Button content="Send" htmlFor="messageArea" labelPosition="left" icon="chat" primary />
		</Form>
	)
}

export default ChatInput
