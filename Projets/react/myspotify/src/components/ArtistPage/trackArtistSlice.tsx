import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';

interface ArtistTrackState {
    topTracks: any[];
    topTracksId: string,
    tracks: any,
    albums: any,
    topAlbum: any[];
}

const initialState: ArtistTrackState = {
    topTracks: [],
    topTracksId: '',
    tracks: '',
    albums: '',
    topAlbum: []
};

export const artistTrackSlice = createSlice({
    name: 'topTracks',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<any>) => {
            action.payload.tracks.forEach((item:any) => {
                state.topTracks.push(item)
            })
        },
        setAlbum: (state, action: PayloadAction<any>) => {
            action.payload.tracks.forEach((item:any) => {
                state.topAlbum.push(item)
            })
        },
        setTopAlbum: (state, action: PayloadAction<string>) => {
            state.albums = action.payload;
        },
        setTopTracks: (state, action: PayloadAction<string>) => {
            state.tracks = action.payload;
        },
        setCurrentTopTrackId: (state, action: PayloadAction<string>) => {
            state.topTracksId = action.payload;
        }
    },
});

export const { setData } = artistTrackSlice.actions;

export const selectData = (state: RootState) => state.artistTrack.topTracks;
export const selectAlbum = (state: RootState) => state.artistTrack.topAlbum;

export const setTracks = (accessToken: string): AppThunk => dispatch => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);

    fetch('https://api.spotify.com/v1/artists/0eDvMgVFoNV3TpwtrVCoTj/top-tracks?market=FR', {
        method: 'GET',
        headers: myHeaders,
    }).then(response => response.json())
        .then((data) => {
            dispatch(setData(data));
        }).catch((error) => {
        console.log(error);
        if (error instanceof XMLHttpRequest) {
            if (error.status === 401) {
            }
        }
    });
};

export const setAlbumName = (accessToken: string): AppThunk => dispatch => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);

    fetch('https://api.spotify.com/v1/artists/0eDvMgVFoNV3TpwtrVCoTj/albums', {
        method: 'GET',
        headers: myHeaders,
    }).then(response => response.json())
        .then((data) => {
            console.log("--->", data);
            //dispatch(setData(data));
        }).catch((error) => {
        console.log(error);
        if (error instanceof XMLHttpRequest) {
            if (error.status === 401) {
            }
        }
    });
};

export default artistTrackSlice.reducer;
