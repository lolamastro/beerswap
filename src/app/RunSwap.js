import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {muiTheme} from './ColorScheme';
import {setSwapId} from './actions/RunSwapActions';

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 20,
    },
    button: {
        margin:20
    }
};

class RunSwap extends Component {
    constructor(props, context) {
        super(props, context);

        let swapId = this.props.params['swapId'];
        const { store } = this.context;
        store.dispatch(setSwapId(swapId));
    }

    render() {

        const { store } = this.context;

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <img src="images/logo.png" className="logo-sm" />
                    <br/>
                    <Paper style={styles.paper} zDepth={2}>
                        <h1>USER Pick Beer</h1>
                        <p className="instructions">Click on the beer you want.</p>
                    </Paper>
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
