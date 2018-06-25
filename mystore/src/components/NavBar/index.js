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
import { Link } from 'react-router-dom';

import { formatterPrice } from '../../constants/formatters';
import SearchBar from './components/SearchBar';
import * as routes from '../../constants/routes';
import * as servicesCategorias from '../../services/categorias';
import * as servicesCarrinho from '../../services/carrinho';

import './style.css';

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categorias: [],
            isOpenNavBar: false,
            popoverOpen: false,
        }
    }

    componentWillMount() {
        servicesCategorias.getCategorias()
            .then(response => {
                this.setState({ categorias: response.data });
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                    this.setState({ error: error.response.data.message });
                } else {
                    console.error(error);
                }
            });
        servicesCarrinho.getCarrinho()
            .then(response => {
                this.props.carrinhoStore.setCarrinho(response.data);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                    this.setState({ error: error.response.data.message });
                } else {
                    console.error(error);
                }
            });
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

    remover = (codigo) => {
        servicesCarrinho.removeLinha(codigo)
            .then(response => {
                this.props.carrinhoStore.setCarrinho(response.data);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                    this.setState({ error: error.response.data.message });
                } else {
                    console.error(error);
                }
            });
    }

    makeRowsShoppingCart = (rows) => {
        this.props.carrinhoStore.carrinho.linhasCarrinho.forEach((linha) => {
            rows.push(
                <Card key={linha.produto.codigo} className="mb-2">
                    <div className="d-flex align-items-center bg-light">
                        <div>
                            <Image src="https://i.imgur.com/IpEsYSH.jpg" height={60} width={60} />
                        </div>
                        <div className="col p-2 d-flex justify-content-between" style={{ minWidth: '190px' }}>
                            <div>
                                <span className="d-block">{linha.produto.nome}</span>
                                <div className="d-flex justify-content-between">
                                    <span className="text-success">{formatterPrice.format(linha.subTotal)}</span>
                                    <span>{linha.quantidade} un.</span>
                                </div>
                            </div>
                            <Button size="sm" color="danger" style={{ height: '30px' }} onClick={(e) => { this.remover(linha.produto.codigo, e) }} className="ml-1">X</Button>
                        </div>
                    </div>
                </Card>
            );
        });
    }

    makeCategoriasRows = (rows) => {
        this.state.categorias.forEach(categoria => {
            rows.push(
                <DropdownItem key={categoria.id} tag={Link} to={routes.LISTA_PRODUTOS + categoria.descricao}>
                    {categoria.descricao}
                </DropdownItem>
            );
        })
    }

    render() {
        let rowsShoppingCart = [];
        let categoriasRows = [];
        let carrinhoText = <h6>Não possui produtos no seu carrinho!</h6>;
        if (this.props.carrinhoStore.carrinho.linhasCarrinho) {
            this.makeRowsShoppingCart(rowsShoppingCart);
        }
        this.makeCategoriasRows(categoriasRows);
        let navItemConta = (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to={routes.LOGIN}>Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={routes.REGISTAR}>Registar</NavLink>
                </NavItem>
            </Nav>
        );
        if (this.props.sessionStore.role === "CLIENTE") {
            navItemConta = (
                <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Minha conta
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem tag={Link} to={routes.ENCOMENDAS} >
                                Encomendas
                            </DropdownItem>
                            <DropdownItem tag={Link} to={routes.CONTA}>
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
        } else if (this.props.sessionStore.role === "FUNCIONARIO") {
            navItemConta = (
                <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Minha conta
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem tag={Link} to={routes.GESTOR_HOME} >
                                Gestão da loja
                            </DropdownItem>
                            <DropdownItem tag={Link} to={routes.CONTA}>
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
                    <NavbarBrand className="ml-5 mr-5" tag={Link} to={routes.HOME} style={{ cursor: "pointer" }}>
                        MyStore
                </NavbarBrand>
                    <Collapse isOpen={this.state.isOpenNavBar} navbar>
                        <div className="searchgroup">
                            <SearchBar categorias={this.state.categorias} />
                        </div>

                        <Nav className="ml-auto navLinkHidden" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Categorias
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {categoriasRows}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink tag={Link} to={routes.NOVIDADES} >Novidades</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to={routes.PROMOCOES}>Promoções</NavLink>
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
                        <span className="text-success pl-4">{formatterPrice.format(this.props.carrinhoStore.carrinho.total || 0)}</span>
                    </PopoverHeader>
                    <PopoverBody>
                        {rowsShoppingCart.length === 0 ? carrinhoText : rowsShoppingCart}
                        {rowsShoppingCart.length !== 0 && <Button size="sm" color="success" block className="mt-4" tag={Link} to={routes.CARRINHO}>Ver carrinho</Button>}
                    </PopoverBody>
                </Popover>
            </div>

        );
    }
}

export default compose(
    withRouter,
    inject('sessionStore', 'carrinhoStore'),
    observer
)(NavBar);
