import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import './index.css';
import BigScreen from './bigScreen/BigScreen.js';
import Client from './client/Client.js';
import Backstage from './Backstage/Backstage.js';
import Login from './Login/login.js';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Router basename="">
        <Switch>
            <Route path="/bigScreen" component={BigScreen} />
            <Route path="/client" component={Client} />
            <Route path="/backstage" component={Backstage} />
            <Route path="/login" component={Login} />
        </Switch>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();