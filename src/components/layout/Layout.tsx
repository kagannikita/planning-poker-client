import { useState, useEffect } from 'react'
import styles from './layout.module.scss'
import 'semantic-ui-css/semantic.min.css'
import { ILayout } from '../../interfaces/ILayout'
import Head from 'next/head'
import { HeaderBlock } from '../header/header'

export default function TransitionLayout({ children }: ILayout) {
	const [displayChildren, setDisplayChildren] = useState(children)
	const [transitionStage, setTransitionStage] = useState('fadeOut')

	useEffect(() => {
		setTransitionStage('fadeIn')
	}, [])

	useEffect(() => {
		if (children !== displayChildren) setTransitionStage('fadeOut')
	}, [children, setDisplayChildren, displayChildren])

	return (
		<div>
			<Head>
				<title>Plaining Poker</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<HeaderBlock />
			<div
				onTransitionEnd={() => {
					if (transitionStage === 'fadeOut') {
						setDisplayChildren(children)
						setTransitionStage('fadeIn')
					}
				}}
				className={`${styles.content} ${styles[transitionStage]}`}
			>
				{displayChildren}
			</div>
		</div>
	)
}
