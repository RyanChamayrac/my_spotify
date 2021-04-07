import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch, useHistory} from "react-router-dom";
import {TopArtists} from "../topArtists/TopArtists";
import {selectUserImage, selectUserName} from "../user/UserSlice";
import {useDispatch, useSelector} from "react-redux";
import {Playlists} from "../playlists/Playlists";
import Playlist from "../playlists/Playlist";
import {setLoggedIn} from "../authorization/AuthorizationSlice";

function Home() {
    const userImage = useSelector(selectUserImage);
    const dispatch = useDispatch();

    return (
        <Router>
            <div className="min-h-screen  bg-black">
                <nav className="bg-black border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                    <Link to="/"
                                          className="text-white hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Home</Link>

                                    <Link to="/playlists"
                                          className="text-white hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                        Playlists
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                <div className="ml-3 relative">
                                    <div>
                                        <button type="button"
                                                className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                id="user-menu" aria-expanded="false" aria-haspopup="true">
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-8 w-8 rounded-full"
                                                 src={userImage}
                                                 alt=""/>
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <div className="-mr-2 flex items-center sm:hidden">
                                <button type="button"
                                        className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        aria-controls="mobile-menu" aria-expanded="false">
                                    <span className="sr-only">Open main menu</span>

                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M4 6h16M4 12h16M4 18h16"/>
                                    </svg>

                                    <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="sm:hidden" id="mobile-menu">
                        <div className="pt-2 pb-3 space-y-1">
                            <a href="#"
                               className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                                Dashboard
                            </a>

                            <a href="#"
                               className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                                Team
                            </a>

                            <a href="#"
                               className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                                Projects
                            </a>

                            <a href="#"
                               className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                                Calendar
                            </a>
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full"
                                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=fn8AepZtqW&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                         alt=""/>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">Tom Cook</div>
                                    <div className="text-sm font-medium text-gray-500">tom@example.com</div>
                                </div>
                                <button
                                    className="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <span className="sr-only">View notifications</span>
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-3 space-y-1">
                                <a href="#"
                                   className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                                    Your Profile
                                </a>

                                <a href="#"
                                   className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                                    Settings
                                </a>

                                <a href="#"
                                   className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                                    Sign out
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="py-10">
                    <Switch>
                        <Route exact path="/">
                            <TopArtists/>
                        </Route>
                        <Route exact path="/playlists">
                            <Playlists/>
                        </Route>
                        <Route exact path="/playlist/:id">
                            <Playlist/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>

    );
}

export default Home;
