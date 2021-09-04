import React from 'react'
import headerLogo from '../../../public/images/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import s from './header.module.scss'

export const HeaderBlock = () => {
	return (
		<header className={s.header}>
			<div className={s['header__first_row']}></div>
			<div className={s['header__second_row']}></div>
			<Link href="/">
				<a className={s['header__logo-link']}>
					<Image src={headerLogo} alt="Header logo" />
				</a>
			</Link>
		</header>
	)
}
