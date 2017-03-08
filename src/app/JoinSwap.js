import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {muiTheme} from './ColorScheme';

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 200,
    },
};

class JoinSwap extends Component {
    constructor(props, context) {
        super(props, context);

        let userId = this.props.params['userId'];
        let swapId = this.props.params['swapId'];

        this.hasBeer = this.hasBeer.bind(this);
        this.onSelectBeer = this.onSelectBeer.bind(this);
        this.onDontKnowBeer = this.onDontKnowBeer.bind(this);

        this.state = {
            userId: userId,
            swapId: swapId
        };
    }


    hasBeer = () => {
        return !!this.state.beerId;
    }

    componentWillMount() {
        let url = 'http://beerswap.enservio.lan/BeerWS/api/Beer/Swap/Join/V1/' + this.state.swapId + '/' + this.state.userId;
        fetch(url, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            method: 'post'
        }).then(function (response) {
            return response.json();
        });
    }

    onSelectBeer() {
        debugger;
    }

    onDontKnowBeer() {
        debugger;
    }

    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <h1>Welcome!</h1>
                    <h2>What beer are you bringing?</h2>
                    <ChooseBeerSubmitButton onSelectBeer={this.onSelectBeer} hasBeer={this.hasBeer}/>
                    <DontKnowSubmitButton onDontKnowBeer={this.onDontKnowBeer}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

class ChooseBeerSubmitButton extends React.Component {
    render() {
        return (
            <RaisedButton label="OK"
                          primary={true}
                          onTouchTap={this.props.onSelectBeer}/>
        );
    }
}

class DontKnowSubmitButton extends React.Component {
    render() {
        return (
            <RaisedButton label="I don't know yet"
                          secondary={true}
                          onTouchTap={this.props.onDontKnowBeer}/>
        );
    }
}


export default JoinSwap;
