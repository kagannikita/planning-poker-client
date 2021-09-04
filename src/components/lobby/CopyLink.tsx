import { NextRouter } from 'next/router'
import { FC, useRef } from 'react'
import { Header as HeaderTitle } from 'semantic-ui-react'

interface CopyLinkProps {
	router: NextRouter
}

const CopyLink: FC<CopyLinkProps> = ({ router }): JSX.Element => {
	const input = useRef<HTMLInputElement>(null)

	const clickCopy = (): void => {
		if (navigator.clipboard && input.current?.value) navigator.clipboard.writeText(input.current?.value)
	}

	return (
		<>
			<HeaderTitle as="h3">Lobby link:</HeaderTitle>
			<div className="ui action input">
				<input ref={input} type="text" readOnly defaultValue={router.asPath} />
				<button onClick={clickCopy} className="ui teal right labeled icon button">
					<i className="copy icon"></i>
					Copy
				</button>
			</div>
		</>
	)
}

export default CopyLink
