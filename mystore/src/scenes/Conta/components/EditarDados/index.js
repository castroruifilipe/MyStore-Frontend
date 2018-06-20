import React, { Component } from 'react';
import { Row, Col, Input } from 'reactstrap';

class EditarDados extends Component {

    constructor(props) {
        super(props);
        let morada = this.props.user.morada;
        if (!morada) {
            morada = {
                rua: '',
                localidade: '',
                codigoPostal: ''
            };
        }
        this.state = {
            nome: this.props.user.nome,
            email: this.props.user.email,
            telemovel: (this.props.user.telemovel || ""),
            contribuinte: (this.props.user.contribuinte || ""),
            rua: morada.rua,
            localidade: morada.localidade,
            codigoPostal: morada.codigoPostal,
            editarDados: false,
        };
    }

    onChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
        this.props.onChange(event);
    }

    render() {
        let {
            nome,
            email,
            telemovel,
            contribuinte,
            rua,
            localidade,
            codigoPostal,
        } = this.state;

        return (
            <Row>
                <Col md="6" className="mt-4">
                    <h5>Dados pessoais</h5>
                    <div className="form-label-group">
                        <Input value={nome} placeholder="Nome" type="text" className="form-control" id="nome" onChange={this.onChange} />
                        <label htmlFor="nome">Nome</label>
                    </div>
                    <div className="form-label-group">
                        <Input value={email} disabled placeholder="Email" type="email" className="form-control" id="email" onChange={this.onChange} />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-label-group">
                        <Input value={telemovel} placeholder="Telemóvel" type="text" className="form-control" id="telemovel" onChange={this.onChange} />
                        <label htmlFor="telemovel">Telemóvel</label>
                    </div>
                    <div className="form-label-group">
                        <Input value={contribuinte} placeholder="Contribuinte" type="text" className="form-control" id="contribuinte" onChange={this.onChange} />
                        <label htmlFor="contribuinte">Contribuinte</label>
                    </div>
                </Col>
                <Col md="6" className="mt-4">
                    <h5>Endereço</h5>
                    <div className="form-label-group">
                        <Input value={rua} placeholder="Rua" type="text" className="form-control" id="rua" onChange={this.onChange} />
                        <label htmlFor="rua">Rua</label>
                    </div>
                    <div className="form-label-group">
                        <Input value={localidade} placeholder="Rua" type="text" className="form-control" id="localidade" onChange={this.onChange} />
                        <label htmlFor="localidade">Localidade</label>
                    </div>
                    <div className="form-label-group">
                        <Input value={codigoPostal} placeholder="Código Postal" type="text" className="form-control" id="codigoPostal" onChange={this.onChange} />
                        <label htmlFor="codigoPostal">Código Postal</label>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default EditarDados;