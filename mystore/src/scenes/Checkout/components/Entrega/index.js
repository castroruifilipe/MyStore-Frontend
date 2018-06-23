import React, { Component } from 'react';
import { Row, Col, Input } from 'reactstrap';

class Entrega extends Component {

    constructor(props) {
        super(props);
        this.state = {
            load: false,
            nome: this.props.user.nome,
            rua: this.props.user.morada.rua || '',
            codigoPostal: this.props.user.morada.codigoPostal || '',
            localidade: this.props.user.morada.localidade || '',
        };
    }

    onChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
        this.props.setMoradaEntrega(event);
    }

    render() {
        let {
            nome,
            rua,
            codigoPostal,
            localidade,
        } = this.state;

        return (
            <Row >
                <Col md="8">
                    <h5>Morada de Entrega</h5>
                    <Row>
                        <Col>
                            <div className="form-label-group">
                                <Input required value={nome} placeholder="Nome" type="text" className="form-control"
                                    id="nome" onChange={this.onChange} />
                                <label htmlFor="nome">Nome</label>
                            </div>
                            <div className="form-label-group">
                                <Input required value={rua} placeholder="Rua" type="text" className="form-control"
                                    id="rua" onChange={this.onChange} />
                                <label htmlFor="rua">Rua</label>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6">
                            <div className="form-label-group">
                                <Input required value={codigoPostal} placeholder="Código Postal" type="text" className="form-control"
                                    id="codigoPostal" onChange={this.onChange} />
                                <label htmlFor="codigoPostal">Código Postal</label>
                            </div>
                        </Col>
                        <Col sm="6">
                            <div className="form-label-group">
                                <Input required value={localidade} placeholder="Localidade" type="text" className="form-control"
                                    id="localidade" onChange={this.onChange} />
                                <label htmlFor="localidade">Localidade</label>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row >
        );
    }

}

export default Entrega;