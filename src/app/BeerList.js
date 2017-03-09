import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {muiTheme} from './ColorScheme';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 20,
    },
    list: {
        textAlign: 'left',
        margin: 40
    },
    img: {
        maxHeight: 150,
        paddingRight: 16
    },
    beerName: {
        fontSize: 'larger',
        fontWeight: 'bold'
    },
    abv: {
        fontSize: 'larger',
        fontStyle: 'italic'
    }

};

class BeerList extends Component {
    constructor(props, context) {
        super(props, context);

        let swapId = this.props.params['swapId'];

        this.state = {
            swapId: swapId,
            beerList: []
        };
    }

    componentWillMount() {
        // get the beers for this swap
        let swapId = this.state.swapId,
            url = `http://beerswap.enservio.lan/BeerWS/api/Beer/Swap/List/V1/${swapId}`,
            me = this;

        fetch(url, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            method: 'get'
        }).then(function (response) {
            return response.json();
        }).then(setBeerList);

        function setBeerList (beerList) {
            if (Array.isArray(beerList)) {
                me.setState({
                    beerList: beerList
                })
            }
        }
    }

    getBreweryName(brewery) {
        let bName = brewery.Name || '';
        if (brewery.Website) {
            return (
                <a href={brewery.Website} target="_">{bName}</a>
            )
        } else {
            return bName;
        }
    }

    render() {
        const beers = this.state.beerList.slice();

        const beerList = beers.map((beer) => (
            <tr key={beer.BeerId}>
                <td>
                    <img src= {beer.Label} style={styles.img}/>
                </td>
                <td>
                    <span style={styles.beerName}> {beer.BeerName}</span> <span style={styles.abv}>{beer.Abv}</span> &nbsp; | {this.getBreweryName(beer.Brewery)}
                    <br/>
                    {beer.BeerDescription}
                </td>
            </tr>
        ));
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <img src="images/logo.png" className="logo-sm" />
                    <h1>Beer List</h1>
                    <table  style={styles.list}>
                        <tbody>
                        {beerList}
                        </tbody>
                    </table>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default BeerList;
