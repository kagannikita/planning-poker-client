import React from 'react'
import s from './header.module.scss'
import Logo from '../Logo/logo'

export const HeaderBlock = () => {
	return (
		<header className={s.header}>
			<h1 className={s.mainHeader}>Planning Poker</h1>
			<div className={s['header__first_row']} />
			<div className={s['header__logo-link']}>
				<Logo />
			</div>
		</header>
	)
}
