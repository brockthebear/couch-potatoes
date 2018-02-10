import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import Navbar from 'app/components/navbar';
import { CenterLoader } from 'app/components/Loader';

export default class Home extends Component {
    static propTypes = {
        showMain: PropTypes.bool,
    };

    render() {
        console.log('render home');
        return (
            <div>
                <Helmet defaultTitle="Couch Potatoes ❤️" titleTemplate="%s | Couch Potatoes" />

                <Navbar />

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
