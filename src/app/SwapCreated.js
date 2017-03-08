import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 100,
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

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});

class SwapCreated extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
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
