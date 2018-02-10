import React, { Component } from "react";
import { Helmet } from "react-helmet";

import {
  getSection,
  getNextSection,
  getPreviousSection,
} from "../utils/Sections";

import { getTitle } from "../config";

export default class App extends Component {
    state = {
        showSidebar: true,
        showMenu: false,
    };

    componentWillReceiveProps(nextProps) {
        const { showMenu } = this.state;

        if (showMenu && nextProps.location.pathname !== this.props.location.pathname) {
            this.setState({ showMenu: false });
        }
    }

    componentWillUpdate(nextProps) {
        const { location } = nextProps;
        const { pathname } = location;

        const nextSection = getNextSection(pathname);

        // Pre-load the next section
        if (nextSection) {
            const { componentName } = nextSection;

            System.import(`../components/${componentName}`);
        }
    }

    render() {
        const { children, location } = this.props;
        const { showSidebar, showMenu } = this.state;
        const { pathname } = location;

        const section = getSection(pathname);
        const url = `http://www.couch-potatoes-app.herokuapp.com/${section ? section.slug : ""}`;
        const title = section && (section.fullTitle || section.title);

        const cloned = React.Children.map(children, child =>
            React.cloneElement(child, { title })
        );

        return (
            <div className="app">
                <Helmet>
                  <title>
                    {getTitle(title)}
                  </title>
                  <meta property="og:title" content={getTitle(title)} />
                  <meta property="og:url" content={url} />
                </Helmet>

                <div className="app-inner">
                    { cloned }
                </div>
          </div>
        );
    }
}
