import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ListItem from 'material-ui/List/ListItem';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {muiTheme} from './ColorScheme';

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
            userBeerList: [],
            open: false
        };
    }

    handleToggle = () => this.setState({open: !this.state.open});

    componentWillMount() {
        // get the beers for this swap
        let swapId = this.state.swapId,
            // url = `http://beerswap.enservio.lan/BeerWS/api/Beer/Swap/List/V1/${swapId}`,
            url = `http://beerswap.enservio.lan/BeerWS/api/Beer/Swap/attendees/V1/${swapId}`,
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
            if (beerList && beerList instanceof Object && beerList.UserSelections && Array.isArray(beerList.UserSelections)) {
                me.setState({
                    userBeerList: beerList.UserSelections
                });
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
        const userBeers = this.state.userBeerList.slice();
        const users = userBeers.map((user) => {
            return (
                <ListItem key={user.$id}
                          primaryText={user.FirstName + ' ' + user.LastName}
                          leftAvatar={<Avatar>{user.SelectionOrder > 0 ? user.SelectionOrder : '?'}</Avatar>}
                />
            );
        });

        const userBeerList = userBeers.map((userBeer) => (
            <tr key={userBeer.BeerSelection.BeerId}>
                <td>
                    <img src= {userBeer.BeerSelection.Label} style={styles.img}/>
                </td>
                <td>
                    <span style={styles.beerName}> {userBeer.BeerSelection.BeerName}</span>
                    <span style={styles.abv}>{userBeer.BeerSelection.Abv}</span> &nbsp; | {this.getBreweryName(userBeer.BeerSelection.Brewery)}
                    <br/>
                    {userBeer.BeerSelection.BeerDescription}
                </td>
            </tr>
        ));
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <img src="images/logo.png" className="logo-sm" />
                    <h1>Beer List</h1>
                    <div>
                        <RaisedButton
                            label="Draft Order"
                            onTouchTap={this.handleToggle}
                        />
                        <Drawer open={this.state.open} openSecondary={true} style={styles.list}>
                            <Subheader style={styles.container}>Users</Subheader>
                            {users}
                        </Drawer>
                    </div>
                    <table  style={styles.list}>
                        <tbody>
                        {userBeerList}
                        </tbody>
                    </table>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default BeerList;
