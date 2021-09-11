import '../components/mainForm/mainForm.scss'
import '../components/ModalConnectToGame/ModalConnectToGame.scss'
import '../styles/style.scss'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import 'semantic-ui-css/semantic.min.css'
import TransitionLayout from '../components/layout/Layout'
import { Provider } from 'react-redux'
import { useStore } from '../store/store'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	const router = useRouter()
	const store = useStore(pageProps.initialReduxState)
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

// interface AppSSRProps {
// 	initialReduxState: RootState
// }
//
// // export const getServerSideProps: GetServerSideProps<AppSSRProps> = async () => {
// // 	const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
// // 	const reduxStore = initialiseStore({})
// // 	// reduxStore.dispatch(setPlayerID(''))
//
//
// // 	return { props: { initialReduxState: reduxStore.getState() } }
// // }
// export const getServerSideProps = reduxWrapper.getServerSideProps(store =>{
// return	{props: store.getState() }
//
// }
// 	// ({ req, res, ...etc }) => {
// 	// 	console.log('2. Page.getServerSideProps uses the store to dispatch things');
// 	// 	store.dispatch({ type: 'TICK', payload: 'was set in other page' });
// 	// }
// );
//
// const makeStore = () => store;

export default MyApp
