import TransitionLayout from '../components/layout/Layout'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import 'semantic-ui-css/semantic.min.css'
import '../styles/style.scss'
import '../styles/Chat.scss'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	const router = useRouter()
	return (
		<Provider store={store}>
			<main style={{ position: 'relative' }}>
				{router.pathname !== '/404' ? (
					<TransitionLayout>
						<Component {...pageProps} />
					</TransitionLayout>
				) : (
					<TransitionLayout>
						<Component {...pageProps} />
					</TransitionLayout>
				)}
			</main>
		</Provider>
	)
}

export default MyApp
