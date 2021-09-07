import { FC, useState } from 'react'
import { Confirm } from 'semantic-ui-react'

interface ModalErrorProps {
	message: string
}

const ModalError: FC<ModalErrorProps> = ({ message }) => {
	const [isClosed, setClosedState] = useState<boolean>(true)
	return (
		<Confirm
			content={message}
			open={isClosed}
			onConfirm={() => setClosedState(!isClosed)}
			onCancel={() => setClosedState(!isClosed)}
		/>
	)
}

export default ModalError
