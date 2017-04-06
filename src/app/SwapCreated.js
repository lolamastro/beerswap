import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {muiTheme} from './ColorScheme';
import RaisedButton from 'material-ui/RaisedButton';

var AppConfig = require('AppConfig');

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
    },
    button: {
        margin:20

    }
};

class SwapCreated extends Component {
    constructor(props, context) {
        super(props, context);

        let swapId = this.props.params['swapId'];

        this.state = {
            reminderSent: false,
            finalizeSent: false,
            swapId: swapId
        };

        this.handleRemindUsers = this.handleRemindUsers.bind(this);
        this.handleFinalizeSwap = this.handleFinalizeSwap.bind(this);
        this.handleStartSwap = this.handleStartSwap.bind(this);
        this.handleViewSwap = this.handleViewSwap.bind(this);

        this.isReminderSent = this.isReminderSent.bind(this);
    }

    isReminderSent = () => {
        return this.state.reminderSent;
    }

    isFinalizeSent = () => {
        return this.state.finalizeSent;
    }

    handleRemindUsers = () => {
        this.setState({reminderSent: true});
        let me = this;
        let swapId = this.state.swapId;
        let url = AppConfig.ApiBaseUrl + 'Beer/Swap/Remind/V1/' + swapId;
        fetch(url, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            method: 'post'
        }).then(function (response) {
            return response.json();
        }).then(writeUsers);

        function writeUsers(data) {
            me.setState({reminderSent: true});
            console.log(users);
        }
    }

    handleViewSwap = () => {
        let swapId = this.state.swapId;
        this.props.router.push('/beers/' + swapId);
    }

    handleFinalizeSwap = () => {
        let me = this;
        let swapId = this.state.swapId;
        let url = AppConfig.ApiBaseUrl + 'Beer/Swap/attendees/randomize/V1/' + swapId;
        fetch(url, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            method: 'put'
        }).then(function (response) {
            return response.json();
        }).then(writeUsers);

        function writeUsers(users) {
            me.setState({finalizeSent: true});
            console.log(users);
        }
    }

    handleStartSwap = () => {
        let swapId = this.state.swapId;
        this.props.router.push('/runswap/' + swapId);
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
                        <p className="instructions">Bookmark this page to come back and administer the swap.</p>
                    </Paper>
                    <br/>
                    <ReminderEmailButton handleRemindUsers={this.handleRemindUsers} disableButton={this.isReminderSent()}></ReminderEmailButton>
                    <FinalizeButton handleFinalizeSwap={this.handleFinalizeSwap} disableButton={this.isFinalizeSent()}></FinalizeButton>
                    <ViewSwapButton handleViewSwap={this.handleViewSwap}></ViewSwapButton>
                    <StartSwapButton handleStartSwap={this.handleStartSwap}></StartSwapButton>
                </div>
            </MuiThemeProvider>
        );
    }
}


class ReminderEmailButton extends React.Component {
    render() {
        return (
            <RaisedButton style={styles.button}
                          label="Send Reminder Email"
                          secondary={true}
                          onTouchTap={this.props.handleRemindUsers}
                          disabled={this.props.disableButton}
            />
        );
    }
}


class FinalizeButton extends React.Component {
    render() {
        return (
            <RaisedButton style={styles.button}
                          label="Finalize Swap"
                          secondary={true}
                          onTouchTap={this.props.handleFinalizeSwap}
                          disabled={this.props.disableButton}
            />
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



class StartSwapButton extends React.Component {
    render() {
        return (
            <RaisedButton style={styles.button}
                          label="Start Swap"
                          primary={true}
                          onTouchTap={this.props.handleStartSwap}
            />
        );
    }
}

export default SwapCreated;
