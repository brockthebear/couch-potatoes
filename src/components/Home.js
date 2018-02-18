import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { CenterLoader } from './Loader';
import Card from './Card';

export default class Home extends Component {
    static propTypes = {
        showMain: PropTypes.bool,
    };

    render() {
        console.log('render home');
        console.log(this.props.children);

        return (
            <div>
                <Helmet defaultTitle="Couch Potatoes ❤️" titleTemplate="%s | Couch Potatoes" />

                <div className="application">
                    <div className="container">
                        <Card />
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
