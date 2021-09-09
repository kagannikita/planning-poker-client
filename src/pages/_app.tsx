import '../components/mainForm/mainForm.scss'
import '../components/ModalConnectToGame/ModalConnectToGame.scss'
import '../styles/style.scss'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import 'semantic-ui-css/semantic.min.css'
import TransitionLayout from '../components/layout/Layout'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	const router = useRouter()
	return (
		<TransitionLayout>
			<div style={{ position: 'relative' }}>
				{router.pathname !== '/404' ? <Component {...pageProps} /> : <Component {...pageProps} />}
			</div>
		</TransitionLayout>
	)
}

export default MyApp
