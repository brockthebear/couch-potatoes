import React, { Component } from "react";
import { Helmet } from "react-helmet";

export default class App extends Component {
    render() {
        return (
            <div className="app">
                <Helmet defaultTitle="Couch Potatoes ❤️" titleTemplate="%s">
                  <meta property="og:title" content="Couch Potatoes" />
                </Helmet>

                <div className="app-inner">
                    App Inner!
                </div>
          </div>
        );
    }
}
