import React, { Component, PropTypes } from 'react';
import path from 'path';
import _Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import { NavLink, Route } from 'react-router-dom';

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
                { this.renderNavItems() }
                { !authUser || !authUser.id || authUser.isFetching ?
                    null
                    : this.renderAuthUserNav()
                }
            </_Navbar>
        );
    }

    renderNavItems() {
        return (
            <div>
                <Route path="/home" component={({ match }) => (
                    <Nav>
                        <li>
                            <NavLink to='#'>
                                <span>Home</span>
                            </NavLink>
                        </li>
                    </Nav>
                )} />
            </div>
        );
    }
}
