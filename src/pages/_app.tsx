// import TransitionLayout from '../components/layout/Layout'
import '../styles/style.scss'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import 'semantic-ui-css/semantic.min.css'
import MainLayout from '../components/layout/MainLayout'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	const router = useRouter()
	return (
		<Provider store={store}>
			<MainLayout>
				<div style={{ position: 'relative' }}>
					{router.pathname !== '/404' ? <Component {...pageProps} /> : <Component {...pageProps} />}
				</div>
			</MainLayout>
		</Provider>
	)
}

export default MyApp
