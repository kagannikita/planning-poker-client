// import TransitionLayout from '../components/layout/Layout'
import '../styles/style.scss'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { HeaderBlock } from '../components/Header/header'
import 'semantic-ui-css/semantic.min.css'
import '../styles/Chat.scss'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	const router = useRouter()
	return (
		<Provider store={store}>
			<HeaderBlock />
			<main style={{ position: 'relative' }}>
				{router.pathname !== '/404' ? (
					// <TransitionLayout>
					<Component {...pageProps} />
				) : (
					// </TransitionLayout>
					<Component {...pageProps} />
				)}
			</main>
		</Provider>
	)
}

export default MyApp
