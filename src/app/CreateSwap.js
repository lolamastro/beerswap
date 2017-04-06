import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {muiTheme} from './ColorScheme';

var AppConfig = require('AppConfig');

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 20,
    },
};


class CreateSwap extends Component {
    constructor(props, context) {
        super(props, context);

        this.createSwap = this.createSwap.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);

        this.state = {
            swapDate: null
        };
    }

    hasDate = () => {
        return !!this.state.swapDate;
    }

    createSwap = () => {
        let swapDate = this.state.swapDate,
            swapDateStr = swapDate.toDateString(),
            me = this;

        // validate the date
        if (!swapDate) {
            alert('No swap Date!');
        }

        fetch(AppConfig.ApiBaseUrl + 'Beer/Swap/V1', {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            method: 'post',
            body: JSON.stringify({
                SwapDate: swapDate,
                Name: swapDateStr
            })
        }).then(function (response) {
            return response.json();
        }).then(function (j) {
            let swapId = j.SwapId;
            me.props.router.push('/invite/' + swapId);
        });
    }

    handleDateChange = (e, theDate) => {
        this.setState({swapDate: theDate});
        console.log("Date change", theDate);

    }

    handleTimeChange = (e, theDate) => {
        let dateState = this.state.swapDate;
        let newDate = dateState ? new Date(dateState.valueOf()) : new Date();
        newDate.setHours(theDate.getHours(), theDate.getMinutes());
        this.setState({swapDate: newDate});
    }

    getDefaultTime = () => {
        let now = new Date();
        now.setHours(12, 0, 0, 0);
        return now;
    }


    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <img src="images/logo.png" className="logo" />
                    <h1>Create a New Beer Swap</h1>
                    <DateSelector handleDateChange={this.handleDateChange}/>
                    <TimePicker
                        hintText="Select a time"
                        autoOk={true}
                        defaultTime={this.getDefaultTime()}
                        onChange={this.handleTimeChange}
                    />
                    <SubmitButton createSwap={this.createSwap} hasDate={this.hasDate}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

class DateSelector extends React.Component {
    render() {
        return (
            <DatePicker autoOk={true} hintText="Select a Date" minDate={new Date()}
                        onChange={this.props.handleDateChange}/>
        );
    }
}

class SubmitButton extends React.Component {
    render() {
        return (
            <RaisedButton label="Create Swap"
                          primary={true}
                          onTouchTap={this.props.createSwap}
                          disabled={!this.props.hasDate()}/>
        );
    }
}


export default CreateSwap;
