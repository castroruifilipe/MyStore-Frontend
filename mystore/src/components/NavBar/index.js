import React, { Component } from 'react';
import {
    Navbar, Nav, NavbarBrand, NavbarToggler, NavItem, Collapse, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import IoAndroidCart from 'react-icons/lib/io/android-cart';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

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

    signout = () => {
        this.props.sessionStore.setAccessToken(null);
        this.props.history.push(routes.HOME);
    }

    render() {
        let navItemConta = (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href={routes.LOGIN}>Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href={routes.REGISTAR}>Registar</NavLink>
                </NavItem>
            </Nav>
        );
        if (this.props.sessionStore.accessToken) {
            navItemConta = (
                <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Minha conta
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem href={routes.ENCOMENDAS}>
                                Encomendas
                            </DropdownItem>
                            <DropdownItem>
                                Meus dados
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.signout}>
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            );
        }

        return (
            <Navbar className="myNavBar" dark expand="md">
                <NavbarBrand className="ml-5 mr-5" href={routes.HOME}>
                    MyStore
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

                    {navItemConta}

                    <Nav className="ml-auto navLinkHidden" navbar>
                        <NavItem>
                            <IoAndroidCart size="30" className="pt-2" />
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default compose(
    withRouter,
    inject('sessionStore'),
    observer
)(NavBar);