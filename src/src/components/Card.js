import React, { Component } from 'react';
import querystring from 'querystring';
import SwipeCard from './SwipeCard';
import fixtures from '../utils/fixtures.js';

const TRUE = 1;
const FALSE = -1;

export default class Card extends Component {
    constructor(props, context) {
        super(props, context);

        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            users: fixtures.users,
            matchedUsers: [],
            preferences: {
                netflix: TRUE,
                amazon: TRUE,
                hulu: FALSE,
            },
        };
    }

    next() {
        this.reactSwipe.next();
    }

    prev() {
        this.reactSwipe.prev();
    }

    handleChange(e) {
        let target = e.target.value;

        this.setState(prevState => {
            let newPrefs = Object.assign(
                prevState.preferences,
                {[target]: prevState.preferences[target] * -1},
            );

            let out = {
                users: prevState.users,
                matchedUsers: prevState.matchedUsers,
                preferences: newPrefs,
            };

            return out;
        });
    }

    buildUsers() {
        const { preferences } = this.state;

        const users = fixtures.users.map((user, i) => {
            for (var setting in preferences) {
                if (!!user[setting] && (preferences[setting] === TRUE)) {
                    return user;
                }
            }
        });

        return users.filter(user => user != undefined);
    }

    render() {
        const { preferences } = this.state;
        const users = this.buildUsers();

        const startSlide = 0;
        const swipeOptions = {
            startSlide: 0,
            auto: 0,
            speed: 300,
            disableScroll: true,
            continuous: false,
            callback() {
                console.log('slide changed');
            },
            transitionEnd() {
                console.log('ended transition');
            },
        };

        return (
            <div className="center">
                <h1>Couch Potatoes App</h1>

                <div className="center prefs">
                    <label><input type="checkbox" value="netflix" checked={preferences.netflix === TRUE} onChange={this.handleChange} />Netflix</label>
                    <label><input type="checkbox" value="amazon" checked={preferences.amazon === TRUE} onChange={this.handleChange} />Amazon</label>
                    <label><input type="checkbox" value="hulu" checked={preferences.hulu === TRUE} onChange={this.handleChange} />Hulu</label>
                </div>

                <SwipeCard ref={reactSwipe => this.reactSwipe = reactSwipe} className="mySwipe" swipeOptions={swipeOptions}>
                    <UserCards users={users} />
                </SwipeCard>

                <div>
                    <button type="button" onClick={this.prev}>Prev</button>
                    <button type="button" onClick={this.next}>Next</button>
                </div>
            </div>
        );
    }
}


function UserCards({ users }) {
    return users.map((user, i) => {
        return (
            <div key={i}>
                <div className="item">{user.name}</div>
            </div>
        );
    });
}
