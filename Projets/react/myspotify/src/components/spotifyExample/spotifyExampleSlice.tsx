import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import {
    setLoggedIn
} from '../authorization/AuthorizationSlice';

interface SpotifyExampleState {
    displayName: string,
    product: string
    data: any[];
}

const initialState: SpotifyExampleState = {
    data: [],
    displayName: '',
    product: '',
};

export const spotifyExampleSlice = createSlice({
    name: 'spotifyExample',
    initialState,
    reducers: {
        setDisplayName: (state, action: PayloadAction<string>) => {
            state.displayName = action.payload;
        },
        setProduct: (state, action: PayloadAction<string>) => {
            state.product = action.payload;
        },
        setData: (state, action: PayloadAction<any>) => {
            action.payload.items.forEach((item: any) => {
                state.data.push(item);
            })
        }
    },
});

export const { setDisplayName, setProduct, setData } = spotifyExampleSlice.actions;

export const selectDisplayName = (state: RootState) => state.spotifyExample.displayName;
export const selectProduct = (state: RootState) => state.spotifyExample.product;
export const selectData = (state: RootState) => state.spotifyExample.data;

export const setUserProfileAsync = (accessToken: string): AppThunk => dispatch => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);

    fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: myHeaders,
    }).then(response => response.json())
        .then((data) => {
            console.log(data);
            dispatch(setDisplayName(data.display_name ? data.display_name : data.id));
            dispatch(setProduct(data.product));
        }).catch((error) => {
        console.log(error);
        if (error instanceof XMLHttpRequest) {
            if (error.status === 401) {
                dispatch(setLoggedIn(false));
            }
        }
    });
};

export const setUsersArtists = (accessToken: string): AppThunk => dispatch => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);

    fetch('https://api.spotify.com/v1/me/top/artists', {
        method: 'GET',
        headers: myHeaders,
    }).then(response => response.json())
        .then((data) => {
            console.log(data);
            dispatch(setData(data));
        }).catch((error) => {
        console.log(error);
        if (error instanceof XMLHttpRequest) {
            if (error.status === 401) {

            }
        }
    });

}

export default spotifyExampleSlice.reducer;