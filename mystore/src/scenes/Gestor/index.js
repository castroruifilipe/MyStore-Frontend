import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Route } from 'react-router-dom';

import * as routes from '../../constants/routes';
import SideMenu from '../../components/SideMenu';
import GestorHome from '../GestorHome';

class Gestor extends Component {

    render() {
        return (
            <Container fluid style={{ minHeight: '60vh' }} className="custom-container">
                <Row>
                    <Col md="3">
                        <SideMenu />
                    </Col>
                    <Col md="9" className="mt-4">
                        <Route exact path={routes.GESTOR_HOME} component={GestorHome} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Gestor;




/*import React, { Component } from 'react';
import { Container, Row, Button, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';
import * as services from '../../services/produtos';

class GestorHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            novidades: [],
            maisVendidos: [],
        }
    }

    componentWillMount() {
        services.getMaisVendidos(5)
            .then(response => {
                console.log(response.data);
                this.setState({ maisVendidos: response.data });
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
        this.state.maisVendidos
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

    buttonEncomenda = (cell, row) => {
        return <Button size="sm" tag={Link} to={routes.ENCOMENDA + row.numero}> detalhe</Button >
    }
    buttonProduto = (cell, row) => {
        return <Button size="sm" tag={Link} to={routes.PRODUTO + row.codigo}> Ver produto</Button >
    }

    render() {
        let ultimasEncomendas = [], maisVendidos = [];
        this.makeLastEncomendasTeste(ultimasEncomendas);
        this.makeMaisVendidos(maisVendidos);

        return (
            <div>
                <Container fluid className="custom-container">
                    <Row>
                        <Col md="12">
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
    inject('sessionStore'),
    observer
)(GestorHome);*/


