import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { CenterLoader } from './Loader';

export default class Home extends Component {
    static propTypes = {
        showMain: PropTypes.bool,
    };

    render() {
        console.log('render home');

        return (
            <div>
                <Helmet defaultTitle="Couch Potatoes ❤️" titleTemplate="%s | Couch Potatoes" />

                <div className="exact">
                    <div className="container">
                        { this.props.children }
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 copyright">
                                <span>Made with love by Brock.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
