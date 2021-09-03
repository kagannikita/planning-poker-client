import TransitionLayout from '../components/layout/Layout'
import '../style.scss'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { store } from '../store/store'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	const router = useRouter()
	return (
		<Provider store={store}>
			<div>
				{router.pathname !== '/404' ? (
					<TransitionLayout>
						<Component {...pageProps} />
					</TransitionLayout>
				) : (
					<Component {...pageProps} />
				)}
			</div>
		</Provider>
	)
}

export default MyApp
