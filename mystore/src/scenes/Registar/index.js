import React, { Component } from 'react';
import { Row, Col, Container, Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../../constants/routes';

class Registar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            nome: '',
            email: '',
            password_one: '',
            password_two: '',
            error: null,
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onButtonClickModal = () => {
        this.props.history.push(routes.LOGIN);
    }

    onSubmit = (event) => {
        this.toggle();
        event.preventDefault();
    };

    render() {

        const {
            nome,
            email,
            password_one,
            password_two,
            error,
        } = this.state;

        const isInvalid =
            password_one !== password_two ||
            nome === '' ||
            email === '' ||
            password_one === '';

        return (
            <Container fluid>
                <Row style={{ minHeight: '90vh' }}>
                    <Col md={{ size: 6, offset: 4 }}>
                        <h3 className="font-weight-normal mb-4" style={{ paddingTop: '120px' }}>Criar conta</h3>

                        <Form className="form-sign" onSubmit={this.onSubmit}>
                            <div className="form-label-group">
                                <Input required value={nome} placeholder="Nome" type="text" className="form-control" id="inputName"
                                    onChange={event => this.setState({
                                        'nome': event.target.value
                                    })}
                                />
                                <label htmlFor="inputName">Nome</label>
                            </div>
                            <div className="form-label-group">
                                <Input required value={email} placeholder="Email" type="email" className="form-control" id="inputEmail"
                                    onChange={event => this.setState({
                                        'email': event.target.value
                                    })}
                                />
                                <label htmlFor="inputEmail">Email</label>
                            </div>
                            <div className="form-label-group">
                                <Input required value={password_one} placeholder="Password" type="password" className="form-control" id="inputPasswordOne"
                                    onChange={event => this.setState({
                                        'password_one': event.target.value
                                    })}
                                />
                                <label htmlFor="inputPasswordOne">Password</label>
                            </div>
                            <div className="form-label-group">
                                <Input required value={password_two} placeholder="Confirmar password" type="password" className="form-control" id="inputPasswordTwo"
                                    onChange={event => this.setState({
                                        'password_two': event.target.value
                                    })}
                                />
                                <label htmlFor="inputPasswordTwo">Confirmar password</label>
                            </div>

                            <Button color="primary" disabled={isInvalid} type="submit" block={true} size="lg">Registar</Button>

                            {error && <Alert color="danger" className="mt-5">{error.message}</Alert>}

                            <hr />

                            <p className="text-muted text-center">
                                Já tem conta?
                                <Link  to={routes.LOGIN}> Login</Link>
                            </p>

                           



                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader toggle={this.toggle}>Email de confirmação</ModalHeader>
                                <ModalBody>
                                    A sua conta foi registada com sucesso e já pode iniciar sessão. Bem-vindo!
          						</ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.onButtonClickModal}>OK</Button>
                                </ModalFooter>
                            </Modal>

                        </Form >
                    </Col>
                </Row>
            </Container>
        );
    };
}


export default withRouter(Registar);