import { Action, configureStore, Store, ThunkAction } from '@reduxjs/toolkit'
import { postSlice, PostState } from './posts'
import playerSlice from './playerData'
import { createWrapper } from 'next-redux-wrapper';

// export const makeStore = () => configureStore({
// 	reducer: {
// 		posts: postSlice.reducer,
// 		player: playerSlice.reducer
// 	},
// 	middleware: (getDefaultMiddleware) =>
// 		getDefaultMiddleware({
// 			thunk: true,
// 		}),
// 	devTools: process.env.NODE_ENV !== 'production',
// })


// export const store =  configureStore({
// 	reducer: {
// 		posts: postSlice.reducer,
// 		player: playerSlice.reducer
// 	},
// 	middleware: (getDefaultMiddleware) =>
// 		getDefaultMiddleware({
// 			thunk: true,
// 		}),
// 	devTools: process.env.NODE_ENV !== 'production',
// })

// export type AppStore = ReturnType<typeof makeStore>
// export type AppState = ReturnType<AppStore['getState']>;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

// export const someAction = (whatever: any): AppThunk => async dispatch => {
// 	dispatch(
// 		subjectSlice.actions.setWhatever({ whatever }),
// 	);
// };


// export  const reduxWrapper = createWrapper<AppStore>(makeStore);
// export  const reduxWrapper = makeStore;
// export const reduxWrapper = store;
