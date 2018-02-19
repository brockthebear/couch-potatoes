import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card, { SwipeList } from './components/Card';

class App extends Component {
    render() {
        return (
            <div className="application">
                <header className="header">
                    <img src={logo} className="logo" alt="logo" />
                    <h1 className="title">Welcome to React</h1>
                </header>

                <div className="container">
                    <div className="card">
                        <SwipeList />
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

export default App;
