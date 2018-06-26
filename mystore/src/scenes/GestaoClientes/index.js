import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Link } from 'react-router-dom';

import * as services from '../../services/utilizadores';
import * as routes from '../../constants/routes';

class GestaoClientes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clientes: [],
        }
    }

    componentWillMount() {
        services.getClientes()
            .then(response => {
                this.setState({ clientes: response.data });
            })
            .catch(error => console.error(error.response));
    }

    buttonFormatter = (cell, row) => {
        return <Button size="sm" tag={Link} to={routes.GESTAO_CLIENTES + row.numero}>Ver cliente</Button>
    }

    render() {
        return (
            <Row>
                <Col >
                    <Row>
                        <Col className="p-0">
                            <h4>Gestão de Clientes</h4>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <BootstrapTable version='4'  pagination data={this.state.clientes}>
                            <TableHeaderColumn isKey dataField='numero' filter={{ type: 'TextFilter' }} className='customHeader'>
                                Nº cliente
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='nome' filter={{ type: 'TextFilter' }} className="customHeader">
                                Nome
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='email' filter={{ type: 'TextFilter' }} className="customHeader">
                                Email
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='telemovel' filter={{ type: 'TextFilter' }} className="customHeader">
                                Telemóvel
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='contribuinte' filter={{ type: 'TextFilter' }} className="customHeader">
                                Contribuinte
                                </TableHeaderColumn>
                            <TableHeaderColumn dataField='button' dataAlign="center" dataFormat={this.buttonProduto} className="customHeader">
                            </TableHeaderColumn>
                        </BootstrapTable>
                    </Row>
                </Col>
            </Row >
        );
    }
}

export default GestaoClientes;