import React, { Component } from 'react';
import querystring from 'querystring';
import SwipeCard from './SwipeCard';
import fixtures from '../utils/fixtures.js';

const query = querystring.parse(window.location.search.slice(1));

const numberOfSlides = parseInt(query.slidesNum, 10) || 20;
const paneNodes = Array.apply(null, Array(fixtures.users.length)).map((_, i) => {
    return (
        <div key={i}>
            <div className="item">{fixtures.users[i].name}</div>
        </div>
    );
});

const startSlide = parseInt(query.startSlide, 10) || 0;
const swipeOptions = {
    startSlide: startSlide < paneNodes.length && startSlide >= 0 ? startSlide : 0,
    auto: parseInt(query.auto, 10) || 0,
    speed: parseInt(query.speed, 10) || 300,
    disableScroll: query.disableScroll === 'true',
    continuous: query.continuous === 'true',
    callback() {
        console.log('slide changed');
    },
    transitionEnd() {
        console.log('ended transition');
    },
};

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
            preferences: {
                "netflix": TRUE,
                "amazon": FALSE,
                "hulu": FALSE,
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
                {[target]: prevState.preferences[target] * - 1},
            );

            let out = {
                users: prevState.users,
                preferences: newPrefs,
            };

            return out;
        });
    }

    render() {
        const { preferences } = this.state;
        console.log(this.state);

        return (
            <div className="center">
                <h1>Couch Potatoes App</h1>

                <div className="center prefs">
                        <label><input type="checkbox" value="netflix" checked={preferences.netflix === TRUE} onChange={this.handleChange} />Netflix</label>
                        <label><input type="checkbox" value="amazon" checked={preferences.amazon === TRUE} onChange={this.handleChange} />Amazon</label>
                        <label><input type="checkbox" value="hulu" checked={preferences.hulu === TRUE} onChange={this.handleChange} />Hulu</label>
                </div>

                <SwipeCard ref={reactSwipe => this.reactSwipe = reactSwipe} className="mySwipe" swipeOptions={swipeOptions}>
                    { paneNodes }
                </SwipeCard>

                <div>
                    <button type="button" onClick={this.prev}>Prev</button>
                    <button type="button" onClick={this.next}>Next</button>
                </div>
            </div>
        );
    }
}
