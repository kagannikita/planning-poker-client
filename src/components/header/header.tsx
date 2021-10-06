import React from 'react'
import s from './header.module.scss'
import Logo from '../Logo/logo'
import ModalAbout from '../ModalAbout/ModalAbout'
import { Form } from 'semantic-ui-react'

export type TAboutModalState = {
	dimmer: 'blurring' | undefined
	isOpen: boolean
}

type HeaderBlockType = {
	handleTheme: () => void
	theme: string
}

export const HeaderBlock = ({ handleTheme, theme }: HeaderBlockType) => {
	const [aboutModalState, setAboutModalState] = React.useState<TAboutModalState>({
		dimmer: undefined,
		isOpen: false,
	})

	return (
		<header className={s.header}>
			<h1 className={s.mainHeader}>Planning Poker</h1>
			<div className={s['header__first_row']}>
				<nav>
					<ul className={s.navList}>
						<li>
							<button className={s.headerBtn} onClick={() => setAboutModalState({ isOpen: true, dimmer: undefined })}>
								About
							</button>
						</li>
					</ul>
				</nav>
				<Form.Radio type="checkbox" name="role" toggle label="" checked={theme === 'light'} onChange={handleTheme} />
			</div>
			<div className={s['header__logo-link']}>
				<Logo />
			</div>
			<ModalAbout aboutModalState={aboutModalState} setAboutModalState={setAboutModalState} />
		</header>
	)
}
