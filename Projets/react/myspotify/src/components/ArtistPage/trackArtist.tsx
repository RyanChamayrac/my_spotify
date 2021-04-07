import React, {Component, useEffect, useState} from 'react';
// @ts-ignore
import {useDispatch, useSelector} from 'react-redux';
import {selectData, setTracks, setAlbumName, selectAlbum} from './trackArtistSlice'
import {selectAccessToken} from "../authorization/AuthorizationSlice";

export function TrackArtist() {
    const access_token = useSelector(selectAccessToken);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTracks(access_token));
        dispatch(setAlbumName(access_token));
    }, []);
    const topTracks = useSelector(selectData);
    const topAlbum = useSelector(selectAlbum);
    console.log("track", topTracks);
    const [displayOne, setDisplayOne] = useState(false);
    const [topTracksId, setCurrentTopTrackId] = useState(null);


    return (
        <div className="bg-black">
            <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 sm:py-4">
                <div className="space-y-12">
                    <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                        <h2 className="text-3xl text-white font-extrabold tracking-tight sm:text-4xl">Nom de l'artiste</h2>
                    </div>
                    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:pb-4">
                        {topTracks.map(function (item: any, i: number) {
                            if (i < 4) {
                                return <li
                                    className="col-span-1 flex flex-col bg-gray-900 text-center rounded-lg shadow divide-y divide-gray-200">
                                    <div className="flex-1 flex flex-col p-8">
                                        <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
                                             src={item.album.images[0].url}
                                             alt=""/><h3
                                        className="mt-6 text-white text-sm font-medium">{item.name}</h3>
                                    </div>
                                </li>
                            }
                        })}
                        {topAlbum.map(function (item: any, i: number) {
                            if (i < 4) {
                                return <li
                                    className="col-span-1 flex flex-col bg-gray-900 text-center rounded-lg shadow divide-y divide-gray-200">
                                    <div className="flex-1 flex flex-col p-8">
                                        <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
                                             src={item.album.images[0].url}
                                             alt=""/><h3
                                        className="mt-6 text-white text-sm font-medium">{item.album.name}</h3>
                                    </div>
                                </li>
                            }
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TrackArtist;
