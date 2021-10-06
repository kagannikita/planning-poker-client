import { useEffect, useRef, useState } from 'react'
import { Header as HeaderTitle } from 'semantic-ui-react'
import cls from './lobby.module.scss'

const CopyLink = (): JSX.Element => {
	const input = useRef<HTMLInputElement>(null)
	const [locationState, setlocation] = useState('')

	useEffect(() => {
		setlocation(location.origin + location.pathname)
	}, [])

	const clickCopy = (): void => {
		if (navigator.clipboard && input.current?.value) navigator.clipboard.writeText(input.current?.value)
	}

	return (
		<>
			<HeaderTitle as="h3">Lobby link:</HeaderTitle>
			<div className="ui action input">
				<input ref={input} type="text" placeholder="Lobby link" readOnly defaultValue={locationState} />
				<button onClick={clickCopy} className={'ui teal right labeled icon button ' + cls.copyBtn}>
					<i className="copy icon" />
					Copy
				</button>
			</div>
		</>
	)
}

export default CopyLink
