import { Router, browserHistory, applyRouterMiddleware } from "react-router";
import React, { Component } from "react";
import useScroll from "react-router-scroll/lib/useScroll";

import * as Analytics from "../utils/Analytics";
import TopLevelRoute from "./TopLevelRoute";

export default class ClientRouter extends Component {
    constructor(props, context) {
        super(props, context);

        this.onUpdate = this.onUpdate.bind(this);
    }

    onUpdate() {
        console.log('update!');
    }

    render() {
        return (
            <Router history={browserHistory} onUpdate={this.onUpdate} render={applyRouterMiddleware(useScroll())}>
                {TopLevelRoute}
            </Router>
        );
    }
}
