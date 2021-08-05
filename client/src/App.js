import React from 'react';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Topbar from './Topbar';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import Hook from './Hook';
import Clientapk from './Clientapk';
import Settings from './Settings';
import Profile from './Profile';

function App() {
    return (
        <Router>
            <Switch>
                
                <Route path="/" exact>
                    <Redirect to="/login" />
                </Route>

                <Route path="/login" component={Login} >
                    <Login />
                </Route>

                <Route path="/register" component={Register}>
                    <Register />
                </Route>

                <Route path="/home" component={Home}>
                    <Topbar />
                    <Home />
                </Route>

                <Route path="/hook" component={Hook}>
                    <Topbar />
                    <Hook />
                </Route>

                <Route path="/settings" component={Settings}>
                    <Topbar />
                    <Settings />
                </Route>

                <Route path="/profile" component={Profile}>
                    <Topbar />
                    <Profile />
                </Route>

                <Route path="/client.apk" component={Clientapk}/>

            </Switch>
        </Router>
    );
}

export default App;