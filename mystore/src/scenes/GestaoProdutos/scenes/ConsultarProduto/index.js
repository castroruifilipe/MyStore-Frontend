import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import PencilIcon from 'react-icons/lib/fa/edit';

import * as services from '../../../../services/produtos';
import { formatterPrice } from '../../../../constants/formatters';
import EditarProduto from '../EditarProduto';

class ConsultarProduto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            codigo: undefined,
            nome: undefined,
            categoria: undefined,
            stock: undefined,
            descricao: undefined,
            precoBase: undefined,
            valorDesconto: undefined,
            precoFinal: undefined,
            estatisticasVendas: {},
            modoEdicao: false,
        }
    }

    componentWillMount() {
        services.getProduto(this.props.match.params.codigo)
            .then(response => {
                let data = response.data;
                this.setState({
                    codigo: data.codigo,
                    nome: data.nome,
                    categoria: data.categoria,
                    stock: data.stock,
                    descricao: data.descricao,
                    precoBase: data.precoBase,
                    desconto: data.valorDesconto,
                    precoFinal: data.precoFinal,
                    estatisticasVendas: {
                        ...data.estatisticasVendas
                    },
                })
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

    guardar = () => {
        const dados = {};
        if (this.state.nome) {
            dados['nome'] = this.state.nome;
        }
        if (this.state.telemovel !== undefined) {
            dados['categoria'] = this.state.categoria;
        }
        if (this.state.contribuinte !== undefined) {
            dados['stock'] = this.state.stock;
        }
        if (this.state.rua !== undefined) {
            dados['descricao'] = this.state.descricao;
        }
        if (this.state.localidade !== undefined) {
            dados['precoBase'] = this.state.precoBase;
        }
        services.editarProduto(dados, this.props.sessionStore.accessToken)
            .then(response => {
                 console.log("success");
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

    editar = () => {
        this.setState({ modoEdicao: true })
    }

    cancelar = () => {
        this.setState({ modoEdicao: false, ...this.INITIAL_STATE })
    }


    render() {
        let {
            codigo,
            nome,
            categoria,
            stock,
            descricao,
            precoBase,
            desconto,
            precoFinal,
            estatisticasVendas
        } = this.state;
        if (codigo === undefined) {
            return null;
        }
        return (
            <Row className="ml-0">
                <Col>
                    <Row>
                        <Col>
                            <h3 className='headerColor'>Detalhes do Produto</h3>
                            <h6>Produto #{codigo}</h6>
                        </Col>
                        <Col align="center">
                            {
                                this.state.modoEdicao ?
                                    <div>
                                        <Button color="success" className="mr-2 block inline-md" style={{ width: '180px' }} onClick={this.guardar}>
                                            <PencilIcon className="mr-1" />
                                            Guardar
                                        </Button>
                                        <Button color="secondary" className="mr-2 block inline-md" style={{ width: '180px' }} onClick={this.cancelar}>
                                            Cancelar
                                        </Button>
                                    </div>
                                    :
                                    <Button color="primary" className="mr-2 block inline-md" style={{ width: '180px' }} onClick={this.editar}>
                                        <PencilIcon className="mr-1" />
                                        Editar Produto
                                    </Button>
                            }
                        </Col>
                    </Row>
                    {
                        this.state.modoEdicao ?
                            <EditarProduto produto={this.state} onChange={this.onChange} />
                            :
                            <div>
                                <Row className="mt-3">
                                    <Col>
                                        <h5>{nome}</h5>
                                        <h6><strong>Categoria:</strong> {categoria.descricao}</h6>
                                    </Col>
                                    <Col align="center">
                                        <h6><strong>Stock:</strong> {stock} unidades</h6>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col md="3" align="center">
                                        <div>
                                            <img src="https://i.imgur.com/t7DTziH.jpg" alt="Imagem do produto" className="img-fluid" />
                                        </div>
                                    </Col>
                                    <Col md="7">
                                        <div className="d-inline-block text-justify pt-3">
                                            {descricao}
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <span><strong>Preço Base:</strong> {formatterPrice.format(precoBase)}</span> <br />
                                    </Col>
                                    <Col>
                                        <span><strong>Desconto:</strong> {desconto === 0 ? 'Sem promoções associadas' : formatterPrice.format(desconto)}</span> <br />
                                    </Col>
                                    <Col>
                                        <span><strong>Preço Final:</strong> {formatterPrice.format(precoFinal)}</span>
                                    </Col>
                                </Row>

                                <Row className="mt-4">
                                    <Col>
                                        <h4 className='headerColor'>Análise de Vendas</h4>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        <span><strong>Número de unidades encomendadas:</strong> {estatisticasVendas.numeroEncomendas}</span> <br />
                                        <span><strong>Número de unidades vendidas em promoção:</strong> {estatisticasVendas.numeroVendasPromocao}</span> <br />
                                    </Col>
                                    <Col>
                                        <span><strong>Número de unidades efitivamente vendidas:</strong> {estatisticasVendas.numeroVendas}</span> <br />
                                        <p><strong>Total faturado:</strong> {formatterPrice.format(estatisticasVendas.totalFaturado)}</p>
                                    </Col>
                                </Row>
                            </div>}
                </Col>
            </Row>
        );
    }

}

export default compose(
    inject('sessionStore'),
    observer
)(ConsultarProduto);