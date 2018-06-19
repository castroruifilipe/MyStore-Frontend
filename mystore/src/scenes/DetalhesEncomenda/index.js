import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { Container, Row, Col, Table } from 'reactstrap';
import * as services from '../../services/encomendas';

import './style.css';

class DetalhesEncomenda extends Component {

    constructor(props) {
        super(props);
        this.state = {
            encomenda: {
                linhasEncomenda: [],
            },
        }
    }

    componentWillMount() {
        services.getEncomenda(this.props.match.params.numero, this.props.sessionStore.accessToken)
            .then(response => {
                console.log("encomendas");
                console.log(response.data);
                this.setState({ encomenda: response.data });
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

    makeProdutos = (produtos) => {
        this.state.encomenda.linhasEncomenda.forEach(element => {
            produtos.push(
                <tr>
                    <td>{element.produto.codigo}</td>
                    <td>{element.produto.designacao}</td>
                    <td>{element.quantidade}</td>
                    <td>{element.preco}</td>
                    <td>{element.valorDesconto}</td>
                    <td>{element.valorDesconto+element.preco}</td>
                </tr>
            );
        });
    }

    render() {
        let produtos = [];
        this.makeProdutos(produtos);
        return (
            <Container className="pt-5" style={{ minHeight: '75vh' }}>
                <Row className="ml-0">
                    <h3>Detalhes da Encomenda</h3>
                </Row>
                <Row>
                    <Col md="4">
                        <h6>Encomenda nº {this.state.encomenda.numero}</h6>
                    </Col>
                    <Col md="4">
                        <span>Tracking ID:{this.state.encomenda.trackingID}</span>
                    </Col>
                    <Col md="4">
                        <span>Data:{this.state.encomenda.data}</span>
                    </Col>
                </Row>

                <Row className="pt-4">
                    <Col md="4">
                        <p className="colorHeader"><strong>Morada de Entrega</strong></p>
                        <span>{this.state.encomenda.moradaEntrega}</span>
                    </Col>
                    <Col md="4">
                        <p className="colorHeader"><strong>Morada de Faturação</strong></p>
                        <span>{this.state.encomenda.moradaFaturacao}</span>
                    </Col>
                    <Col md="4">
                        <p className="colorHeader"><strong>Resumo</strong></p>
                        <span><strong>Sub-Total:</strong>{this.state.encomenda.moradaFaturacao}</span><br />
                        <span><strong>Portes:</strong>{this.state.encomenda.portes}</span><br />
                        <span><strong>Total:</strong>{this.state.encomenda.total}</span>
                    </Col>
                </Row>

                <Row className="pt-4">
                    <Col md="4">
                        <p className="colorHeader"><strong>Método de pagamento</strong></p>
                        <span>{this.state.encomenda.metodo}</span>
                    </Col>
                    <Col md="4">
                        <p className="colorHeader"><strong>Estado</strong></p>
                        <span>{this.state.encomenda.estado}</span>
                    </Col>
                    <Col md="4">
                        <p className="colorHeader"><strong>Data de Pagamento</strong></p>
                        <span>{this.state.encomenda.dataPagamento}</span>
                    </Col>
                </Row>

                <Row className="pt-5">
                    <Table hover className="ml-2">
                        <thead style={{ backgroundColor: "#efefef" }}>
                            <tr>
                                <th>Código</th>
                                <th>Designação</th>
                                <th>Quantidade</th>
                                <th>Preco Unitário</th>
                                <th>Desconto</th>
                                <th>Sub-Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        );
    }

}

export default compose(
    inject('sessionStore'),
    observer
)(DetalhesEncomenda);