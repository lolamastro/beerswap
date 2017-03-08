import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class CreateSwap extends Component {
  constructor(props, context) {
    super(props, context);

    this.createSwap = this.createSwap.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);

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

        fetch('http://beerswap.enservio.lan/BeerWS/api/Beer/Swap/V1', {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            method: 'post',
            body: JSON.stringify({
                SwapDate: swapDate,
                Name: swapDateStr
            })
        }).then(function(response) {
            return response.json();
        }).then(function(j) {
            let swapId = j.SwapId;
            me.props.router.push('/invite/' + swapId);
        });
    }

    handleDateChange = (e, theDate) => {
        this.setState({swapDate: theDate});
        console.log("Date change", theDate);

    }

  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <h1>Create a New Beer Swap</h1>
            <DateSelector handleDateChange={this.handleDateChange}/>
            <SubmitButton createSwap={this.createSwap} hasDate={this.hasDate}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

class DateSelector extends React.Component {
    render() {
        return (
            <DatePicker autoOk={true} hintText="Select a Date" minDate={new Date()} onChange={this.props.handleDateChange} />
        );
    }
}

class SubmitButton extends React.Component {
    render() {
        return (
            <RaisedButton label="Create Swap"
                          secondary={true}
                          onTouchTap={this.props.createSwap}
                          disabled={!this.props.hasDate()}/>
        );
    }
}


export default CreateSwap;
