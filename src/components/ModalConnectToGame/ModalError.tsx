import { FC } from 'react'
import { Confirm } from 'semantic-ui-react'
import { ErrorModalState } from '../../pages'

interface ModalErrorProps extends ErrorModalState {
	setErrorModalState: React.Dispatch<React.SetStateAction<ErrorModalState>>
}

const ModalError: FC<ModalErrorProps> = ({ message, isError, setErrorModalState }) => {
	return (
		<Confirm
			size="tiny"
			content={message}
			open={isError}
			onConfirm={() => setErrorModalState({ message, isError: !isError })}
			onCancel={() => setErrorModalState({ message, isError: !isError })}
		/>
	)
}

export default ModalError
