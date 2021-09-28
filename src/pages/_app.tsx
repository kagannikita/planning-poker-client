import '../components/mainForm/mainForm.scss'
import '../components/ModalConnectToGame/ModalConnectToGame.scss'
import '../components/loader/loader.scss'
import '../styles/style.scss'
import { AppProps } from 'next/app'
import 'semantic-ui-css/semantic.min.css'
import TransitionLayout from '../components/layout/Layout'
import { Provider } from 'react-redux'
import { useStore } from '../store/store'
import SocketContext, { socket } from '../context/SocketContext'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	const store = useStore()

	return (
		<Provider store={store}>
			<SocketContext.Provider value={socket} >
			<TransitionLayout>
				{/* <div style={{ position: 'relative' }}> */}
				<Component {...pageProps} />
				{/* </div> */}
			</TransitionLayout>
				</SocketContext.Provider>
		</Provider>
	)
}

export default MyApp
