import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {muiTheme} from './ColorScheme';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 20,
    },
    instruction: {
        fontSize: 'larger'
    },
    chooseBeerButton: {
        marginLeft: 20
    }
};

const tilesData = [
    {
        img: 'http://www.material-ui.com/images/grid-list/00-52-29-429_640.jpg',
        title: 'Breakfast',
        author: 'jill111',
    },
    {
        img: 'http://www.material-ui.com/images/grid-list/burger-827309_640.jpg',
        title: 'Tasty burger',
        author: 'pashminu',
    },
    {
        img: 'http://www.material-ui.com/images/grid-list/camera-813814_640.jpg',
        title: 'Camera',
        author: 'Danson67',
    },
    {
        img: 'http://www.material-ui.com/images/grid-list/morning-819362_640.jpg',
        title: 'Morning',
        author: 'fancycrave1',
    },
    {
        img: 'http://www.material-ui.com/images/grid-list/hats-829509_640.jpg',
        title: 'Hats',
        author: 'Hans',
    },
    {
        img: 'http://www.material-ui.com/images/grid-list/honey-823614_640.jpg',
        title: 'Honey',
        author: 'fancycravel',
    },
    {
        img: 'http://www.material-ui.com/images/grid-list/vegetables-790022_640.jpg',
        title: 'Vegetables',
        author: 'jill111',
    },
    {
        img: 'http://www.material-ui.com/images/grid-list/water-plant-821293_640.jpg',
        title: 'Water plant',
        author: 'BkrmadtyaKarki',
    }
];


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
            beerId: null
        };
    }


    componentWillMount() {
        // Associate this user with this beer swap
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

    hasBeer = () => {
        return !!this.state.beerId;
    }

    handleBeerInput(txtValue, datasource) {
        if (txtValue.length >= 3) {
            let url = 'http://beerswap.enservio.lan/BeerWS/api/Beer/search/V1/' + txtValue;
            let me = this;
            fetch(url, {
                mode: 'cors',
                method: 'get'
            }).then(function (response) {
                    return response.json();
            }).then(setBeers);

            function setBeers(beers) {
                me.setState({
                    suggestions: beers
                });
            }
        } else {
            this.setState({
                suggestions: []
            });
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
            return response.json();
        }).then(function (j) {
            //TODO: change this url
            me.props.router.push('/swapcreated');
        });
    }


    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <h1>Welcome!</h1>
                    <h2>What beer are you bringing?</h2>
                    <BeerAutoComplete suggestions={this.state.suggestions} handleUpdateInput={this.handleBeerInput} onSelectBeer={this.onSelectBeer}/>
                    <ChooseBeerSubmitButton onHandleChooseBeer={this.onHandleChooseBeer} hasBeer={this.hasBeer}/>
                    <br/>
                    <p style={styles.instruction}>If you don't know yet, just return to this page and tell us later.</p>
                    <BeerGridList />
                </div>
            </MuiThemeProvider>
        );
    }
}

class BeerAutoComplete extends React.Component {

    filterBeers = (searchText, key) => {
        let match = searchText !== '' && key.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
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
            expanded: false
        }
    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    };

    render() {
        return (
            <div style={styles.root}>
                <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                    <CardHeader
                        title="Here is what others are bringing."
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <GridList
                        cellHeight={180}
                        style={styles.gridList}>
                        <Subheader>December</Subheader>
                        {tilesData.map((tile) => (
                            <GridTile
                                key={tile.img}
                                title={tile.title}
                                subtitle={<span>by <b>{tile.author}</b></span>}
                                actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
                            >
                                <img src={tile.img}/>
                            </GridTile>
                        ))}
                    </GridList>
                </Card>
            </div>
        );
    }
}
export default JoinSwap;
