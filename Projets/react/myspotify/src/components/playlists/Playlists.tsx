// @ts-ignore
import React, {Component, useEffect, useState} from 'react';
// @ts-ignore
import {useDispatch, useSelector} from 'react-redux';
import {setPlaylists, selectData, setCurrentPlaylist, selectPlaylistTracks} from "./PlaylistsSlice";
import {selectAccessToken} from "../authorization/AuthorizationSlice";
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from "react-router-dom";
import { useHistory } from 'react-router-dom';



export function Playlists() {
    let history = useHistory();

    const dispatch = useDispatch();
    const access_token = useSelector(selectAccessToken);
    useEffect(() => {
        dispatch(setPlaylists(access_token));
    }, []);
    const playlists = useSelector(selectData);
    /*const [displayOne, setDisplayOne] = useState(false);
    const [currentPlaylist, setCurrentPlaylistId] = useState<{id: string; image:string; name:string}>({id: '', image: '', name: ''});*/

    return (
        <div className="bg-black">
            <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 sm:py-4">
                <div className="space-y-12">
                    <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                        <h2 className="text-3xl text-white font-extrabold tracking-tight sm:text-4xl">Voici des
                            playlists à découvrir</h2>
                    </div>
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
    )
}

export default Playlists;