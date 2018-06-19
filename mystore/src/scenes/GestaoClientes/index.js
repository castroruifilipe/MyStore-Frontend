import React, { Component } from 'react';
import { Container, Row, Button, Col, Nav, NavItem, NavLink } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes'
import * as produtosService from '../../services/produtos';
import * as encomendasService from '../../services/encomendas';
import './style.css'

class GestorHome extends Component {
    
    componentWillMount() {
        encomendasService.getAllEncomendas(this.props.sessionStore.accessToken, 5)
            .then(response => {
                this.props.gestorStore.setUltimasEncomendas(response.data);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                    this.setState({ error: error.response.data.message });
                } else {
                    console.error(error);
                }
            });
        produtosService.getMaisVendidos(5)
            .then(response => {
                this.props.produtosStore.setMaisVendidos(response.data);
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

    makeLastEncomendas = (rows) => {
        this.props.gestorStore.ultimasEncomendas
            .forEach(encomenda => {
                rows.push(encomenda);
            });
    }
    makeLastEncomendasTeste = (rows) => {
        let encomenda = {
            numero: "",
            data: "20/12/2001",
            envio: "1",
            total: "20",
            estado: "envio",
            metodo: "ctt"
        }
        for (let i = 0; i < 5; i++)
            rows.push({ ...encomenda, data: encomenda.data, numero: i });
    }

    makeMaisVendidos = (rows) => {
        this.props.produtosStore.maisVendidos
            .forEach(produto => {
                rows.push(produto)
            });
    }

    templateTabelaEncomendas = (encomendas) => {
        let html =
            <BootstrapTable version='4' data={encomendas}>
                <TableHeaderColumn isKey dataField='numero' filter={{ type: 'TextFilter' }} className='customHeader'>Nº Encomenda</TableHeaderColumn>
                <TableHeaderColumn dataField='data' dataSort={true} caretRender={this.getCaret} className="customHeader">Data</TableHeaderColumn>
                <TableHeaderColumn dataField='envio' className="customHeader">Envio para</TableHeaderColumn>
                <TableHeaderColumn dataField='total' className="customHeader">Total</TableHeaderColumn>
                <TableHeaderColumn dataField='estado' className="customHeader">Estado</TableHeaderColumn>
                <TableHeaderColumn dataField='metodo' className="customHeader">Método envio</TableHeaderColumn>
                <TableHeaderColumn dataField='button' dataAlign="center" dataFormat={this.buttonEncomenda} className="customHeader"></TableHeaderColumn>
            </BootstrapTable>
    return html
}

    templateTabelaMaisVendidos = (produtos) => {
            let html =
                <BootstrapTable version='4' data={produtos}>
                    <TableHeaderColumn isKey dataField='codigo' filter={{ type: 'TextFilter' }} className='customHeader'>Nº Produto</TableHeaderColumn>
                    <TableHeaderColumn dataField='nome' className="customHeader">Nome</TableHeaderColumn>
                    <TableHeaderColumn dataField='precoBase' className="customHeader">Preço</TableHeaderColumn>
                    <TableHeaderColumn dataField='unidades' className="customHeader">Unidades</TableHeaderColumn>
                    <TableHeaderColumn dataField='total' className="customHeader">Total faturado</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataAlign="center" dataFormat={this.buttonProduto} className="customHeader"></TableHeaderColumn>
                </BootstrapTable>
        return html
    }

    templateSideMenu = () => {
        let html = 
        <Nav className="ml-auto mt-5 side-menu" vertical pills>
            <h6 class="ml-3 font-weight-bold"> Opções de gestão </h6>
            <NavItem className="mt-2">
                <NavLink tag={Link} to={routes.GESTAO_CLIENTES}>Gestão de clientes</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to={routes.GESTAO_ENCOMENDAS}>Gestão de encomendas</NavLink>
            </NavItem>
            <br class="nav-break"/>
            <NavItem>
                <NavLink className="side-menu-link" tag={Link} to={routes.GESTAO_PRODUTOS}>Gestão de produtos</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="side-menu-link" tag={Link} to={routes.GESTAO_PROMOCOES}>Gestão de promoções</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="side-menu-link" tag={Link} to={routes.GESTAO_CATEGORIAS}>Gestão de categorias</NavLink>
            </NavItem>
        </Nav>
        return html
    }

    buttonEncomenda = (cell, row) => {
        return <Button size="sm" tag={Link} to={routes.ENCOMENDA + row.numero}>detalhe</Button>
    }
    buttonProduto = (cell, row) => {
        return <Button size="sm" tag={Link} to={routes.PRODUTO + row.codigo}>Ver produto</Button>
    }

    render() {
        let ultimasEncomendas = [], maisVendidos = [];
        this.makeLastEncomendasTeste(ultimasEncomendas);
        this.makeMaisVendidos(maisVendidos);

        return (
            <div>
                <Container fluid className="custom-container">
                    <Row>
                        <Col xs="3">
                            {this.templateSideMenu()}
                        </Col>
                        <Col>
                            <Row className="mt-5">
                                <h4>Mais vendidos</h4>
                            </Row>
                            <Row>
                                {this.templateTabelaMaisVendidos(maisVendidos)}
                            </Row>
                            <Row className="mt-5">
                                <h4>Ultimas Encomendas</h4>
                            </Row>
                            <Row>
                                {this.templateTabelaEncomendas(ultimasEncomendas)}
                            </Row>
                        </Col>
                        
                    </Row>
                </Container>
            </div>
        );


        
    }
}

export default compose(
    inject('produtosStore'),
    inject('sessionStore'),
    inject('gestorStore'),
    observer
)(GestorHome);
