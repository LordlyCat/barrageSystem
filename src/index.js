import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import './index.css';
import BigScreem from './bigScreem/BigScreem.js';
import Client from './client/Client.js';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Router basename="">
        <Switch>
            <Route path="/bigScreen" component={BigScreem} />
            <Route path="/client" component={Client} />
        </Switch>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();