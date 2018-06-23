import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap';

import { formatterPrice } from '../../../../constants/formatters';

class Confirmacao extends Component {


    makeRows = (rows) => {
        this.props.carrinho.linhasCarrinho.forEach((linha) => {
            let desconto = 0;
            if (linha.produto.precoPromocional !== 0) {
                desconto = (linha.produto.precoBase - linha.produto.precoPromocional) * linha.quantidade;
            }
            rows.push(
                <tr key={linha.produto.codigo}>
                    <td className="pl-3" >{linha.produto.codigo}</td>
                    <td>{linha.produto.nome}</td>
                    <td className="centerElem">{linha.quantidade} </td>
                    <td className="text-center">{formatterPrice.format(linha.produto.precoBase)}</td>
                    <td className="text-center">{formatterPrice.format(linha.produto.precoBase * linha.quantidade)}</td>
                    <td className="text-center">{formatterPrice.format(desconto)}</td>
                    <td className="text-center">{formatterPrice.format(linha.subTotal)}</td>
                </tr>
            );
        });
    }

    render() {
        console.log(this.props.carrinho);
        let carrinho = this.props.carrinho;
        let rows = [];
        this.makeRows(rows);

        return (
            <div>
                <h5>Confirmação</h5>
                <Row>
                    <Col>
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
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default Confirmacao;