import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import {
    setLoggedIn
} from '../authorization/AuthorizationSlice';

interface TopArtistsState {
    topArtists: any[];
    readMore: boolean
}

const initialState: TopArtistsState = {
    topArtists: [],
    readMore: false
};

export const homeSlice = createSlice({
    name: 'Home',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<any>) => {
            action.payload.items.forEach((item: any) => {
                state.topArtists.push(item);
            })
        },
        setReadMore: (state, action: PayloadAction<any>) => {
            state.readMore = action.payload;
        }
    },
});

export const { setData, setReadMore } = homeSlice.actions;

export const selectData = (state: RootState) => state.topArtists.topArtists;
export const selectReadMore = (state: RootState) => state.topArtists.readMore;

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

export default homeSlice.reducer;