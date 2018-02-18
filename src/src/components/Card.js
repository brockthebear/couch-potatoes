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

export default class Card extends Component {
    constructor(props, context) {
        super(props, context);

        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.state = {
            users: fixtures.users,
            preferences: {
                netflix: true,
                amazon: true,
                hulu: false,
            },
        };
    }

    next() {
        this.reactSwipe.next();
    }

    prev() {
        this.reactSwipe.prev();
    }

    render() {
        return (
            <div className="center">
                <h1>Couch Potatoes App</h1>

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
