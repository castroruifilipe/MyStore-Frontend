import React, { Component } from 'react';
import { Navbar, Nav, NavbarBrand, NavbarToggler, NavItem, Collapse, NavLink } from 'reactstrap';
import IoAndroidCart from 'react-icons/lib/io/android-cart';

import SearchBar from './components/SearchBar';
import * as routes from '../../constants/routes';
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
                    
                    <Nav className="ml-auto navLinkHidden" navbar>
                        <NavItem>
                            <NavLink>Novidades</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>Promoções</NavLink>
                        </NavItem>
                    </Nav>

                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href={routes.LOGIN}>Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={routes.REGISTAR}>Registar</NavLink>
                        </NavItem>
                        <NavItem>
                            <IoAndroidCart size="30" className="pt-2" />
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavBar;