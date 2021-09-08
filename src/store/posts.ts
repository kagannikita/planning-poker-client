import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PostState {
	loading: boolean
	data: IPost | {}
	error: string
}

const initialState: PostState = {
	loading: true,
	data: {
		docs: [],
	},
	error: '',
}

export const postSlice = createSlice({
	name: 'posts',
	initialState: initialState,
	reducers: {
		setData: (state, { payload }: PayloadAction<IPost>) => {
			state.data = payload
		},
		setLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.loading = payload
		},
		setError: (state, { payload }: PayloadAction<string>) => {
			state.error = payload
		},
	},
})

export const { setData, setLoading, setError } = postSlice.actions

export default postSlice.reducer
