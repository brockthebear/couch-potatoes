import React, { Component } from 'react';
import Helmet from 'react-helmet';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Helmet defaultTitle="Couch Potatoes ❤️" titleTemplate="%s | Couch Potatoes" />

                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    <Home />
                </p>
            </div>
        );
    }
}

export default App;
