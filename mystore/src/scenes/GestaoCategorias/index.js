import React, { Component } from 'react';
import { Row, Button, Col, Container, Alert, Modal, ModalBody, ModalHeader, ModalFooter, Form, Input } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/lib/ti';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import * as services from '../../services/categorias';

class GestaoCategorias extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categorias: [],
            showAlert: false,
            showModal: false,
            descricao: '',
        }
    }

    componentWillMount() {
        services.getCategorias()
            .then(response => this.setState({ categorias: response.data }))
            .catch(error => console.error(error));
    }

    apagarCategoria = (descricao) => {
        services.deleteCategoria(descricao, this.props.sessionStore.accessToken)
            .then(response => services.getCategorias())
            .then(response => this.setState({ categorias: response.data }))
            .catch(error => {
                console.error(error.response);
                this.setState({ showAlert: true })
            });
    }

    criarCategoria = () => {
        services.criarCategoria(this.state.descricao, this.props.sessionStore.accessToken)
            .then(response => this.toggleModal())
            .then(() => services.getCategorias())
            .then(response => this.setState({ categorias: response.data }))
            .catch(error => console.error(error.response));
    }

    toggleAlert = () => {
        this.setState({ showAlert: !this.state.showAlert });
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
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
        return <Button size="sm" color="danger" onClick={(e) => this.apagarCategoria(row.descricao, e)}>Apagar</Button>
    }

    render() {
        return (
            <Container>
                <Alert color="danger" isOpen={this.state.showAlert} toggle={this.toggleAlert} style={{ position: 'fixed', top: '40px', zIndex: '1' }}>
                    Não foi possível apagar concluir a operação. Verifique se existem produtos com a categoria que tentou apagar.
                </Alert>
                <Row>
                    <Col md="6" className="p-0">
                        <h4>Gestão de Categorias</h4>
                    </Col>
                    <Col md="6" className="p-0" align="right">
                        <Button color="primary" onClick={this.toggleModal}>Nova categoria</Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="p-0">
                        <BootstrapTable version='4' data={this.state.categorias} pagination >
                            <TableHeaderColumn isKey dataField='id' dataSort caretRender={this.getCaret} width="15%" filter={{ type: 'TextFilter' }} className='customHeader' dataAlign="center">Código</TableHeaderColumn>
                            <TableHeaderColumn dataField='descricao' dataSort caretRender={this.getCaret} filter={{ type: 'TextFilter' }} className="customHeader">Descrição</TableHeaderColumn>
                            <TableHeaderColumn dataField='button' dataAlign="center" dataFormat={this.buttonFormatter} width='15%' className="customHeader"></TableHeaderColumn>
                        </BootstrapTable>
                    </Col>
                </Row>

                <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Criar nova categoria</ModalHeader>
                    <ModalBody align="center">
                        <Form className="form-sign">
                            <div className="form-label-group">
                                <Input required value={this.state.descricao} placeholder="Descrição da categoria" type="text"
                                    className="form-control" id="descricao"
                                    onChange={e => this.setState({ 'descricao': e.target.value })} />
                                <label htmlFor="descricao" align="left">Descrição da categoria</label>
                            </div>
                        </Form >

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.criarCategoria} disabled={this.state.descricao === ""}>Criar</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );

    }
}

export default compose(
    inject('sessionStore'),
    observer
)(GestaoCategorias);