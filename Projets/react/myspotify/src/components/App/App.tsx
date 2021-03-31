import React from 'react';
import logo from './logo.svg';
import {Authorization} from '../authorization/Authorization';
import './App.css';
import {Home, SpotifyExample} from "../spotifyExample/SpotifyExample";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../authorization/AuthorizationSlice";

function App() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <div className="App">
            {!isLoggedIn && <Authorization/>}
            {isLoggedIn && <Home/>}
            {/*isLoggedIn && <Router>
                    <div>
                        <ul>
                            <li>
                                <Link to="/home">Home</Link>
                            </li>
                        </ul>
                        <hr />
                        <Switch>
                            <Route exact path="/home">
                                <SpotifyExample />
                            </Route>
                        </Switch>
                    </div>
                </Router>*/}
        </div>
    );
}

export default App;
