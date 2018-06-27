import React, { Component } from 'react';
import { Row, Button, Col, Container, Alert, Modal, ModalBody, ModalHeader, ModalFooter, Form, Input } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/lib/ti';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { formatterPercent } from '../../constants/formatters';
import * as services from '../../services/promocoes';
import * as routes from '../../constants/routes';

class GestaoPromocoes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            promocoes: [],
        }
    }

    componentWillMount() {
        services.getAllPromocoes()
            .then(response => this.setState({ promocoes: response.data }))
            .catch(error => console.error(error));
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

    buttonFormatter = (cell, row) => {
        return <Button size="sm" onClick={(e) => this.props.history.push(routes.GESTAO_PROMOCOES + "/" + row.id)}>Ver</Button>
    }

    percentFormatter = (cell, row) => {
        return formatterPercent.format(cell);
    }

    booleanFormatter = (cell, row) => {
        return cell ? 'Sim' : 'Não';
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md="6" className="p-0">
                        <h4>Gestão de Promoções</h4>
                    </Col>
                    <Col md="6" className="p-0" align="right">
                        <Button color="primary">Nova promocao</Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="p-0">
                        <BootstrapTable version='4' data={this.state.promocoes} pagination >
                            <TableHeaderColumn isKey dataField='id' dataSort caretRender={this.getCaret} width='10%' filter={{ type: 'TextFilter' }} className='customHeader' dataAlign="center">Código</TableHeaderColumn>
                            <TableHeaderColumn dataField='descricao' width='25%' filter={{ type: 'TextFilter' }} className="customHeader">Descrição</TableHeaderColumn>
                            <TableHeaderColumn dataField='desconto' width='10%' dataFormat={this.percentFormatter} className="customHeader" dataAlign="center">Desconto</TableHeaderColumn>
                            <TableHeaderColumn dataField='dataInicio' dataSort caretRender={this.getCaret} className="customHeader" dataAlign="center">Data de início</TableHeaderColumn>
                            <TableHeaderColumn dataField='dataFim' dataSort caretRender={this.getCaret} className="customHeader" dataAlign="center">Data de fim</TableHeaderColumn>
                            <TableHeaderColumn dataField='atual' width='10%' dataFormat={this.booleanFormatter} className="customHeader" dataAlign="center">Em vigor</TableHeaderColumn>
                            <TableHeaderColumn dataField='button' width='8%' dataAlign="center" dataFormat={this.buttonFormatter} className="customHeader"></TableHeaderColumn>
                        </BootstrapTable>
                    </Col>
                </Row>
            </Container>
        );

    }
}

export default compose(
    withRouter,
    inject('sessionStore'),
    observer
)(GestaoPromocoes);