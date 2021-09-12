import { initialState, playerSlice, PlayerState } from './playerData'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore, Store } from 'redux'
import { useMemo } from 'react'

let store: Store | undefined

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

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function initStore(preloadedState = initialState) {
	return createStore(playerSlice.reducer, preloadedState, composeWithDevTools(applyMiddleware()))
}

export const initializeStore = (preloadedState?: PlayerState) => {
	const _store = store ?? initStore(preloadedState)
	
	if (preloadedState && store) {
		const initialStore = {
			...preloadedState,
			...store.getState(),
		}
		initialStore.player.playerID = preloadedState.playerID
	}
	store = undefined
	
	if (typeof window === 'undefined') return _store
	if (!store) store = _store
	
	return _store
}

export function useStore(initialState?: PlayerState) {
	return useMemo(() => initializeStore(initialState), [initialState])
}

// export type RootState = ReturnType<typeof store.getState()>;
