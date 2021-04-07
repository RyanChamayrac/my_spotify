import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authorizationReducer from '../components/authorization/AuthorizationSlice';
import userReducer from '../components/user/UserSlice'
import topArtistsReducer from '../components/topArtists/TopArtistsSlice'
import playlistsReducer from '../components/playlists/PlaylistsSlice';
import artistTracksReducer from '../components/ArtistPage/trackArtistSlice';

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    user: userReducer,
    topArtists: topArtistsReducer,
    playlists: playlistsReducer,
    artistTrack: artistTracksReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
