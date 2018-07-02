import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import estadoEnum from '../../../../constants/estadoEnum';
import * as services from '../../../../services/encomendas';


class AlterarEstado extends Component {

    constructor(props) {
        super(props);
        this.state = {
            antigoEstado:'',
            estado: '',
            options: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        let estado = nextProps.encomenda.estado;
        if (this.state.antigoEstado !== estadoEnum[estado]) {
            let estados = this.makeOptions(estado);
            this.setState({
                antigoEstado: estadoEnum[estado],
                estado: estados[0],
                options: estados,
            });
        }
    }

    doOperation = () => {
        services.alterarEstado(this.props.encomenda.numero, this.state.estado, this.props.sessionStore.accessToken)
            .then(response => {
                this.props.atualizar(response.data.estado);
                this.props.toggle();
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

    onChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    makeOptions = (estado) => {
        let res = [];
        switch (estado) {
            case 'AGUARDA_PAGAMENTO': { res.push('EM_PROCESSAMENTO', 'CANCELADA'); break; }
            case 'EM_PROCESSAMENTO': { res.push('ENVIADA'); break; }
            case 'ENVIADA': { res.push('ENTREGUE'); break; }
            default: ;
        }
        return res;
    }

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Alterar estado da encomenda</ModalHeader>
                <ModalBody className="center-block">
                    <Row className="ml-4 mr-4">
                        <Col>
                            <span> A encomenda encontra-se no estado {this.state.antigoEstado}. </span><br />
                            <span> Deseja alterar para que estado? </span>
                            <select className="form-control" id="estado" value={this.state.estado} onChange={this.onChange}>
                                {this.state.options.map(estado => <option value={estado}>{estadoEnum[estado]}</option>)}
                            </select>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.doOperation} >Confirmar</Button>
                    <Button outline color="secondary" onClick={this.props.toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default compose(
    withRouter,
    inject('sessionStore'),
    observer
)(AlterarEstado);