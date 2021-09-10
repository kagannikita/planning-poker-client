import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlayerState {
  playerID: string,
}

const initState: PlayerState = {
  playerID: ''
}

const playerSlice = createSlice({
  name: 'player',
  initialState: initState,
  reducers: {
    setPlayerID: (state, {payload}: PayloadAction<string>) => {
      state.playerID = payload
    }
  }
})

export const { setPlayerID } = playerSlice.actions
export default playerSlice
