import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setLoggedIn,
    setAccessToken,
    setTokenExpiryDate,
    selectIsLoggedIn,
    selectTokenExpiryDate,
} from './AuthorizationSlice';
import { setUserProfileAsync } from '../user/UserSlice';
import { getAuthorizeHref } from '../../oauthConfig';
import { getHashParams, removeHashParamsFromUrl } from '../../utils/hashUtils';

const hashParams = getHashParams();
const access_token = hashParams.access_token;
const expires_in = hashParams.expires_in;
removeHashParamsFromUrl();

export function Authorization() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const tokenExpiryDate = useSelector(selectTokenExpiryDate);
    const dispatch = useDispatch();

    useEffect(() => {
        if (access_token) {
            dispatch(setLoggedIn(true));
            dispatch(setAccessToken(access_token));
            dispatch(setTokenExpiryDate(Number(expires_in)));
            dispatch(setUserProfileAsync(access_token));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="bg-black rounded-lg shadow-xl overflow-hidden ">
                    <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                        <div className="lg:self-center">
                            <h2 className="text-3xl font-extrabold text-green-400 sm:text-4xl">
                                <span className="block">Projet MySpotify React</span>
                            </h2>
                            <p className="mt-4 text-lg leading-6 text-indigo-200">Cliquez sur le boutton ci-dessous pour vous connecter à l'interface avec votre compte</p>
                            <button
                                className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-indigo-50"
                                aria-label="Log in using OAuth 2.0"
                                onClick={() => window.open(getAuthorizeHref(), '_self')}
                            >
                                Log in with Spotify
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}