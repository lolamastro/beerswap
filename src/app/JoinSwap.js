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
        this.onDontKnowBeer = this.onDontKnowBeer.bind(this);
        this.handleBeerInput = this.handleBeerInput.bind(this);

        this.state = {
            userId: userId,
            swapId: swapId,
            suggestions: ['Pabst', 'Sam Adams', 'Corona']
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
        if (txtValue.length == 3) {
            // let url = 'http://api.brewerydb.com/v2/search?type=beer&format=json&key=172feb1658d38aa1a686ccb4848bf82b&q=' + txtValue;
            // let me = this;
            // fetch(url, {
            //     // mode: 'no-cors',
            //     method: 'get'
            // }).then(function (response) {
            //         return response.json();
            //
            // }).then(setBeers);
            //
            // function setBeers(beers) {
            //     debugger;
            //     me.setState({
            //         suggestions: beers
            //     });
            // }
        }
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
                    <BeerAutoComplete suggestions={this.state.suggestions} handleUpdateInput={this.handleBeerInput} />
                    <ChooseBeerSubmitButton onSelectBeer={this.onSelectBeer} hasBeer={this.hasBeer}/>
                    <br/>
                    <p style={styles.instruction}>If you don't know yet, just return to this page and tell us later.</p>
                    <BeerGridList />
                </div>
            </MuiThemeProvider>
        );
    }
}

class BeerAutoComplete extends React.Component {
    render() {
        return (
            <AutoComplete id="beerToBring" dataSource={this.props.suggestions} onUpdateInput={this.props.handleUpdateInput} filter={(searchText: '', key: '') => true} />
        );
    }
}

class ChooseBeerSubmitButton extends React.Component {
    render() {
        return (
            <RaisedButton label="OK"
                          primary={true}
                          style={styles.chooseBeerButton}
                          onTouchTap={this.props.onSelectBeer}/>
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

    handleToggle = (event, toggle) => {
        this.setState({expanded: toggle});
    };

    handleExpand = () => {
        this.setState({expanded: true});
    };

    handleReduce = () => {
        this.setState({expanded: false});
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
