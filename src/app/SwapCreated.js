import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {muiTheme} from './ColorScheme';

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 20,
    },
    paper: {
        height: 200,
        width: 340,
        margin: 20,
        padding: 50,
        textAlign: 'center',
        display: 'inline-block'
    }
};

class SwapCreated extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <img src="images/logo.png" className="logo-sm" />
                    <br/>
                    <Paper style={styles.paper} zDepth={2}>
                        <h1>Swap was created</h1>
                        <h2>and emails have been sent.</h2>
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default SwapCreated;
