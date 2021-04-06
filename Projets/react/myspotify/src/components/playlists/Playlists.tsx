// @ts-ignore
import React, {Component, useEffect, useState} from 'react';
// @ts-ignore
import {useDispatch, useSelector} from 'react-redux';
import {setPlaylists, selectData} from "./PlaylistsSlice";
import {selectAccessToken} from "../authorization/AuthorizationSlice";

export function Playlists() {
    const dispatch = useDispatch();
    const access_token = useSelector(selectAccessToken);
    useEffect(() => {
        dispatch(setPlaylists(access_token));
    }, []);
    const playlists = useSelector(selectData);
    const [displayOne, setDisplayOne] = useState(false);
    const [currentPlaylistId, setCurrentPlaylistId] = useState(null);


    return (
        <div className="bg-black">
            <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 sm:py-4">
                {!displayOne &&
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
                                            className="read-more-link font-bold text-green-600 hover:text-green-400 hover:underline" onClick={() => {
                                                setDisplayOne(!displayOne);
                                                setCurrentPlaylistId(item.id);
                                            }}>
                                            <h3>{item.name}</h3>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        })}

                    </ul>
                </div>
                }
                {displayOne &&
                <div className="relative bg-black overflow-hidden">
                    <div className="relative px-4 sm:px-6 sm:px-8">
                        <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
                            <figure>
                                <img className="w-full rounded-lg md:max-w-xs object-center display:inline"
                                     src="https://i.scdn.co/image/ab67706f000000033dea43365eb16182a263326e"
                                     alt="" width="300" height="300"/>
                                    <figcaption className="text-white">Sagittis scelerisque nulla cursus in enim consectetur quam.</figcaption>
                            </figure>

                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Playlists;