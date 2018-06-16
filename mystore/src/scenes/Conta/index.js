import React, { Component } from 'react';
import { Row, Col, Container, Input, Alert } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import PencilIcon from 'react-icons/lib/fa/edit';

import * as services from '../../services/utilizadores';
import AlterarPassword from './components/AlterarPassword';

class Conta extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: this.props.sessionStore.user.nome,
            email: this.props.sessionStore.user.email,
            telemovel: this.props.sessionStore.user.telemovel,
            contribuinte: this.props.sessionStore.user.contribuinte,
            rua: this.props.sessionStore.user.rua,
            localidade: this.props.sessionStore.user.localidade,
            codigoPostal: this.props.sessionStore.user.codigoPostal,
            editarDados: false,
            modalPass: false,
        };
    }

    guardar = () => {
        const { nome, email, telemovel, contribuinte, rua, localidade, codigoPostal } = this.state;

        services.editarDados(nome, email, telemovel, contribuinte, rua, localidade, codigoPostal, this.props.sessionStore.accessToken)
            .then(response => this.toggle())
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                    this.setState({ error: error.response.data.message });
                } else {
                    console.error(error);
                }
            });
        this.setState({
            editarDados: !this.state.editarDados,
        });
    }

    toggleAlert = () => {
        this.setState({ editarDados: !this.state.editarDados });
    }

    togglePass = () => {
        this.setState({
            modalPass: !this.state.modalPass,
        });
    }

    render() {

        const {
            nome,
            email,
            telemovel,
            contribuinte,
            rua,
            localidade,
            codigoPostal,
        } = this.state;

        return (

            <Container>
                <Alert color="success" isOpen={this.state.editarDados} toggle={this.toggleAlert} className="mt-2" style={{marginBottom:"-60px"}}>
                    Dados alterados com sucesso
                </Alert>

                <Row style={{marginTop:"75px"}}>
                    <Col md="3">
                        <h3>A minha conta</h3>
                    </Col>
                    <Col md="9">
                        <button type="button" className="btn btn-primary mr-2 block inline-md" style={{ width: '180px' }} onClick={this.guardar}>
                            Guardar
                		</button>
                        <button type="button" className="btn btn-primary block inline-md" style={{ width: '180px' }} onClick={this.togglePass}>
                            <PencilIcon className="mr-1" />
                            Alterar Password
                		</button>
                    </Col>
                </Row>
                <Row>
                    <Col md="6" className="mt-4">
                        <h5>Dados pessoais</h5>
                        <div className="form-label-group">
                            <Input value={nome} placeholder="Nome" type="text" className="form-control" id="inputNome"
                                onChange={event => this.setState({
                                    'nome': event.target.value
                                })}
                            />
                            <label htmlFor="inputNome">Nome</label>
                        </div>
                        <div className="form-label-group">
                            <Input value={email} placeholder="Email" type="email" className="form-control" id="inputEmail"
                                onChange={event => this.setState({
                                    'email': event.target.value
                                })}
                            />
                            <label htmlFor="inputEmail">Email</label>
                        </div>
                        <div className="form-label-group">
                            <Input value={telemovel} placeholder="Telemóvel" type="text" className="form-control" id="inputTelemovel"
                                onChange={event => this.setState({
                                    'telemovel': event.target.value
                                })}
                            />
                            <label htmlFor="inputTelemovel">Telemóvel</label>
                        </div>
                        <div className="form-label-group">
                            <Input value={contribuinte} placeholder="Contribuinte" type="text" className="form-control" id="inputNIF"
                                onChange={event => this.setState({
                                    'contribuinte': event.target.value
                                })}
                            />
                            <label htmlFor="inputNIF">Contribuinte</label>
                        </div>
                    </Col>
                    <Col md="6" className="mt-4">
                        <h5>Endereço</h5>
                        <div className="form-label-group">
                            <Input value={rua} placeholder="Rua" type="text" className="form-control" id="inputRua"
                                onChange={event => this.setState({
                                    'rua': event.target.value
                                })}
                            />
                            <label htmlFor="inputRua">Rua</label>
                        </div>
                        <div className="form-label-group">
                            <Input value={localidade} placeholder="Rua" type="text" className="form-control" id="inputLocalidade"
                                onChange={event => this.setState({
                                    'localidade': event.target.value
                                })}
                            />
                            <label htmlFor="inputLocalidade">Localidade</label>
                        </div>
                        <div className="form-label-group">
                            <Input value={codigoPostal} placeholder="Código Postal" type="text" className="form-control" id="inputCP"
                                onChange={event => this.setState({
                                    'Código Postal': event.target.value
                                })}
                            />
                            <label htmlFor="inputCP">Código Postal</label>
                        </div>
                    </Col>
                </Row>

                <AlterarPassword modal={this.state.modalPass} toggle={this.togglePass} />
            </Container >
        );
    }
}

export default compose(
    inject('sessionStore'),
    observer
)(Conta);