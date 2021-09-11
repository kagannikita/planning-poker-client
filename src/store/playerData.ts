import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PlayerState = {
	playerID: string
}

export const initialState: PlayerState = {
	playerID: '',
}

export const playerSlice = createSlice({
	name: 'player',
	initialState: initialState,
	reducers: {
		setPlayerID: (state, { payload }: PayloadAction<string>) => {
			state.playerID = payload
		},
	},
})

export const { setPlayerID } = playerSlice.actions
export default playerSlice.reducer
