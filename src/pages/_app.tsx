// import TransitionLayout from '../components/layout/Layout'
import '../styles/style.scss'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { HeaderBlock } from '../components/header/header'
import 'semantic-ui-css/semantic.min.css'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	const router = useRouter()
	return (
		<Provider store={store}>
			<HeaderBlock />
			<div>
				{router.pathname !== '/404' ? (
					// <TransitionLayout>
					<Component {...pageProps} />
				) : (
					// </TransitionLayout>
					<Component {...pageProps} />
				)}
			</div>
		</Provider>
	)
}

export default MyApp
