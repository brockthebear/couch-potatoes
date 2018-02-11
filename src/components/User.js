import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class User extends Component {
    static propTypes = {
        EditUser: PropTypes.func,
        match: PropTypes.object,
    };

    render() {
        // const { EditUser, match } = this.props;
        console.log('render User');

        return (
            <div>
                <Helmet title="User" />
                <h1>
                    User
                </h1>
            </div>
        );
    }
}
