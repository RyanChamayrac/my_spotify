import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';

interface PlaylistsState {
    playlists: any[];
    currentPlaylist: any;
    playlistsTracks: any[];
}

const initialState: PlaylistsState = {
    playlists: [],
    currentPlaylist: {},
    playlistsTracks: []
};

export const playlistsSlice = createSlice({
    name: 'Playlists',
    initialState,
    reducers: {
        setPlaylist: (state, action: PayloadAction<any>) => {
            state.playlists = []
            action.payload.playlists.items.forEach((item: any) => {
                state.playlists.push(item);
            })
        },
        setUserPlaylist: (state, action: PayloadAction<any>) => {
            state.playlists = []
            action.payload.items.forEach((item: any) => {
                state.playlists.push(item);
            })
        },
        setCurrentPlaylist: (state, action: PayloadAction<any>) => {
            state.currentPlaylist = action.payload;
        },
        setTracks: (state, action: PayloadAction<any>) => {
            state.playlistsTracks = [];
            action.payload.items.forEach((item: any) => {
                state.playlistsTracks.push(item.track);
            })
        }
    },
});

export const { setPlaylist, setUserPlaylist, setTracks, setCurrentPlaylist } = playlistsSlice.actions;

export const selectPlaylists = (state: RootState) => state.playlists.playlists;
export const selectPlaylistTracks = (state: RootState) => state.playlists.playlistsTracks;
export const selectCurrentPlaylist = (state: RootState) => state.playlists.currentPlaylist;

export const setPlaylists = (accessToken: string): AppThunk => dispatch => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);

    fetch('https://api.spotify.com/v1/browse/featured-playlists', {
        method: 'GET',
        headers: myHeaders,
    }).then(response => response.json())
        .then((data) => {
            dispatch(setPlaylist(data));
        }).catch((error) => {
        console.log(error);
        if (error instanceof XMLHttpRequest) {
            if (error.status === 401) {

            }
        }
    });
}

export const setPlaylistTracks = (accessToken: string, playlistId: string): AppThunk => dispatch => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);

    fetch('https://api.spotify.com/v1/playlists/' + playlistId + '/tracks?market=FR', {
        method: 'GET',
        headers: myHeaders
    }).then(response => response.json())
        .then((data) => {
            dispatch(setTracks(data));
        }).catch((error) => {
        console.log(error);
        if (error instanceof XMLHttpRequest) {
            if (error.status === 401) {

            }
        }
    });
}

export const setUserPlaylists = (accessToken: string): AppThunk => dispatch => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);

    fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'GET',
        headers: myHeaders
    }).then(response => response.json())
        .then((data) => {
            dispatch(setUserPlaylist(data));
        }).catch((error) => {
        console.log(error);
        if (error instanceof XMLHttpRequest) {
            if (error.status === 401) {

            }
        }
    });
}

export default playlistsSlice.reducer;