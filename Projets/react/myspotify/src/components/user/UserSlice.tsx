import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import {
    setLoggedIn
} from '../authorization/AuthorizationSlice';

interface UserState {
    userName: string,
    product: string
    userImage: string
}

const initialState: UserState = {
    userName: '',
    product: '',
    userImage: ''
};

export const userSlice = createSlice({
    name: 'Home',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload;
        },
        setProduct: (state, action: PayloadAction<string>) => {
            state.product = action.payload;
        },
        setUserImage: (state, action: PayloadAction<string>) => {
            state.userImage = action.payload;
        }
    },
});

export const { setUserName, setProduct, setUserImage } = userSlice.actions;

export const selectUserName = (state: RootState) => state.user.userName;
export const selectProduct = (state: RootState) => state.user.product;
export const selectUserImage = (state: RootState) => state.user.userImage;

export const setUserProfileAsync = (accessToken: string): AppThunk => dispatch => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);

    fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: myHeaders,
    }).then(response => response.json())
        .then((data) => {
            console.log(data);
            dispatch(setUserName(data.display_name));
            dispatch(setProduct(data.product));
            dispatch(setUserImage(data.images[0].url));
        }).catch((error) => {
        console.log(error);
        if (error instanceof XMLHttpRequest) {
            if (error.status === 401) {
                dispatch(setLoggedIn(false));
            }
        }
    });
};

export default userSlice.reducer;