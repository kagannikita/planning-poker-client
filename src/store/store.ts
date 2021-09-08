import { configureStore } from '@reduxjs/toolkit'
import { postSlice, PostState } from './posts'

export const store = configureStore({
	reducer: {
		posts: postSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: true,
		}),
	devTools: process.env.NODE_ENV !== 'production',
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const getPosts: (state: RootState) => {
	loading: boolean
	data: PostState | {}
} = (state: RootState) => state.posts
