import { useState, useEffect } from 'react'
import styles from './layout.module.scss'
import 'semantic-ui-css/semantic.min.css'
import { ILayout } from '../../interfaces/ILayout'
import Head from 'next/head'
import { HeaderBlock } from '../header/header'
import Footer from '../footer/footer'

export default function TransitionLayout({ children, title = 'Planning Poker' }: ILayout) {
	const [displayChildren, setDisplayChildren] = useState(children)
	const [transitionStage, setTransitionStage] = useState('fadeOut')
	const [theme, setTheme] = useState('light')

	const handleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
		localStorage.setItem('theme', theme)
	}

	useEffect(() => {
		const localTheme = localStorage.getItem('theme')
		if (typeof localTheme !== 'string') localStorage.setItem('theme', theme)
	})

	useEffect(() => {
		setTransitionStage('fadeIn')
	}, [])

	useEffect(() => {
		if (children !== displayChildren) setTransitionStage('fadeOut')
	}, [children, setDisplayChildren, displayChildren])

	return (
		<div className={theme}>
			<Head>
				<title>{title}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<HeaderBlock theme={theme} handleTheme={handleTheme} />
			<main
				onTransitionEnd={() => {
					if (transitionStage === 'fadeOut') {
						setDisplayChildren(children)
						setTransitionStage('fadeIn')
					}
				}}
				className={`${styles.content} ${styles[transitionStage]}`}
			>
				{displayChildren}
			</main>
			<Footer />
		</div>
	)
}
