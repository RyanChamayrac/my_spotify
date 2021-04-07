// @ts-ignore
import React, {Component, useEffect, useState} from 'react';
// @ts-ignore
import {useDispatch, useSelector} from 'react-redux';
import {selectData, selectReadMore, setUsersArtists} from './TopArtistsSlice';
import {selectAccessToken} from "../authorization/AuthorizationSlice";
import {selectUserName} from "../user/UserSlice";
import {setArtist} from "../ArtistPage/trackArtistSlice";
import {useHistory} from "react-router-dom";
import {selectPlaylists, setCurrentPlaylist, setPlaylists, setUserPlaylists} from "../playlists/PlaylistsSlice";

export function TopArtists(props: any) {
    let history = useHistory();
    const access_token = useSelector(selectAccessToken);
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    const [readMore, setReadMore] = useState(false);
    const linkName = readMore ? 'Voir moins' : 'Voir plus'
    useEffect(() => {
        dispatch(setUserPlaylists(access_token));
        dispatch(setUsersArtists(access_token));
    }, []);
    const playlists = useSelector(selectPlaylists);
    const data = useSelector(selectData);

    return (
        <main>
            <header>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold leading-tight text-green-600">
                        Bonjour {userName}
                    </h1>
                </div>
            </header>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="px-4 py-8 sm:px-0">
                    <h1 className="text-2xl font-bold leading-tight text-white">
                        Vos artistes préférés
                    </h1><br/>
                    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:pb-4">

                        {data.map(function (item: any, i: number) {
                            if (i < 4 || readMore) {
                                return <li
                                    className="col-span-1 flex flex-col bg-gray-900 text-center rounded-lg shadow divide-y divide-gray-200">
                                    <div className="flex-1 flex flex-col p-8">
                                        <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
                                             src={item.images[0].url}
                                             alt=""/>
                                        <button className="mt-6 text-green-600 hover:text-green-400 hover:underline text-sm font-medium"
                                                onClick={() => {
                                                    dispatch(setArtist({image: item.images[0].url, name: item.name}))
                                                    history.push('/artist/' + item.id);
                                                    /*dispatch(setPlaylistTracks(access_token, item.id));
                                                    setCurrentPlaylistId({id:item.id, image:item.images[0].url, name:item.name});*/
                                                }}>
                                            {item.name}</button>
                                    </div>
                                </li>
                            }
                        })}
                    </ul>
                    {
                        !readMore &&
                        <div className="-space-x-2 overflow-hidden place-items-center">
                            {data.map(function (item: any, i: number) {
                                if (i > 3 && i < 8)
                                    return <img className="inline-block h-10 w-10 rounded-full"
                                                src={item.images[0].url}
                                                alt=""/>

                            })}
                        </div>
                    }
                    <button className="read-more-link font-bold text-green-600 hover:text-green-400 hover:underline" onClick={() => {
                        setReadMore(!readMore)
                    }}><h2>{linkName}</h2></button>
                </div>


                <h1 className="text-2xl font-bold leading-tight text-white">
                    Vos playlists
                </h1><br/>
                <div className="bg-black">
                    <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 sm:py-4">
                        <div className="space-y-12">
                            <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
                                {playlists.map(function (item: any) {
                                    return <li>
                                        <div className="space-y-4">
                                            <div className="aspect-w-3 aspect-h-2">
                                                <img className="object-cover shadow-lg rounded-lg"
                                                     src={item.images[0].url}
                                                     alt=""/>
                                            </div>

                                            <div className="space-y-2">
                                                <button
                                                    className="read-more-link font-bold text-green-600 hover:text-green-400 hover:underline"
                                                    onClick={() => {
                                                        dispatch(setCurrentPlaylist({image: item.images[0].url, name: item.name}))
                                                        history.push('/playlist/' + item.id);
                                                        /*dispatch(setPlaylistTracks(access_token, item.id));
                                                        setCurrentPlaylistId({id:item.id, image:item.images[0].url, name:item.name});*/
                                                    }}>
                                                    <h3>{item.name}</h3>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}