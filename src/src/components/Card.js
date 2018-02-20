import React, { Component } from 'react';

export default class UserCard extends Component {
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
