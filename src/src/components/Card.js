import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import SwipeCard from './SwipeCard';
import fixtures from '../utils/fixtures.js';

const TRUE = 1;
const FALSE = -1;

const RIGHT = '-1';
const LEFT = '+1';

export default class Card extends Component {
    constructor(props, context) {
        super(props, context);

        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.swiping = this.swiping.bind(this);
        this.swiped = this.swiped.bind(this);
        this.swipingLeft = this.swipingLeft.bind(this);
        this.swipedUp = this.swipedUp.bind(this);
        this.onSwiped = this.onSwiped.bind(this);

        this.state = {
            users: fixtures.users,
            userIdx: 0,
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

    swiping(e, deltaX, deltaY, absX, absY, velocity) {
        console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity);
    }

    swipingLeft(e, absX) {
        console.log("You're Swiping to the Left...", e, absX);
    }

    swiped(e, deltaX, deltaY, isFlick, velocity) {
        console.log("You Swiped...", e, deltaX, deltaY, isFlick, velocity);
    }

    swipedUp(e, deltaY, isFlick) {
        console.log("You Swiped Up...", e, deltaY, isFlick);
    }

    onSwiped(direction) {
        const change = direction === RIGHT ? RIGHT : LEFT;
        const adjustedIdx = this.state.userIdx + Number(change);
        console.log('adjusted idx: ', adjustedIdx);
        let newIdx;
        if (adjustedIdx >= this.state.users.length) {
            newIdx = 0;
        } else if (adjustedIdx < 0) {
            newIdx = this.state.users.length - 1;
        } else {
            newIdx = adjustedIdx;
        }

        this.setState(prevState => {
            return {
                userIdx: newIdx,
                ...prevState,
            };
        });
    }

    // render() {
    //     const { userIdx = 0 } = this.state;
    //     console.log(this.state);
    //
    //     return (
    //         <div className="swipeContainer">
    //             <div>User: {userIdx + 1}</div>
    //             <Swipeable
    //                 className="swipe"
    //                 trackMouse
    //                 style={{ touchAction: 'none' }}
    //                 preventDefaultTouchmoveEvent
    //                 onSwipedLeft={() => this.onSwiped(LEFT)}
    //                 onSwipedRight={() => this.onSwiped(RIGHT)}>
    //                     <div>
    //                         <button onClick={() => this.onSwiped(LEFT)}>Left</button>
    //                         <button onClick={() => this.onSwiped(RIGHT)}>Right</button>
    //                     </div>
    //                 </Swipeable>
    //         </div>
    //     );
    // }

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

                <Swipeable
                    onSwiping={this.swiping}
                    onSwipingLeft={this.swipingLeft}
                    onSwiped={this.swiped}
                    onSwipedUp={this.swipedUp}>
                    Swipe me!
                </Swipeable>

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
