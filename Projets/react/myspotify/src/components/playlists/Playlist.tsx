// @ts-ignore
import React, {Component, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
// @ts-ignore
import {useDispatch, useSelector} from 'react-redux';
import {
    setPlaylists,
    setPlaylistTracks,
    selectPlaylistTracks,
    selectCurrentPlaylist
} from "./PlaylistsSlice";
import {selectAccessToken} from "../authorization/AuthorizationSlice";

export function Playlist() {
    const dispatch = useDispatch();
    const access_token = useSelector(selectAccessToken);
    let {id} = useParams()
    useEffect(() => {
        dispatch(setPlaylistTracks(access_token, id));
    }, []);
    const tracks = useSelector(selectPlaylistTracks);
    const currentPlaylist = useSelector(selectCurrentPlaylist);

    return (
        <div className="bg-black">
            <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 sm:py-4">
                <div className="relative bg-black overflow-hidden">
                    <div className="relative px-4 sm:px-6 sm:px-8">
                        <div className="mt-6 sm:pb-5 prose-indigo prose-lg text-white mx-auto">
                            <figure>
                                <img className="w-full rounded-lg md:max-w-xs object-center"
                                     src={currentPlaylist.image}
                                     alt="" width="300" height="300"/>
                                <h2 className="text-3xl text-white font-extrabold tracking-tight sm:text-4xl">
                                    {currentPlaylist.name}
                                </h2>
                            </figure>
                        </div>
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-10 lg:-mx-12">
                                <div className="py-2 align-middle inline-block min-w-full">
                                    <div className="shadow overflow-hidden border-b border-white sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-white">
                                            <thead className="bg-black border-2 border-white">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Titre
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Album
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Role
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-black divide-y divide-gray-200">
                                            {tracks.map(function(track: any) {
                                                return <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-full" src={track.album.images[0].url} alt=""/>
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-white text-left">
                                                                    {track.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-white text-left">{track.artists[0].name}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-white text-left">{track.album.name}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {getTimeString(track.duration_ms)}
                                                    </td>
                                                </tr>
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

var getTimeString = function(timeInMs: any) {
    let delim = ":";
    let minutes: string | number = Math.floor(timeInMs / (1000 * 60) % 60);
    let seconds: string | number = Math.floor(timeInMs / 1000 % 60);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return minutes + delim + seconds;
}

export default Playlist;