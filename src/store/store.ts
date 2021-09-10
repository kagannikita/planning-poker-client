import { configureStore, Store } from '@reduxjs/toolkit'
import { postSlice, PostState } from './posts'
import playerSlice from './playerData'
import { useMemo } from 'react';

let store: Store;

const createStore = (preloadedState: RootState) => {
		return configureStore({
			reducer: {
				posts: postSlice.reducer,
				player: playerSlice.reducer
			},
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware({
					thunk: true,
				}),
			devTools: process.env.NODE_ENV !== 'production',
			preloadedState
		})

	}
	 

export const initialiseStore = (preloadedState: RootState) => {
	let _store = store ?? createStore(preloadedState);

	if (preloadedState && store) {
		_store = createStore({ ...store.getState(), ...preloadedState });
		// store = undefined
	}

	// For SSG and SSR always create a new store
	if (typeof window === 'undefined') return _store;
	// Create the store once in the client
	if (!store) store = _store;

	return _store;
};

export function useStore(initialState: RootState) {
	const store = useMemo(() => initialiseStore(initialState), [initialState])
	return store
}


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const getPosts: (state: RootState) => {
	loading: boolean
	data: PostState | {}
} = (state: RootState) => state.posts

// export const getPlayerID: (state:  RootState) => {
// 	playerID: 
// }