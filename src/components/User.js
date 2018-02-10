import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class Users extends Component {
    static propTypes = {
        EditUser: PropTypes.func,
        match: PropTypes.object,
    };

    render() {
        // const { EditUser, match } = this.props;
        console.log('render Users');

        return (
            <div>
                <Helmet title="Users" />
                <h1>
                    Users
                </h1>
            </div>
        );
    }
}
