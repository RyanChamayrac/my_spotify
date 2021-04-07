import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';

interface ArtistTrackState {
    topTracks: any[];
    topTracksId: string,
    tracks: any,
    albums: any,
    topAlbum: any[];
    artist: any;
}

const initialState: ArtistTrackState = {
    topTracks: [],
    topTracksId: '',
    tracks: '',
    albums: '',
    topAlbum: [],
    artist: {}
};

export const artistTrackSlice = createSlice({
    name: 'topTracks',
    initialState,
    reducers: {
        setTopTracks: (state, action: PayloadAction<any>) => {
            state.topTracks = [];
            action.payload.tracks.forEach((item:any) => {
                state.topTracks.push(item)
            })
        },
        setAlbums: (state, action: PayloadAction<any>) => {
            state.topAlbum = [];
            action.payload.items.forEach((item:any) => {
                state.topAlbum.push(item)
            })
        },
        setTopAlbum: (state, action: PayloadAction<string>) => {
            state.albums = action.payload;
        },
        setCurrentTopTrackId: (state, action: PayloadAction<string>) => {
            state.topTracksId = action.payload;
        },
        setArtist: (state, action: PayloadAction<any>) => {
            state.artist = action.payload;
        }
    },
});

export const { setTopTracks, setArtist, setAlbums } = artistTrackSlice.actions;

export const selectData = (state: RootState) => state.artistTrack.topTracks;
export const selectAlbum = (state: RootState) => state.artistTrack.topAlbum;
export const selectArtist = (state: RootState) => state.artistTrack.artist;

export const setTracks = (accessToken: string, artistId: string): AppThunk => dispatch => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);

    fetch('https://api.spotify.com/v1/artists/' + artistId + '/top-tracks?market=FR', {
        method: 'GET',
        headers: myHeaders,
    }).then(response => response.json())
        .then((data) => {
            dispatch(setTopTracks(data));
        }).catch((error) => {
        console.log(error);
        if (error instanceof XMLHttpRequest) {
            if (error.status === 401) {
            }
        }
    });
};

export const setAlbumName = (accessToken: string, artistId: string): AppThunk => dispatch => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);

    fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums', {
        method: 'GET',
        headers: myHeaders,
    }).then(response => response.json())
        .then((data) => {
            dispatch(setAlbums(data));
        }).catch((error) => {
        console.log(error);
        if (error instanceof XMLHttpRequest) {
            if (error.status === 401) {
            }
        }
    });
};

export default artistTrackSlice.reducer;
