import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {muiTheme} from './ColorScheme';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 20,
    },
    chooseBeerButton: {
        marginLeft: 20
    }
};

class JoinSwap extends Component {
    constructor(props, context) {
        super(props, context);

        let userId = this.props.params['userId'];
        let swapId = this.props.params['swapId'];

        this.hasBeer = this.hasBeer.bind(this);
        this.onSelectBeer = this.onSelectBeer.bind(this);
        this.onHandleChooseBeer = this.onHandleChooseBeer.bind(this);
        this.handleBeerInput = this.handleBeerInput.bind(this);

        this.state = {
            userId: userId,
            swapId: swapId,
            suggestions: [],
            currentBeers: [],
            beerId: null
        };
    }

    componentWillMount() {
        // Associate this user with this beer swap
        let swapId = this.state.swapId,
            userId = this.state.userId,
            joinUrl = `http://beerswap.enservio.lan/BeerWS/api/Beer/Swap/Join/V1/${swapId}/${userId}`,
            me = this;

        fetch(joinUrl, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            method: 'post'
        }).then(function (response) {
            return response.json();
        });
    }

    hasBeer = () => {
        return !!this.state.beerId;
    }

    handleBeerInput(txtValue, datasource) {
        if (txtValue.indexOf(' ') > -1) {
            let words = txtValue.split(' ');
            if (words.length !== 0 && this.state.searchTerm !== words[0]) {
                let url = `http://beerswap.enservio.lan/BeerWS/api/Beer/search/V1/${words[0]}`;
                let me = this;
                this.setState({
                    searchTerm: words[0]
                });
                fetch(url, {
                    mode: 'cors',
                    method: 'get'
                }).then(function (response) {
                    return response.json();
                }).then(setBeers);

                function setBeers(beers) {
                    let beerState = beers || [];
                    me.setState({
                        suggestions: beerState
                    });

                }
            }
        }
    }

    onSelectBeer(beerObj) {
        let beerId = beerObj.id;
        this.setState({
            beerId: beerId
        });
    }


    onHandleChooseBeer() {
        let me = this;
        let userId = this.state.userId,
            swapId = this.state.swapId,
            beerId = this.state.beerId;

        let url = `http://beerswap.enservio.lan/BeerWS/api/Beer/Swap/User/Beer/V1/${swapId}/${userId}/${beerId}`;
        fetch(url, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            method: 'put'
        }).then(function (response) {
            me.props.router.push('/beersaved/' + swapId);
        });
    }


    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <img src="images/logo.png" className="logo-sm" />
                    <h1>Welcome!</h1>
                    <h2>What beer are you bringing?</h2>
                    <p className="instructions">
                        If you don't know yet, just return to this page and tell us later.
                    </p>
                    <p className="instructions">
                        Don't see your beer? &nbsp;
                        <a href="mailto:jskorb@enservio.com?Subject=Beer%20Swap">Email Skorb</a> and tell him what your bringing.
                    </p>
                    <br/>
                    <BeerAutoComplete suggestions={this.state.suggestions} handleUpdateInput={this.handleBeerInput} onSelectBeer={this.onSelectBeer}/>
                    <ChooseBeerSubmitButton onHandleChooseBeer={this.onHandleChooseBeer} hasBeer={this.hasBeer}/>
                    <br/>
                    <br/>
                    <BeerGridList swapId={this.state.swapId}  />
                </div>
            </MuiThemeProvider>
        );
    }
}

class BeerAutoComplete extends React.Component {

    filterBeers = (searchText, key) => {
        let match = searchText !== '' && key.toLowerCase().indexOf(searchText.trim().toLowerCase()) > -1;
        return match;
    }

    render() {
        const dataSourceConfig = {
            text: 'name',
            value: 'id',
        };

        return (
            <AutoComplete id="beerToBring" dataSource={this.props.suggestions} onUpdateInput={this.props.handleUpdateInput}
                          filter={this.filterBeers}
                          onNewRequest={this.props.onSelectBeer}
                          dataSourceConfig={dataSourceConfig}
                          hintText="Enter a beer name"/>
        );
    }
}

class ChooseBeerSubmitButton extends React.Component {
    render() {
        return (
            <RaisedButton label="OK"
                          primary={true}
                          style={styles.chooseBeerButton}
                          onTouchTap={this.props.onHandleChooseBeer}/>
        );
    }
}


class BeerGridList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            expanded: false,
            swapId: this.props.swapId,
            currentBeers: []
        }
    }

    componentWillMount() {
        // Get the beers associated with this beer swap
        let me = this,
            swapId = this.state.swapId,
            getBeersUrl = `http://beerswap.enservio.lan/BeerWS/api/Beer/Swap/List/V1/${swapId}`;
        fetch(getBeersUrl, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            method: 'get'
        }).then(function (response) {
            return response.json();
        }).then(setCurrentBeers);

        function setCurrentBeers(beers) {
            if (Array.isArray(beers)) {
                me.setState({
                    currentBeers: beers
                });
            }
        }
    }

    render() {
        return (
            <div style={styles.root}>
                <Card >
                    <CardHeader
                        title="Here is what others are bringing."
                    />
                    <GridList
                        cellHeight={180}
                        style={styles.gridList}>
                        {this.state.currentBeers.map((beer) => (
                            <GridTile
                                key={beer.BeerId}
                                title={beer.BeerName}
                                actionIcon={<IconButton><StarBorder color="white"/></IconButton>} >
                                <img src={beer.Label} />
                            </GridTile>
                        ))}
                    </GridList>
                </Card>
            </div>
        );
    }
}
export default JoinSwap;
