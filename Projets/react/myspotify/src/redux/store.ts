import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authorizationReducer from '../components/authorization/AuthorizationSlice';
import homeReducer from '../components/spotifyExample/spotifyExampleSlice'

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    home: homeReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
