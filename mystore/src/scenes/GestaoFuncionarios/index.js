import React, { Component } from 'react';
import { Row, Col, Button, Alert } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/lib/ti';

import * as services from '../../services/utilizadores';
import * as routes from '../../constants/routes';

class GestaoFuncionarios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            funcionarios: [],
            showAlert: false,
        }
    }

    componentWillMount() {
        services.getFuncionarios(this.props.sessionStore.accessToken)
            .then(response => {
                this.setState({ funcionarios: response.data });
            })
            .catch(error => console.error(error.response));
    }

    toggleAlert = () => {
        this.setState({ showAlert: !this.state.showAlert });
    }

    getCaret = (direction) => {
        if (direction === 'asc') {
            return (
                <TiArrowSortedUp />
            )
        }
        if (direction === 'desc') {
            return (
                <TiArrowSortedDown />
            )
        }
        return (<TiArrowUnsorted />);
    }

    apagarFuncionario = (id) => {
        services.deleteFuncionario(id, this.props.sessionStore.accessToken)
            .then(response => services.getFuncionarios())
            .then(response => this.setState({ funcionarios: response.data }))
            .catch(error => {
                console.error(error.response);
                this.setState({ showAlert: true })
            });
    }

    buttonFormatter = (cell, row) => {
        return <Button size="sm" color="danger" onClick={(e) => this.apagarFuncionario(row.descricao, e)}>Apagar</Button>
    }

    render() {
        return (
            <div>
                <Alert color="danger" isOpen={this.state.showAlert} toggle={this.toggleAlert} style={{ position: 'fixed', top: '40px', zIndex: '1' }}>
                    Não foi possível apagar concluir a operação. Verifique se existem produtos com a categoria que tentou apagar.
                </Alert>
                <Row>
                    <Col >
                        <Row>
                            <Col className="p-0">
                                <h4>Gestão de Funcionários</h4>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="p-0">
                                <BootstrapTable version='4' pagination data={this.state.funcionarios}>
                                    <TableHeaderColumn isKey dataField='numero' dataSort caretRender={this.getCaret} filter={{ type: 'TextFilter' }} className='customHeader' dataAlign='center' width="15%">
                                        Nº funcionário
                                </TableHeaderColumn>
                                    <TableHeaderColumn dataField='nome' dataSort caretRender={this.getCaret} filter={{ type: 'TextFilter' }} className="customHeader" dataAlign='center'>
                                        Nome
                                </TableHeaderColumn>
                                    <TableHeaderColumn dataField='email' dataSort caretRender={this.getCaret} filter={{ type: 'TextFilter' }} className="customHeader" dataAlign='center'>
                                        Email
                                </TableHeaderColumn>
                                    <TableHeaderColumn dataField='telemovel' dataSort caretRender={this.getCaret} filter={{ type: 'TextFilter' }} className="customHeader" dataAlign='center' width="15%">
                                        Telemóvel
                                </TableHeaderColumn>
                                    <TableHeaderColumn dataField='button' dataAlign="center" dataFormat={this.buttonFormatter} className="customHeader" width="15%">
                                    </TableHeaderColumn>
                                </BootstrapTable>
                            </Col>
                        </Row>
                    </Col>
                </Row >
            </div>
        );
    }
}

export default compose(
    inject('sessionStore'),
    observer
)(GestaoFuncionarios);