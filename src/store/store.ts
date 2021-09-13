import { playerSlice, PlayerState } from './playerData'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import { useMemo } from 'react'
import { issuesSlice, IssuesState } from './IssuesSlice'

export interface RootState {
	issues: IssuesState
	player: PlayerState
}

const initialState: RootState = {
	issues: {
		issues: [],
	},
	player: {
		playerID: '',
	},
}

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
	const rootReducer = combineReducers({
		player: playerSlice.reducer,
		issues: issuesSlice.reducer,
	})
	return createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware()))
}

export const initializeStore = (preloadedState?: RootState) => {
	let _store = store ?? initStore(preloadedState)

	if (preloadedState && store) {
		_store = initStore({
			...store.getState(),
			...preloadedState,
		})
	}
	store = undefined

	if (typeof window === 'undefined') return _store
	store = _store

	return _store
}

export function useStore(initialState?: RootState) {
	return useMemo(() => initializeStore(initialState), [initialState])
}
