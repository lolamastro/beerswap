import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {muiTheme} from './ColorScheme';
import {setSwapId, fetchSwap} from './actions/RunSwapActions';
import {deepOrange500} from 'material-ui/styles/colors';

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 20,
    },
    button: {
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


    render() {

        const { store } = this.context;

        let currentUser = store.getState().runSwap.get('currentUser');

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <img src="images/logo.png" className="logo-sm" />
                    <br/>
                    <h1><span style={styles.user}>{currentUser}</span> pick a beer</h1>
                    <p className="instructions">Click on the beer you want.</p>
                    <br/>

                </div>
            </MuiThemeProvider>
        );
    }
}

RunSwap.contextTypes = {
    store: React.PropTypes.object
};

export default RunSwap;
