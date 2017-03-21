import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {muiTheme} from './ColorScheme';
import {GridList, GridTile} from 'material-ui/GridList';
import {CircularProgress} from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import {setSwapId, fetchSwap, selectBeer, completeUserSelection} from './actions/RunSwapActions';
import {deepOrange500} from 'material-ui/styles/colors';
import CountdownProgress from './CountdownProgress';

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 20,
    },
    button: {
        margin:20
    },
    tile: {
        cursor: 'pointer'
    },
    qty: {
        margin:20
    },
    user: {
        color: deepOrange500
    }
};

class RunSwap extends Component {
    constructor(props, context) {
        super(props, context);

        let swapId = this.props.params['swapId'];
        const { store } = this.context;
        store.dispatch(setSwapId(swapId));
    }

    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());

        let swapId = this.props.params['swapId'];
        store.dispatch(fetchSwap(swapId));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    clickTile(beerId) {
        const { store } = this.context;
        let swapId = store.getState().runSwap.get('swapId'),
            currentUser = store.getState().runSwap.get('currentUser');
        Promise.resolve(store.dispatch(selectBeer(swapId, currentUser.Id, beerId)).
            then(store.dispatch(completeUserSelection(currentUser))));

    }

    handleCountdownEnd() {
        var audio = new Audio('sound/shimmer.wav');
        audio.play();
    }

    render() {

        const { store } = this.context;

        let currentUser = store.getState().runSwap.get('currentUser'),
            beers = store.getState().runSwap.get('availableBeers'),
            userName = currentUser ? `${currentUser.FirstName} ${currentUser.LastName}` : null,
            gridTiles = null;


        if (beers) {
            gridTiles = beers.map((beer) => (
                <GridTile
                    key={beer.BeerId}
                    title={beer.BeerName}
                    actionIcon={<Avatar style={styles.qty}>{beer.qty}</Avatar>}
                    onClick={this.clickTile.bind(this, beer.BeerId)}>
                    <img src={beer.Label}
                         style={styles.tile} />
                </GridTile>
            ));
        }
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <img src="images/logo.png" className="logo-sm" />
                    <br/>
                    <h1><span style={styles.user}>{userName}</span> pick a beer</h1>
                    <CountdownProgress completeCallback={this.handleCountdownEnd}/>
                    <p className="instructions">Click on the beer you want.</p>
                    <br/>
                    <GridList
                        cellHeight={180}>
                        {gridTiles}
                    </GridList>

                </div>
            </MuiThemeProvider>
        );
    }
}

RunSwap.contextTypes = {
    store: React.PropTypes.object
};

export default RunSwap;
