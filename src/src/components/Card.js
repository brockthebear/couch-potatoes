import React, { Component } from 'react';
import fixtures from '../utils/fixtures.js';
import * as images from '../assets';

const TRUE = 1;
const FALSE = -1;

export default class SwipeList extends Component {
    constructor(props) {
        super(props);

        this.removeItem = this.removeItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkboxes = this.checkboxes.bind(this);

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
        console.log(this.state.users);
        let nextUsers = {};
        Object.keys(this.state.users).forEach(user => {
            console.log(user);
            if (user !== keyOfUserToRemove) {
                console.log('nextUsers[user]: ', nextUsers[user]);
                console.log('this.state.users[user]: ', this.state.users[user]);
                nextUsers[user] = this.state.users[user];
            }
        });

        this.setState({ users: nextUsers });
        console.log(this.state.users);
        // this.addImage();
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
            )
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

class Card extends Component {
    constructor(props) {
        super(props);

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

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
        let { left, right, velocity, beingTouched } = this.state;

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
            console.log('this.state.left: ', this.state.left);
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
        this.handleStart(touchStartEvent.targetTouches[0].clientX);
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

    render() {
        return (
            <div>
                <li
                    className={this.props.className}
                    style={{height: this.state.height + 'px', transition: 'height 250ms ease-in-out'}}
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={() => this.handleTouchEnd()}
                    onMouseDown={this.handleMouseDown}
                    onMouseMove={this.handleMouseMove}
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
