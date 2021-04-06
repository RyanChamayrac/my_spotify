import React from 'react';
import {Authorization} from '../authorization/Authorization';
import './App.css';
import Home from "./Home";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../authorization/AuthorizationSlice";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

function App() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <div className="App">
            {!isLoggedIn && <Authorization/>}
            {isLoggedIn && <Home/>}
        </div>
    );
}

export default App;
