/**
 * The UserList component renders a list of users that match the filters set
 * by the user.
 *
 * @module components/UserList
 */

import React, { Component } from 'react';
import fixtures from '../utils/fixtures.js';
import Card from './Card';

const TRUE = 1;
const FALSE = -1;

export default class UserList extends Component {
    constructor(props) {
        super(props);

        this.removeItem = this.removeItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkboxes = this.checkboxes.bind(this);

        this.state = {
            users: fixtures.users,
            preferences: {
                netflix: TRUE,
                amazon: TRUE,
                hulu: FALSE,
            },
        };
    }

    filterUsers() {
        const { preferences } = this.state;

        const users = fixtures.users.map(user => {
            for (var setting in preferences) {
                if (!!user[setting] && (preferences[setting] === TRUE)) {
                    return user;
                }
            }
        }).filter(user => user !== undefined);

        return users;
    }

    handleChange(e) {
        let target = e.target.value;

        this.setState(prevState => {
            let newPrefs = Object.assign(
                prevState.preferences,
                {[target]: prevState.preferences[target] * -1},
            );

            let out = {
                preferences: newPrefs,
                ...prevState,
            };

            return out;
        });
    }

    removeItem(keyOfUserToRemove) {
        let nextUsers = {};
        Object.keys(this.state.users).forEach(user => {
            if (user !== keyOfUserToRemove) {
                nextUsers[user] = this.state.users[user];
            }
        });

        this.setState({ users: nextUsers });
    }

    checkboxes() {
        const { preferences } = this.state;

        return (
            <div className="center prefs">
                <ul>
                    <li>
                        <label><input type="checkbox" value="netflix" checked={preferences.netflix === TRUE} onChange={this.handleChange} />Netflix</label>
                    </li>
                    <li>
                        <label><input type="checkbox" value="amazon" checked={preferences.amazon === TRUE} onChange={this.handleChange} />Amazon</label>
                    </li>
                    <li>
                        <label><input type="checkbox" value="hulu" checked={preferences.hulu === TRUE} onChange={this.handleChange} />Hulu</label>
                    </li>
                </ul>
                <p>Swipe left to move down your list of matches!</p>
            </div>
        );
    }

    render() {
        const users = this.filterUsers();

        if (!users.length) {
            return (
                <div>
                    { this.checkboxes() }
                    <h1>No users found!</h1>
                </div>
            );
        }

        return (
            <div>
                { this.checkboxes() }
                <ul className="swipeList">
                    {users.map((user, i) => {
                        return (
                            <Card className={`center swipeItem swipeItem-${i}`} key={`swipeItem-${i}`} onRemoval={() => this.removeItem(i)}>
                                <img src={user.image} />
                                <div className="name">
                                    {user.name}
                                </div>
                                <div className="bio">
                                    {user.bio}
                                </div>
                            </Card>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
