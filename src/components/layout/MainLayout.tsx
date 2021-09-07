import 'semantic-ui-css/semantic.min.css'
import { IMainLayout } from '../../interfaces/IMainLayout'
import Head from 'next/head'
import HeaderBlock from '../header/header'

const MainLayout = ({ children, title = 'Planning Poker' }: IMainLayout) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<HeaderBlock />
			<main>{children}</main>
		</>
	)
}

export default MainLayout
