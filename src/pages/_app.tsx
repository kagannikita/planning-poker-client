import '../components/mainForm/mainForm.scss'
import '../components/ModalConnectToGame/ModalConnectToGame.scss'
import '../components/loader/loader.scss'
import '../styles/style.scss'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import 'semantic-ui-css/semantic.min.css'
import TransitionLayout from '../components/layout/Layout'
import { Provider } from 'react-redux'
import { useStore } from '../store/store'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	const router = useRouter()
	const store = useStore()

	return (
		<Provider store={store}>
			<TransitionLayout>
				<div style={{ position: 'relative' }}>
					{router.pathname !== '/404' ? <Component {...pageProps} /> : <Component {...pageProps} />}
				</div>
			</TransitionLayout>
		</Provider>
	)
}

export default MyApp
