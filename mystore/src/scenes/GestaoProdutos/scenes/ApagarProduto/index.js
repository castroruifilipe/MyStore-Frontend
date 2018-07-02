import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import * as services from '../../../../services/produtos';
import * as routes from '../../../../constants/routes';


class ApagarProduto extends Component {

    doOperation = () => {
        services.removerProduto(this.props.produto, this.props.sessionStore.accessToken)
            .then(response => {
                this.props.history.push(routes.GESTAO_PRODUTOS);
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

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Apagar Produto</ModalHeader>
                <ModalBody className="center-block">
                    <Row className="ml-4 mr-4">
                        <Col>
                            <span> A operação que está a realizar é irreversível. </span><br />
                            <span> Tem a certeza que pretende remover o produto? </span>

                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.doOperation}>Confirmar</Button>
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
)(ApagarProduto);