import React, { Component, PropTypes } from 'react';
import querystring from 'querystring';
import SwipeCard from './SwipeCard';

// if (!!isClient) {
//     const query = querystring.parse(window.location.search.slice(1));
// } else {
//     const query = {
//         slidesNum: 20,
//         startSlide: 0,
//         auto: 0,
//         speed: 300,
//         disableScroll: false,
//         continuous: true,
//     };
// }

const query = {
    slidesNum: 20,
    startSlide: 0,
    auto: 0,
    speed: 300,
    disableScroll: false,
    continuous: true,
};

const numberOfSlides = parseInt(query.slidesNum, 10) || 20;
const paneNodes = Array.apply(null, Array(numberOfSlides)).map((_, i) => {
    return (
        <div key={i}>
            <div className="item">{i}</div>
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
    }
}

export default class Card extends Component {
    constructor(props, context) {
        super(props, context);

        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
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
                <h2>Open this page from a mobile device.</h2>

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
