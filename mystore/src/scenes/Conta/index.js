import React, { Component } from 'react';
import { Row, Col, Container, Input, Alert } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import PencilIcon from 'react-icons/lib/fa/edit';

import * as services from '../../services/utilizadores';
import AlterarPassword from './scenes/AlterarPassword';
import EditarDados from './scenes/EditarDados';

class Conta extends Component {

    INITIAL_STATE = {
        nome: undefined,
        email: undefined,
        telemovel: undefined,
        contribuinte: undefined,
        rua: undefined,
        localidade: undefined,
        codigoPostal: undefined,
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.INITIAL_STATE,
            modoEdicao: false,
            showAlert: false,
            modalPass: false,
            mensagem: "",
        };
    }

    editar = () => {
        this.setState({ modoEdicao: true })
    }

    cancelar = () => {
        this.setState({ modoEdicao: false, ...this.INITIAL_STATE })
    }

    onChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    guardar = () => {
        const dados = {};
        if (this.state.nome) {
            dados['nome'] = this.state.nome;
        }
        if (this.state.telemovel !== undefined) {
            dados['telemovel'] = this.state.telemovel;
        }
        if (this.state.contribuinte !== undefined) {
            dados['contribuinte'] = this.state.contribuinte;
        }
        if (this.state.rua !== undefined) {
            dados['rua'] = this.state.rua;
        }
        if (this.state.localidade !== undefined) {
            dados['localidade'] = this.state.localidade;
        }
        if (this.state.codigoPostal !== undefined) {
            dados['codigoPostal'] = this.state.codigoPostal;
        }
        services.editarDados(dados, this.props.sessionStore.accessToken)
            .then(response => {
                this.props.sessionStore.setUser(response.data);
                this.setState({ modoEdicao: false });
                this.showMensagem("Dados alterados com sucesso!");
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

    toggleAlert = () => {
        this.setState({ showAlert: !this.state.showAlert });
    }

    showMensagem = (mensagem) => {
        this.setState({ mensagem: mensagem });
        this.toggleAlert();
    }

    togglePass = () => {
        this.setState({
            modalPass: !this.state.modalPass,
        });
    }

    render() {
        let {
            nome,
            email,
            telemovel,
            contribuinte,
            morada,
        } = this.props.sessionStore.user;

        let {
            rua,
            localidade,
            codigoPostal,
        } = "";

        if (morada !== undefined && morada !== null) {
            rua = morada.rua;
            localidade = morada.localidade;
            codigoPostal = morada.codigoPostal;
        }

        return (
            <Container>
                <Alert color="success" isOpen={this.state.showAlert} toggle={this.toggleAlert} className="mt-2" style={{ marginBottom: "-60px" }}>
                    {this.state.mensagem}
                </Alert>

                <Row style={{ marginTop: "75px" }}>
                    <Col md="3">
                        <h3>A minha conta</h3>
                    </Col>
                    <Col md="9">
                        {
                            this.state.modoEdicao ?
                                <div>
                                    <button type="button" className="btn btn-success mr-2 block inline-md" style={{ width: '180px' }} onClick={this.guardar}>
                                        <PencilIcon className="mr-1" />
                                        Guardar
                                    </button>
                                    <button type="button" className="btn btn-secondary mr-2 block inline-md" style={{ width: '180px' }} onClick={this.cancelar}>
                                        Cancelar
                                    </button>
                                </div>
                                :
                                <div>
                                    <button type="button" className="btn btn-primary mr-2 block inline-md" style={{ width: '180px' }} onClick={this.editar}>
                                        <PencilIcon className="mr-1" />
                                        Editar dados
                                    </button>
                                    <button type="button" className="btn btn-primary block inline-md" style={{ width: '180px' }} onClick={this.togglePass}>
                                        <PencilIcon className="mr-1" />
                                        Alterar Password
                                    </button>
                                </div>
                        }
                    </Col>
                </Row>
                {
                    this.state.modoEdicao ?
                        <EditarDados user={this.props.sessionStore.user} onChange={this.onChange} />
                        :
                        <Row>
                            <Col md="6" className="mt-4">
                                <h5>Dados pessoais</h5>
                                <div className="form-label-group">
                                    <Input value={nome} placeholder="Nome" disabled type="text" className="form-control" id="inputNome" />
                                    <label htmlFor="inputNome">Nome</label>
                                </div>
                                <div className="form-label-group">
                                    <Input value={email} placeholder="Email" disabled type="email" className="form-control" id="inputEmail" />
                                    <label htmlFor="inputEmail">Email</label>
                                </div>
                                <div className="form-label-group">
                                    <Input value={telemovel} disabled placeholder="Telemóvel" type="text" className="form-control" id="inputTelemovel" />
                                    <label htmlFor="inputTelemovel">Telemóvel</label>
                                </div>
                                <div className="form-label-group">
                                    <Input value={contribuinte} disabled placeholder="Contribuinte" type="text" className="form-control" id="inputNIF" />
                                    <label htmlFor="inputNIF">Contribuinte</label>
                                </div>
                            </Col>
                            <Col md="6" className="mt-4">
                                <h5>Endereço</h5>
                                <div className="form-label-group">
                                    <Input value={rua} disabled placeholder="Rua" type="text" className="form-control" id="inputRua" />
                                    <label htmlFor="inputRua">Rua</label>
                                </div>
                                <div className="form-label-group">
                                    <Input value={localidade} disabled placeholder="Rua" type="text" className="form-control" id="inputLocalidade" />
                                    <label htmlFor="inputLocalidade">Localidade</label>
                                </div>
                                <div className="form-label-group">
                                    <Input value={codigoPostal} disabled placeholder="Código Postal" type="text" className="form-control" id="inputCP" />
                                    <label htmlFor="inputCP">Código Postal</label>
                                </div>
                            </Col>
                        </Row>
                }

                <AlterarPassword modal={this.state.modalPass} toggle={this.togglePass} change={this.showMensagem} />
            </Container >
        );
    }
}

export default compose(
    inject('sessionStore'),
    observer
)(Conta);