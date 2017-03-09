import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {muiTheme} from './ColorScheme';
import RaisedButton from 'material-ui/RaisedButton';

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

class BeerSaved extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleViewSwap = this.handleViewSwap.bind(this);
        let swapId = this.props.params['swapId'];

        this.state = {
            swapId: swapId
        };
    }

    componentDidMount() {
        let me = this;

        let swapId = this.state.swapId;

        setTimeout(goToBeerList, 4000);

        function goToBeerList() {
            me.props.router.push('/beers/' + swapId);
        }
    }

    handleViewSwap = () => {
        let swapId = this.state.swapId;
        this.props.router.push('/beers/' + swapId);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <img src="images/logo.png" className="logo-sm" />
                    <br/>
                    <Paper style={styles.paper} zDepth={2}>
                        <h1>Your beer was saved.</h1>
                        <p className="instructions">We'll send you a reminder email before the swap.</p>
                        <ViewSwapButton handleViewSwap={this.handleViewSwap}></ViewSwapButton>
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}

class ViewSwapButton extends React.Component {
    render() {
        return (
            <RaisedButton style={styles.button}
                          label="View Beers"
                          secondary={true}
                          onTouchTap={this.props.handleViewSwap}
            />
        );
    }
}

export default BeerSaved;
