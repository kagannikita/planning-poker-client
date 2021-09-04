import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './layout.module.scss'
import 'semantic-ui-css/semantic.min.css'
import { ILayout } from '../../interfaces/ILayout'
import { Header } from 'semantic-ui-react'
import { LinkStyled, ImageStyled } from './styled'
import img from '../../../public/icons/rainbow.svg'
import Head from 'next/head'

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
			<Header>
				<ImageStyled src={img.src} alt="image" />
				<Link passHref href="/home">
					<LinkStyled>Home</LinkStyled>
				</Link>
				<Link passHref href="/posts">
					<LinkStyled>Posts</LinkStyled>
				</Link>
			</Header>
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
