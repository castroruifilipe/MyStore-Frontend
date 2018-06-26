import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
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
        services.getClientes(this.props.sessionStore.accessToken)
            .then(response => {
                this.setState({ clientes: response.data });
            })
            .catch(error => console.error(error.response));
    }

    buttonFormatter = (cell, row) => {
        return <Button size="sm" tag={Link} to={routes.GESTAO_CLIENTES + row.id}>Ver cliente</Button>
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
                        <Col className="p-0">
                            <BootstrapTable version='4' pagination data={this.state.clientes}>
                                <TableHeaderColumn isKey dataField='id' filter={{ type: 'TextFilter' }} className='customHeader' dataAlign='center' width="10%">
                                    Nº cliente
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='nome' filter={{ type: 'TextFilter' }} className="customHeader" dataAlign='center'>
                                    Nome
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='email' filter={{ type: 'TextFilter' }} className="customHeader" dataAlign='center'>
                                    Email
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='telemovel' filter={{ type: 'TextFilter' }} className="customHeader" dataAlign='center' width="15%">
                                    Telemóvel
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='contribuinte' filter={{ type: 'TextFilter' }} className="customHeader" dataAlign='center' width="15%">
                                    Contribuinte
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='button' dataAlign="center" dataFormat={this.buttonFormatter} className="customHeader" width="12%">
                                </TableHeaderColumn>
                            </BootstrapTable>
                        </Col>
                    </Row>
                </Col>
            </Row >
        );
    }
}

export default compose(
    inject('sessionStore'),
    observer
)(GestaoClientes);