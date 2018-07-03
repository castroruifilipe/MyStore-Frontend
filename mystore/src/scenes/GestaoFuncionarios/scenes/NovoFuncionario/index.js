import React, { Component } from 'react';
import { Row, Col, Input, Button, Form } from 'reactstrap';
import PencilIcon from 'react-icons/lib/fa/edit';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import * as services from '../../../../services/utilizadores';
import * as routes from '../../../../constants/routes';

class NovoFuncionario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            nome: '',
            email: '',
            password_one: '',
            password_two: '',
            numero: '',
            error: null,
        };
    }

    onSubmit = (event) => {
        const { email, password_one, nome, numero } = this.state;

        services.registarFuncionario(email, password_one, nome, numero, "FUNCIONARIO")
            .then(response => {
                this.props.history.push(routes.GESTAO_FUNCIONARIOS);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                    this.setState({ error: error.response.data.message });
                } else {
                    console.error(error);
                }
            });
    };

    render() {
        let {
            nome,
            email,
            password_one,
            password_two,
            numero,
        } = this.state;

        const isInvalid =
            password_one !== password_two ||
            nome === '' || email === '' ||
            numero === '' || numero === 0 ||
            password_one === '';

        return (
            <div>
                <Row>
                    <Col>
                        <h3 className='headerColor'>Novo funcionário</h3>
                    </Col>
                    <Col align="center">
                        <div>
                            <Button color="success" disabled={isInvalid} className="mr-2 block inline-md" style={{ width: '180px' }} onClick={this.onSubmit}>
                                <PencilIcon className="mr-1" />
                                Guardar
                            </Button>
                            <Button color="secondary" className="mr-2 block inline-md" style={{ width: '180px' }} tag={Link} to={routes.GESTAO_PRODUTOS}>
                                Cancelar
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <Form className="form-sign" >
                            <div className="form-label-group">
                                <Input required value={nome} placeholder="Nome" type="text" className="form-control" id="inputName"
                                    onChange={event => this.setState({
                                        'nome': event.target.value
                                    })}
                                />
                                <label htmlFor="inputName">Nome</label>
                            </div>
                            <div className="form-label-group">
                                <Input required value={numero} placeholder="Número funcionário" type="text" className="form-control" id="inputNumero"
                                    onChange={event => this.setState({
                                        'numero': event.target.value
                                    })}
                                />
                                <label htmlFor="inputNumero">Número de funcionário</label>
                            </div>
                            <div className="form-label-group">
                                <Input required value={email} placeholder="Email" type="email" className="form-control" id="inputEmail"
                                    onChange={event => this.setState({
                                        'email': event.target.value
                                    })}
                                />
                                <label htmlFor="inputEmail">Email</label>
                            </div>
                        </Form >
                    </Col>
                    <Col>
                        <Form className="form-sign" >
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
                        </Form >
                    </Col>
                </Row>
            </div>
        );
    }

}

export default compose(
    inject('sessionStore'),
    observer
)(NovoFuncionario);