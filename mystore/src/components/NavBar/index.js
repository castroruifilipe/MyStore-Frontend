import React, { Component } from 'react';
import {
    Navbar, Nav, NavbarBrand, NavbarToggler, NavItem, Collapse, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Popover, PopoverHeader, PopoverBody, Card, Button, Badge
} from 'reactstrap';
import Image from 'react-image-resizer';
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
            isOpenNavBar: false,
            popoverOpen: false,
        }
    }

    toggleNavBar = () => {
        this.setState({
            isOpenNavBar: !this.state.isOpenNavBar
        });
    }

    togglePopOver = () => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    signout = () => {
        this.props.sessionStore.setAccessToken(null);
        this.props.history.push(routes.HOME);
    }

    makeRowsShoppingCart = (rows) => {
        for (let i = 0; i < 3; i++) {
            rows.push(
                <Card key={i} className="mb-2">
                    <div class="d-flex align-items-center bg-light">
                        <div>
                            <Image src="https://i.imgur.com/IpEsYSH.jpg" height={60} width={60} />
                        </div>
                        <div className="col p-2 d-flex justify-content-between" style={{ minWidth: '190px' }}>
                            <div>
                                <span className="d-block">Descrição do produto</span>
                                <span className="text-success">20€</span>
                            </div>
                            <Button size="sm" color="danger" style={{ height: '30px' }} className="ml-1">X</Button>
                        </div>
                    </div>
                </Card>
            );
        }
    }

    render() {
        let rowsShoppingCart = [];
        this.makeRowsShoppingCart(rowsShoppingCart);

        let navItemConta = (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink onClick={() => this.props.history.push(routes.LOGIN)}>Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={() => this.props.history.push(routes.REGISTAR)}>Registar</NavLink>
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
                            <DropdownItem onClick={() => this.props.history.push(routes.ENCOMENDAS)}>
                                Encomendas
                            </DropdownItem>
                            <DropdownItem onClick={ () => {this.props.history.push(routes.CONTA)}}>
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
            <div>
                <Navbar className="myNavBar" dark expand="md">
                    <NavbarBrand className="ml-5 mr-5" onClick={() => this.props.history.push(routes.HOME)} style={{cursor:"pointer"}}>
                        MyStore
                </NavbarBrand>
                    <Collapse isOpen={this.state.isOpenNavBar} navbar>
                        <div className="searchgroup">
                            <SearchBar />
                        </div>

                        <Nav className="ml-auto navLinkHidden" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Produtos p/ Categoria
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => {this.props.history.push(routes.LISTA_PRODUTOS)}}>
                                        Bebidas
                                    </DropdownItem>
                                    <DropdownItem onClick={() => this.props.history.push(routes.LISTA_PRODUTOS)}>
                                        Roupa
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink>Novidades</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>Promoções</NavLink>
                            </NavItem>
                        </Nav>

                        {navItemConta}
                    </Collapse>
                    <Nav className="ml-3 mr-2" navbar>
                        <NavItem id="shoppingCart" onClick={this.togglePopOver}>
                            <IoAndroidCart size="30" className="pt-2" />
                            <Badge color="success" pill style={{ marginLeft: '-9px' }}>{rowsShoppingCart.length}</Badge>
                        </NavItem>
                    </Nav>
                    <NavbarToggler onClick={this.toggleNavBar} />
                </Navbar>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target="shoppingCart" toggle={this.togglePopOver}>
                    <PopoverHeader className="d-flex justify-content-between">
                        <span>Carrinho</span>
                        <span className="text-success">20€00</span>
                    </PopoverHeader>
                    <PopoverBody>
                        {rowsShoppingCart}
                        <Button size="sm" color="success" block className="mt-4">Checkout</Button>
                    </PopoverBody>
                </Popover>
            </div>

        );
    }
}

export default compose(
    withRouter,
    inject('sessionStore'),
    observer
)(NavBar);
