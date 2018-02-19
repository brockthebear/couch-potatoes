import React, { Component } from 'react';
import fixtures from '../utils/fixtures.js';

const TRUE = 1;
const FALSE = -1;

const RIGHT = '-1';
const LEFT = '+1';

export default class Card extends Component {
    constructor(props) {
        super(props);

        // this.handleChange = this.handleChange.bind(this);
        this.state = {
            left: 0,
            originalOffset: 0,
            velocity: 0,
            timeOfLastDragEvent: 0,
            touchStartX: 0,
            prevTouchX: 0,
            beingTouched: false,
            height: 0,
            intervalId: null,
        };
    }

    componentDidMount() {
        window.setTimeout(() => this.setState({height: 350}), 50);
    }

    animateSlidingToZero() {
        let { left, velocity, beingTouched } = this.state;

        if (!beingTouched && left < -0.01) {
            velocity += 10 * 0.033;
            left += velocity;
            if (left < -350) {
                window.clearInterval(this.state.intervalId);
                this.handleRemoveSelf();
            }
            this.setState({ left, velocity });
        } else if (!beingTouched) {
            left = 0;
            velocity = 0;
            window.clearInterval(this.state.intervalId);
            this.setState({
                left,
                velocity,
                intervalId: null,
                originalOffset: 0,
            });
        }
    }

    handleRemoveSelf() {
        this.setState({ height: 0 });
        window.setTimeout(() => this.props.onRemoval(), 250);
    }

    handleStart(clientX) {
        if (this.state.intervalId !== null) {
            window.clearInterval(this.state.intervalId);
        }
        this.setState({
            originalOffset: this.state.left,
            velocity: 0,
            timeOfLastDragEvent: Date.now(),
            touchStartX: clientX,
            beingTouched: true,
            intervalId: null,
        });
    }

    handleMove(clientX) {
        if (this.state.beingTouched) {
            const touchX = clientX;
            const currTime = Date.now();
            const elapsed = currTime - this.state.timeOfLastDragEvent;
            const velocity = 20 * (touchX - this.state.prevTouchX) / elapsed;
            let deltaX = touchX - this.state.touchStartX + this.state.originalOffset;
            if (deltaX < -350) {
                this.handleRemoveSelf();
            } else if (deltaX > 0) {
                deltaX = 0;
            }
            this.setState({
                left: deltaX,
                velocity,
                timeOfLastDragEvent: currTime,
                prevTouchX: touchX,
            });
        }
    }

    handleEnd() {
        this.setState({
            velocity: this.state.velocity,
            touchStartX: 0,
            beingTouched: false,
            intervalId: window.setInterval(this.animateSlidingToZero.bind(this), 33),
        });
    }

    handleTouchStart(touchStartEvent) {
        touchStartEvent.preventDefault();
        this.handleMotoinStart(touchStartEvent.targetTouches[0].clientX);
    }

    handleTouchMove(touchMoveEvent) {
        this.handleMove(touchMoveEvent.targetTouches[0].clientX);
    }

    handleTouchEnd() {
        this.handleEnd();
    }

    handleMouseDown(mouseDownEvent) {
        mouseDownEvent.preventDefault();
        this.handleStart(mouseDownEvent.clientX);
    }

    handleMouseMove(mouseMoveEvent) {
        this.handleMove(mouseMoveEvent.clientX);
    }

    handleMouseUp() {
        this.handleEnd();
    }

    handleMouseLeave() {
        this.handleMouseUp();
    }

    next() {
        this.reactSwipe.next();
    }

    prev() {
        this.reactSwipe.prev();
    }

    render() {
        return (
            <div>
                <li
                    className="center swipeItem"
                    style={{height: this.state.height + 'px', transition: 'height 250ms ease-in-out'}}
                    onTouchStart={touchStartEvent => this.handleTouchStart(touchStartEvent)}
                    onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}
                    onTouchEnd={() => this.handleTouchEnd()}
                    onMouseDown={mouseDownEvent => this.handleMouseDown(mouseDownEvent)}
                    onMouseMove={mouseMoveEvent => this.handleMouseMove(mouseMoveEvent)}
                    onMouseUp={() => this.handleMouseUp()}
                    onMouseLeave={() => this.handleMouseLeave()}>
                    <div
                        className="swipeItem-content"
                        style={{left: this.state.left + 'px'}}>
                        { this.props.children }
                    </div>
                </li>
            </div>
        );
    }
}


function UserCards({ users }) {
    return users.map((user, i) => (
        <div key={i}>
            <div className="item">{user.name}</div>
        </div>
    ));
}

export class SwipeList extends Component {
    constructor(props) {
        super(props);

        this.removeItem = this.removeItem.bind(this);
        this.addImage = this.addImage.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            counter: 1,
            items: {
                [0]: 'http://lorempixel.com/350/350/',
            },
            users: fixtures.users,
            matchedUsers: [],
            preferences: {
                netflix: TRUE,
                amazon: TRUE,
                hulu: FALSE,
            },
        };
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

    addImage() {
        this.setState({
            counter: this.state.counter + 1,
            items: {
                ...this.state.items,
                [this.state.counter]: 'http://lorempixel.com/350/350/',
            },
        });
    }

    removeItem(keyOfItemToRemove) {
        let nextItems = {};
        Object.keys(this.state.items).forEach(itemKey => {
            if (itemKey !== keyOfItemToRemove) {
                nextItems[itemKey] = this.state.items[itemKey];
            }
        });

        this.setState({ items: nextItems });
    }

    render() {
        const { preferences } = this.state;

        return (
            <div>
                <div className="center prefs">
                    <label><input type="checkbox" value="netflix" checked={preferences.netflix === TRUE} onChange={this.handleChange} />Netflix</label>
                    <label><input type="checkbox" value="amazon" checked={preferences.amazon === TRUE} onChange={this.handleChange} />Amazon</label>
                    <label><input type="checkbox" value="hulu" checked={preferences.hulu === TRUE} onChange={this.handleChange} />Hulu</label>
                </div>
                <ul className="swipeList">
                    {Object.keys(this.state.items).map(itemKey => {
                        return (
                            <Card key={`swipeItem-${itemKey}`} onRemoval={() => this.removeItem(itemKey)}>
                                <img src={this.state.items[itemKey]} />
                            </Card>
                        );
                    }
                )}
                <button
                    className="swipeList-addButton"
                    onClick={() => this.addImage()}
                    >
                        Add image...
                    </button>
                </ul>
            </div>
        );
    }
}
