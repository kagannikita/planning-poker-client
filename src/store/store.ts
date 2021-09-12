import { initialState, playerSlice, PlayerState } from './playerData'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore, Store } from 'redux'
import { useMemo } from 'react'

let store: Store

function initStore(preloadedState = initialState) {
	return createStore(playerSlice.reducer, preloadedState, composeWithDevTools(applyMiddleware()))
}

export const initializeStore = (preloadedState: PlayerState) => {
	const _store = store ?? initStore(preloadedState)
	if (preloadedState && store) {
		const state = store.getState()
		const initialStore = {
			...preloadedState,
			...state,
		}
		state.player.playerID = preloadedState.playerID
		return initialStore
	}

	if (typeof window === 'undefined') return _store

	if (!store) store = _store

	return _store
}

export function useStore(initialState: PlayerState) {
	return useMemo(() => initializeStore(initialState), [initialState])
}
