import React, {Component} from 'react';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {muiTheme} from './ColorScheme';

var AppConfig = require('AppConfig');

const styles = {
    container: {

    },
    logoContainer: {
        textAlign: 'center'
    },
    selectAllCheck: {
        paddingLeft: 14
    }
};

class InviteUsers extends Component {
    constructor(props, context) {
        super(props, context);

        let swapId = this.props.params['swapId'];

        this.hasSelectedUsers = this.hasSelectedUsers.bind(this);
        this.handleInviteUsers = this.handleInviteUsers.bind(this);
        this.handleSelectedUserChange = this.handleSelectedUserChange.bind(this);
        this.getAvailableUsers = this.getAvailableUsers.bind(this);
        this.isChecked = this.isChecked.bind(this);

        this.state = {
            selectedUsers: [],
            availableUsers: [],
            swapId: swapId,
            select: true
        };
    }


    componentWillMount() {
        let me = this;
        fetch(AppConfig.ApiBaseUrl + 'User/V1').then(function (response) {
            return response.json();
        }).then(setUsers);

        function setUsers(users) {
            me.setState({
                availableUsers: users,
                selectedUsers: me.state.select ? users.map(user => user.UserId) : []
            });
        }
    }


    handleToggle = (e, checkedState) => {
        this.setState({select: checkedState});
        if (checkedState) {
            let allUsers = this.state.availableUsers.slice();
            this.setState({
                selectedUsers: allUsers.map(user => user.UserId)
            });
        } else {
            this.setState({
                selectedUsers: []
            });
        }
    }

    isChecked = (userId) => {
        let selectedUsers = this.state.selectedUsers.slice();
        return selectedUsers.filter(user => user == userId).length > 0;
    }

    getAvailableUsers = () => {
        return this.state.availableUsers;
    }
    hasSelectedUsers = () => {
        return this.state.selectedUsers.length > 0;
    }

    handleInviteUsers = () => {
        let me = this;
        let selectedUsers = this.state.selectedUsers;
        if (selectedUsers.length === 0) {
            alert('No selected users');
        }

        let swapId = this.state.swapId;
        let url = AppConfig.ApiBaseUrl + 'Beer/Swap/Invite/V1/' + swapId;
        fetch(url, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            method: 'post',
            body: JSON.stringify(selectedUsers)
        }).then(function () {
            me.props.router.push('/swapcreated/' + swapId);
        });
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
                    <div style={styles.logoContainer}>
                    <img src="images/logo.png" className="logo-sm" />
                    </div>
                    <h1>Invite Users to Beer Swap</h1>
                    <Checkbox onCheck={this.handleToggle} checked={this.state.select} style={styles.selectAllCheck} label="Select all/none"/>
                    <hr/>
                    <InviteList users={this.getAvailableUsers()}
                                isChecked={this.isChecked}
                                handleSelectedUserChange={this.handleSelectedUserChange}/>
                    <InviteUsersButton handleInviteUsers={this.handleInviteUsers}
                                       hasSelectedUsers={this.hasSelectedUsers}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

class InviteList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props = props;
    }

    render() {
        const users = this.props.users.map((user) => {
            return (
                <ListItem key={user.UserId}
                          leftCheckbox={<Checkbox id={user.UserId} checked={this.props.isChecked(user.UserId)} onCheck={this.props.handleSelectedUserChange}/>}
                          primaryText={user.FirstName + ' ' + user.LastName}
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
                          primary={true}
                          onTouchTap={this.props.handleInviteUsers}
                          disabled={!this.props.hasSelectedUsers()}/>
        );
    }
}

export default InviteUsers;
