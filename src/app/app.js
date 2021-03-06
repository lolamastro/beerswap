import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, Route, hashHistory} from 'react-router';
import createStore from './store/createStore';
import { Provider } from 'react-redux';

import CreateSwap from './CreateSwap';
import InviteUsers from './InviteUsers';
import SwapCreated from './SwapCreated';
import BeerSaved from './BeerSaved';
import JoinSwap from './JoinSwap';
import BeerList from './BeerList';
import AllBeerList from './AllBeerList';
import RunSwap from './RunSwap';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = createStore();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
// render(<CreateSwap />, document.getElementById('app'));
render((

    <Provider store={store}>
    <Router history={hashHistory}>
        <Route name="createSwap" path="/" component={CreateSwap}/>
        <Route name="invite" path="/invite/:swapId" component={InviteUsers}/>
        <Route name="swapcreated" path="/swapcreated/:swapId" component={SwapCreated}/>
        <Route name="beersaved" path="/beersaved/:swapId" component={BeerSaved}/>
        <Route name="join" path="/join/:userId/:swapId" component={JoinSwap}/>
        <Route name="beers" path="/beers/:swapId" component={BeerList}/>
        <Route name="allbeers" path="/allbeers" component={AllBeerList}/>
        <Route name="runswap" path="/runswap/:swapId" component={RunSwap}/>
    </Router>
    </Provider>
), document.getElementById('app'));
