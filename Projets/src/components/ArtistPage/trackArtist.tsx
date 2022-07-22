import React, {Component, useEffect, useState} from 'react';
// @ts-ignore
import {useDispatch, useSelector} from 'react-redux';
import {selectData, setTracks, setAlbumName, selectAlbum, selectArtist} from './trackArtistSlice'
import {selectAccessToken} from "../authorization/AuthorizationSlice";
import {useParams} from "react-router-dom";

export function TrackArtist() {
    const access_token = useSelector(selectAccessToken);
    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(() => {
        dispatch(setTracks(access_token, id));
        dispatch(setAlbumName(access_token, id));
    }, []);
    const topTracks = useSelector(selectData);
    const topAlbums = useSelector(selectAlbum);
    const artist = useSelector(selectArtist);

    return (
        <div className="bg-black">
            <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 sm:py-4">
                <div className="space-y-12">
                    <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                        <figure>
                            <img className="w-full rounded-lg md:max-w-xs display: inline-block"
                                 src={artist.image}
                                 alt="" width="300" height="300"/>
                        </figure>
                        <h2 className="text-3xl text-white font-extrabold tracking-tight sm:text-4xl">{artist.name}</h2>
                    </div>
                    <div className="mt-6 sm:pb-5 prose-indigo prose-lg text-white mx-auto">
                    </div>
                    <h2 className="text-3xl text-white font-extrabold tracking-tight sm:text-4xl">Titres les plus
                        écoutés</h2>
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
                    </ul>
                    <h2 className="text-3xl text-white font-extrabold tracking-tight sm:text-4xl">Albums</h2>
                    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:pb-4">
                        {topAlbums.map(function (item: any) {
                                return <li
                                    className="col-span-1 flex flex-col bg-gray-900 text-center rounded-lg shadow divide-y divide-gray-200">
                                    <div className="flex-1 flex flex-col p-8">
                                        <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
                                             src={item.images[0].url}
                                             alt=""/><h3
                                        className="mt-6 text-white text-sm font-medium">{item.name}</h3>
                                    </div>
                                </li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TrackArtist;
