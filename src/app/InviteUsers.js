import React, {Component} from 'react';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory } from 'react-router';

const styles = {
  container: {
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class InviteUsers extends Component {
  constructor(props, context) {
      super(props, context);

    this.hasSelectedUsers = this.hasSelectedUsers.bind(this);
    this.handleInviteUsers = this.handleInviteUsers.bind(this);
    this.handleSelectedUserChange = this.handleSelectedUserChange.bind(this);
    this.getAvailableUsers = this.getAvailableUsers.bind(this);

    this.state = {
      selectedUsers: [],
        availableUsers: [
            {name: 'John', id: 1},
            {name: 'Lola', id: 2},
            {name: 'Matt', id: 3}
        ]
    };
  }


    componentDidMount() {
        //TODO: get the users here
        fetch('http://dev03.contentsexpress.lan/Claimsws/api/Lookup/LookupTypes/V1').then(function(response) {
            return response.json();
        }).then(function(j) {
            console.log(j);
        });
    }

    getAvailableUsers = () => {
        return this.state.availableUsers;
    }
    hasSelectedUsers = () => {
        return this.state.selectedUsers.length > 0;
    }

    handleInviteUsers = () => {
        let selectedUsers = this.state.selectedUsers;
        // validate the date
        if (selectedUsers.length === 0) {
          alert('No selected users');
        }
        this.props.router.push('/swapcreated');
    }

    handleSelectedUserChange = (e, checked) => {
        let userId = e.target.id,
            selectedUsers = this.state.selectedUsers.slice();

        if (checked) {
            selectedUsers.push(userId);
        } else {
            let idx = selectedUsers.indexOf(userId);
            selectedUsers.splice(idx, 1);
        }

        this.setState({
            selectedUsers: selectedUsers
        });
    }

  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <h1>Invite Users to Beer Swap</h1>
            <InviteList users={this.getAvailableUsers()} handleSelectedUserChange={this.handleSelectedUserChange} />
            <InviteUsersButton handleInviteUsers={this.handleInviteUsers} hasSelectedUsers={this.hasSelectedUsers}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

class InviteList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.users = props.users;
    }

    render() {
        const users = this.users.map((user) => {
            return (
                <ListItem key={user.id}
                    leftCheckbox={<Checkbox id={user.id} onCheck={this.props.handleSelectedUserChange} />}
                    primaryText={user.name}
                />
            );
        });

        return (
            <List>
                {users}
            </List>
        );
    }
}

class InviteUsersButton extends React.Component {
    render() {
        return (
            <RaisedButton label="Invite Selected Users"
                          secondary={true}
                          onTouchTap={this.props.handleInviteUsers}
                          disabled={!this.props.hasSelectedUsers()}/>
        );
    }
}

export default InviteUsers;
