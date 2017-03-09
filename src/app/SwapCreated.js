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
        alert('not implemented yet');
    }

    handleFinalizeSwap = () => {
        this.setState({finalizeSent: true});

        let swapId = this.state.swapId;
        let url = 'http://beerswap.enservio.lan/BeerWS/api/Beer/Swap/attendees/randomize/V1/' + swapId;
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
            console.log(users);
        }
    }

    handleStartSwap = () => {

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
