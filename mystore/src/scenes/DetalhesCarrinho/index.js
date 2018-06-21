import React, { Component } from 'react';
import { Row, Col, Container, Table } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { formatterPrice } from '../../constants/formatters';

import * as services from '../../services/carrinho';

class DetalhesCarrinho extends Component {

    constructor(props) {
        super(props);
        this.state = {
            carrinho: undefined,
        }
    }

    componentWillMount() {
        services.getCarrinho()
            .then(response => {
                this.setState({
                    carrinho: response.data
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

    makeRows = (rows) => {
        this.state.carrinho.linhasCarrinho.forEach((linha) => {
            rows.push(
                <tr key={linha.produto.codigo}>
                    <td className="text-center">{linha.produto.codigo}</td>
                    <td>{linha.produto.nome}</td>
                    <td className="text-center">{linha.quantidade}</td>
                    <td className="text-center">{formatterPrice.format(linha.produto.precoBase)}</td>
                    <td className="text-center">{formatterPrice.format(linha.produto.desconto)}</td>
                    <td className="text-center">{formatterPrice.format(linha.valorDesconto + linha.precoUnitario)}</td>
                </tr>
            );
        });
    }


    render() {
        let rows = [];
        let text = <h6>Não possui produtos no seu carrinho!</h6>
        if (this.state.carrinho === undefined) {
            return null;
        } else if (this.state.carrinho.linhasCarrinho.lenght !== 0) {
            this.makeRows(rows);
            text = rows;
        }
        return (
            <Container className="pt-5" style={{ minHeight: '60vh' }}>
                <Row>
                    <Col>
                        <h1>Carrinho de Compras</h1>
                    </Col>
                </Row>
                <Row className="pt-4">
                    <Table className="ml-2" borderless responsive>
                        <thead>
                            <tr>
                                <th className="text-center">Codigo</th>
                                <th style={{width: '23%'}}>Produto</th>
                                <th className="text-center">Quantidade</th>
                                <th className="text-center">Preco Unitário</th>
                                <th className="text-center">Desconto</th>
                                <th className="text-center">Sub-Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {text}
                        </tbody>
                    </Table>
                </Row>

            </Container>
        );

    }


}

export default compose(
    inject('carrinhoStore'),
    observer
)(DetalhesCarrinho);