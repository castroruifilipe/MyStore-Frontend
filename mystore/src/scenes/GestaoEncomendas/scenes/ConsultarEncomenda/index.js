import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { formatterPrice } from '../../../../constants/formatters';
import estadoEnum from '../../../../constants/estadoEnum';
import metodoPagEnum from '../../../../constants/metodoPagEnum';
import * as services from '../../../../services/encomendas';

class ConsultarEncomenda extends Component {

    constructor(props) {
        super(props);
        this.state = {
            encomenda: undefined,
        }
    }

    componentWillMount() {
        services.getEncomenda(this.props.match.params.id, this.props.sessionStore.accessToken)
            .then(response => {
                let data = response.data;
                this.setState({
                    encomenda: {
                        numero: data.id,
                        data: new Date(data.dataRegisto).toLocaleString(),
                        moradaEntrega: data.moradaEntrega,
                        subTotal: data.total - data.portes,
                        portes: data.portes,
                        total: data.total,
                        metodo: data.metodoPagamento,
                        estado: data.estado,
                        dataLimitePagamento: data.dataLimitePagamento,
                        dataPagamento: (new Date(data.dataPagamento).toLocaleString() || ""),
                        linhasEncomenda: data.linhasEncomenda,
                    }
                });
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
        if (this.state.encomenda.linhasEncomenda !== undefined) {
            this.state.encomenda.linhasEncomenda.forEach(element => {
                produtos.push(
                    <tr key={element.id}>
                        <td>{element.produto.codigo}</td>
                        <td>{element.produto.nome}</td>
                        <td>{element.quantidade}</td>
                        <td>{formatterPrice.format(element.precoUnitario)}</td>
                        <td>{formatterPrice.format(element.precoUnitario * element.quantidade)}</td>
                        <td>{formatterPrice.format(element.valorDesconto * element.quantidade)}</td>
                        <td>{formatterPrice.format((element.precoUnitario - element.valorDesconto) * element.quantidade)}</td>
                    </tr>
                );
            });
        }
    }

    render() {
        let encomenda = this.state.encomenda;
        if (!encomenda) {
            return null;
        }

        let pagamento;
        if (this.state.encomenda.estado === 'AGUARDA_PAGAMENTO') {
            pagamento =
                <div>
                    <p className="headerColor"><strong>Data limite de pagamento</strong></p>
                    <span>{this.state.encomenda.dataLimitePagamento}</span>
                </div>
        } else if (this.state.encomenda.estado !== 'CANCELADA') {
            pagamento =
                <div>
                    <p className="headerColor"><strong>Data de pagamento</strong></p>
                    <span>{this.state.encomenda.dataPagamento}</span>
                </div>
        }


        let produtos = [];
        this.makeProdutos(produtos);
        return (
            <Row>
                <Col>
                    <Row className="ml-0">
                        <h3>Detalhes da Encomenda</h3>
                    </Row>
                    <Row>
                        <Col md="4">
                            <h6>Encomenda nº {encomenda.numero}</h6>
                        </Col>
                        <Col md="4">
                            <span>Data de registo: {encomenda.data}</span>
                        </Col>
                    </Row>

                    <Row className="pt-4">
                        <Col md="4">
                            <p className="headerColor"><strong>Morada de Envio</strong></p>
                            <span>{encomenda.moradaEntrega.rua}</span><br />
                            <span>{encomenda.moradaEntrega.localidade}</span><br />
                            <span>{encomenda.moradaEntrega.codigoPostal}</span>
                        </Col>
                        <Col md="4">
                            <p className="headerColor"><strong>Resumo</strong></p>
                            <span><strong>Sub-Total: </strong>{formatterPrice.format(encomenda.subTotal)}</span><br />
                            <span><strong>Portes: </strong>{formatterPrice.format(encomenda.portes)}</span><br />
                            <span><strong>Total: </strong>{formatterPrice.format(encomenda.total)}</span>
                        </Col>
                    </Row>

                    <Row className="pt-4">
                        <Col md="4">
                            <p className="headerColor"><strong>Método de pagamento</strong></p>
                            <span>{metodoPagEnum[this.state.encomenda.metodo]}</span>
                        </Col>
                        <Col md="4">
                            <p className="headerColor"><strong>Estado</strong></p>
                            <span>{estadoEnum[this.state.encomenda.estado]}</span>
                        </Col>
                        <Col md="4">
                            {pagamento}
                        </Col>
                    </Row>

                    <Row className="pt-5">
                        <Table className="ml-2">
                            <thead style={{ backgroundColor: "#efefef" }}>
                                <tr>
                                    <th>Código</th>
                                    <th>Designação</th>
                                    <th>Quantidade</th>
                                    <th>Preco Unitário</th>
                                    <th>Preco</th>
                                    <th>Desconto</th>
                                    <th>Sub-Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtos}
                            </tbody>
                        </Table>
                    </Row>
                </Col>
            </Row>
        );
    }

}

export default compose(
    inject('sessionStore'),
    observer
)(ConsultarEncomenda);