import React, { Component } from 'react';
import { Row, Col, Container, Table, Button } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { compose } from 'recompose';
import PencilIcon from 'react-icons/lib/fa/edit';
import { formatterPrice } from '../../constants/formatters';
import EditarCarrinho from './EditarCarrinho';
import { Link } from 'react-router-dom';

import * as services from '../../services/carrinho';
import * as routes from '../../constants/routes';
import './style.css';

class DetalhesCarrinho extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modoEdicao: false,
            quantidades: {},
        };
    }

    editar = () => {
        this.setState({ modoEdicao: true })
    }

    guardar = () => {
        services.updateCarrinho(this.state.quantidades)
            .then(response => {
                this.props.carrinhoStore.setCarrinho(response.data);
                this.setState({ modoEdicao: !this.state.modoEdicao });
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

    cancelar = () => {
        this.setState({ modoEdicao: false, quantidades: {} })
    }

    limpar = () => {
        services.limpar()
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


    onChangeQuantidade = (codigo, quantidade) => {
        this.setState({
            quantidades: { ...this.state.quantidades, [codigo]: quantidade }
        });
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
        let carrinho = this.props.carrinhoStore.carrinho;
        let text = <h5>Não possui produtos no seu carrinho!</h5>
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
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
        }

        let botoes = "";
        if (carrinho.linhasCarrinho.length !== 0) {
            botoes =
                <div>
                    <button type="button" className="btn btn-primary mr-2 block inline-md" style={{ width: '180px' }} onClick={this.editar}>
                        <PencilIcon className="mr-1" />
                        Editar carrinho
                    </button>
                    <button type="button" className="btn btn-danger block inline-md" style={{ width: '180px' }} onClick={this.limpar}>
                        <PencilIcon className="mr-1" />
                        Limpar carrinho
                    </button>
                </div>
        }
        return (
            <Container className="pt-5" style={{ minHeight: '60vh' }}>
                <Row>
                    <Col>
                        <h1>Carrinho de Compras</h1>
                    </Col>
                </Row>
                <Row>
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
                                botoes
                        }
                    </Col>
                </Row>
                <Row className="pt-4">
                    <Col className="ml-2 ">
                        {
                            this.state.modoEdicao ?
                                <EditarCarrinho carrinho={toJS(this.props.carrinhoStore.carrinho)} onChangeQnt={this.onChangeQuantidade} />
                                :
                                text
                        }
                    </Col>
                </Row>
                {
                    (!this.state.modoEdicao && carrinho.linhasCarrinho.length !== 0) ?
                        <Row className="p-4">
                            <Col>
                                <div className="float-right p-3" style={{ boxShadow: '0 0 4px 1px rgba(0, 0, 0, 0.3)', width: "250px" }}>
                                    <div className="p-2">
                                        <strong>Sub-Total</strong> <span className="float-right">{formatterPrice.format(carrinho.totalSemDesc)}</span><br />
                                    </div>
                                    <div className="px-2">
                                        <strong>Desconto</strong> <span className="float-right">{formatterPrice.format(carrinho.totalDesconto)}</span><br />
                                    </div>
                                    <div className="p-2">
                                        <strong>Total </strong>  <span className="float-right">{formatterPrice.format(carrinho.total)}</span><br />
                                    </div>
                                    <Button className="btn btn-success btn-block my-2" tag={Link} to={ (this.props.sessionStore.role) ? routes.CHECKOUT : routes.LOGIN}>Checkout</Button>
                                </div>
                            </Col>
                        </Row>

                        : ""
                }
            </Container>
        );

    }


}

export default compose(
    inject('carrinhoStore', 'sessionStore'),
    observer
)(DetalhesCarrinho);