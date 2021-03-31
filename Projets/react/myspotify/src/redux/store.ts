import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authorizationReducer from '../components/authorization/AuthorizationSlice';
import spotifyexampleReducer from '../components/spotifyExample/spotifyExampleSlice'

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    spotifyExample: spotifyexampleReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
