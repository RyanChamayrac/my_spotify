// @ts-ignore
import React, {Component, useEffect, useState} from 'react';
// @ts-ignore
import {useDispatch, useSelector} from 'react-redux';
import {selectData, selectReadMore, setUsersArtists} from './TopArtistsSlice';
import {selectAccessToken} from "../authorization/AuthorizationSlice";
import {selectUserName} from "../user/UserSlice";

export function TopArtists(props: any) {
    const data = useSelector(selectData);
    const access_token = useSelector(selectAccessToken);
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    const [readMore, setReadMore] = useState(false);
    const linkName = readMore ? 'Voir moins' : 'Voir plus'

    useEffect(() => {
        dispatch(setUsersArtists(access_token));
    }, []);

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
                                        <h3 className="mt-6 text-white text-sm font-medium">{item.name}</h3>
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

                <div className="App">

                </div>
            </div>
        </main>
    )
}