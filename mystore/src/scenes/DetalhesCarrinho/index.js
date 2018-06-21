import React, { Component } from 'react';
import { Row, Col, Container, Table, Input } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { observe } from 'mobx';
import { compose } from 'recompose';
import { formatterPrice } from '../../constants/formatters';

import * as services from '../../services/carrinho';
import './style.css';

class DetalhesCarrinho extends Component {

    remover = (codigo) => {
        services.removeLinha(codigo)
            .then(response => {
                this.props.carrinhoStore.setCarrinho(response.data);
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

    onChangeQtd = (codigo, event) => {
        let x = event.target.value;
        console.log(codigo + ": " + x)
        this.props.carrinhoStore.setQuantidade(codigo, x);
    }


    makeRows = (carrinho, rows) => {
        carrinho.linhasCarrinho.forEach((linha) => {
            let desconto = 0;
            if (linha.produto.precoPromocional !== 0) {
                desconto = (linha.produto.precoBase - linha.produto.precoPromocional) * linha.quantidade;
            }
            rows.push(
                <tr key={linha.produto.codigo}>
                    <td className="pl-3" >{linha.produto.codigo}</td>
                    <td>{linha.produto.nome}</td>
                    <td className="centerElem">
                        <Input type="number" name="number" className="numeric" placeholder="qnt"
                            value={linha.quantidade} onChange={(e) => { this.onChangeQtd(linha.produto.codigo, e) }} />
                    </td>
                    <td className="text-center">{formatterPrice.format(linha.produto.precoBase)}</td>
                    <td className="text-center">{formatterPrice.format(linha.produto.precoBase * linha.quantidade)}</td>
                    <td className="text-center">{formatterPrice.format(desconto)}</td>
                    <td className="text-center">{formatterPrice.format(linha.subTotal)}</td>
                    <td className="centerElem hidden">
                        <button type="button" className="close" aria-label="Close" onClick={(e) => { this.remover(linha.produto.codigo, e) }}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </td>
                </tr>
            );
        });
    }


    render() {
        let rows = [];
        let carrinho = this.props.carrinhoStore.carrinho;
        let text = <h6>Não possui produtos no seu carrinho!</h6>
        if (carrinho.linhasCarrinho === undefined) {
            return null;
        } else if (carrinho.linhasCarrinho.length !== 0) {
            this.makeRows(carrinho, rows);
            text =
                <Table className="align-middle" borderless responsive>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th style={{ width: '23%' }}>Produto</th>
                            <th className="text-center">Quantidade</th>
                            <th className="text-center">Preco Unitário</th>
                            <th className="text-center">Preco</th>
                            <th className="text-center">Desconto</th>
                            <th className="text-center">Sub-Total</th>
                            <th className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
        }
        return (
            <Container className="pt-5" style={{ minHeight: '60vh' }}>
                <Row>
                    <Col>
                        <h1>Carrinho de Compras</h1>
                    </Col>
                </Row>
                <Row className="pt-4">
                    <Col className="ml-2 ">
                        {text}
                    </Col>
                </Row>

            </Container>
        );

    }


}

export default compose(
    inject('carrinhoStore'),
    observer
)(DetalhesCarrinho);