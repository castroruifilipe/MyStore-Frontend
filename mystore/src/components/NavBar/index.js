import React, { Component } from 'react';
import { Navbar, Nav, NavbarBrand, NavbarToggler, NavItem, Collapse, Col, Row, Container, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import SearchBar from './components/SearchBar';
import './style.css';


class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar className="myNavBar" dark expand="md">
                <NavbarBrand className="ml-5 mr-5">
                    MyStore
                    {/* <Link /> */}
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <div className="searchgroup">
                        <SearchBar />
                    </div>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink>Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>Registar</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavBar;