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
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Router basename="">
        <Switch>
            <Route path="/bigScreen" component={BigScreen} />
            <Route path="/client" component={Client} />
            <Route path="/backstage" component={Backstage} />
        </Switch>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();