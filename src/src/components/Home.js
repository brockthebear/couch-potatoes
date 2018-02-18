import React, { Component } from 'react';
import { CenterLoader } from './Loader';
import Card from './Card';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="application">
                    <div className="container">
                        <Card />
                    </div>
                </div>
            </div>
        );
    }
}
