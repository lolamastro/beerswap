import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, Route, hashHistory} from 'react-router';
import CreateSwap from './CreateSwap';
import InviteUsers from './InviteUsers';
import SwapCreated from './SwapCreated';
import BeerSaved from './BeerSaved';
import JoinSwap from './JoinSwap';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
// render(<CreateSwap />, document.getElementById('app'));
render((
    <Router history={hashHistory}>
        <Route name="createSwap" path="/" component={CreateSwap}/>
        <Route name="invite" path="/invite/:swapId" component={InviteUsers}/>
        <Route name="swapcreated" path="/swapcreated" component={SwapCreated}/>
        <Route name="beersaved" path="/beersaved" component={BeerSaved}/>
        <Route name="join" path="/join/:userId/:swapId" component={JoinSwap}/>
    </Router>
), document.getElementById('app'));
