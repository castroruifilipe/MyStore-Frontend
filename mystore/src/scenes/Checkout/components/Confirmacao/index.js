import React, { Component } from 'react';
import { Row, Col, Table, Button } from 'reactstrap';

import { formatterPrice } from '../../../../constants/formatters';
import metodoPagEnum from '../../../../constants/metodoPagEnum';

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

                <Row className="mt-3 pl-3">
                    <Col md="4">
                        <h6><strong>Morada de Entrega</strong></h6>
                        <span>{this.props.morada.nome}</span><br />
                        <span>{this.props.morada.rua}</span><br />
                        <span>{this.props.morada.codigoPostal} {this.props.morada.localidade}</span>
                    </Col>
                    <Col md="4">
                        <h6><strong>Método de Pagamento</strong></h6>
                        <span> {metodoPagEnum[this.props.metodo]}</span><br />
                    </Col>
                    <Col md="3">
                        <h6><strong>Resumo</strong></h6>
                        <div className="py-1 d-flex justify-content-between">
                            <span>Sub-Total</span>
                            <span>{formatterPrice.format(this.props.resumo.subTotal)}</span>
                        </div>
                        <div className="py-1 d-flex justify-content-between">
                            <span>Portes</span>
                            <span>{formatterPrice.format(this.props.resumo.portes)}</span>
                        </div>
                        <div className="py-1 d-flex justify-content-between">
                            <span>Total</span>
                            <span>{formatterPrice.format(this.props.resumo.total)}</span>
                        </div>
                        <Button block color='success' className="mt-3" onClick={this.props.confirmar}>
                            Confirmar
                        </Button>
                        <Button block color='secondary' size="sm" onClick={this.props.previous}>
                            Voltar
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default Confirmacao;