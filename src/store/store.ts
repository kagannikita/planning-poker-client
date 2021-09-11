import { initialState, playerSlice, PlayerState } from './playerData'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore, Store } from 'redux'
import { useMemo } from 'react'

let store: Store

// export const store = configureStore({
// 	reducer: {
// 		player: playerSlice.reducer
// 	},
// 	middleware: (getDefaultMiddleware) =>
// 		getDefaultMiddleware({
// 			thunk: true,
// 		}),
// 	devTools: process.env.NODE_ENV !== 'production',
// })
//
//
// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
// 	ReturnType,
// 	RootState,
// 	unknown,
// 	Action<string>
// 	>;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function initStore(preloadedState = initialState) {
	return createStore(playerSlice.reducer, preloadedState, composeWithDevTools(applyMiddleware()))
}

export const initializeStore = (preloadedState: PlayerState) => {
	const _store = store ?? initStore(preloadedState)

	// After navigating to a page with an initial Redux state, merge that state
	// with the current state in the store, and create a new store
	if (preloadedState && store) {
		const initialStore = {
			...preloadedState,
			...store.getState(),
		}
		initialStore.player.playerID = preloadedState.playerID
	}

	// For SSG and SSR always create a new store
	if (typeof window === 'undefined') return _store
	// Create the store once in the client
	if (!store) store = _store

	return _store
}

export function useStore(initialState: PlayerState) {
	return useMemo(() => initializeStore(initialState), [initialState])
}
