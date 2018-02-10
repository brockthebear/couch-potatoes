import React, { Component, PropTypes } from 'react';
import path from 'path';
import _Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import { NavLink, Route } from 'react-router';

export default class Navbar extends Component {
    render() {
        return (
            <_Navbar inverse staticTop collapseOnSelect fluid className="main-nav">
                <_Navbar.Header>
                    <_Navbar.Brand>
                        <NavLink className="logo" to="/">
                            <img src="home.svg" title="Home" alt="Home"/>
                            <span> Couch Potatoes ❤️</span>
                        </NavLink>
                    </_Navbar.Brand>
                    <_Navbar.Toggle />
                </_Navbar.Header>
            </_Navbar>
        );
    }
}
