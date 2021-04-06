import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';

interface PlaylistsState {
    playlists: any[];
    currentPlaylistId: string
}

const initialState: PlaylistsState = {
    playlists: [],
    currentPlaylistId: ''
};

export const playlistsSlice = createSlice({
    name: 'Playlists',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<any>) => {
            action.payload.playlists.items.forEach((item: any) => {
                state.playlists.push(item);
            })
        },
        setCurrentPlaylistId: (state, action: PayloadAction<string>) => {
            state.currentPlaylistId = action.payload
        }
    },
});

export const { setData } = playlistsSlice.actions;

export const selectData = (state: RootState) => state.playlists.playlists;

export const setPlaylists = (accessToken: string): AppThunk => dispatch => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);

    fetch('https://api.spotify.com/v1/browse/featured-playlists', {
        method: 'GET',
        headers: myHeaders,
    }).then(response => response.json())
        .then((data) => {
            console.log(data.playlists.items[0].images[0].url);
            dispatch(setData(data));
        }).catch((error) => {
        console.log(error);
        if (error instanceof XMLHttpRequest) {
            if (error.status === 401) {

            }
        }
    });

}

export default playlistsSlice.reducer;