import { IndexRoute, Route } from "react-router";
import React from "react";

import App from "./App";
import Home from "../components/Home";
import createProxyComponent from "./createProxyComponent";
import sections from "../utils/Sections";

const routes = sections.map(section => {
    const { slug, componentName } = section;
    console.log('section: ', section);
    const component = createProxyComponent(componentName);

    return <Route key={slug} path={slug} component={component} />;
});

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="home" component={Home} />
        {routes}
    </Route>
);
