import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import PencilIcon from 'react-icons/lib/fa/edit';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import * as services from '../../../../services/produtos';
import { formatterPrice } from '../../../../constants/formatters';
import EditarProduto from '../EditarProduto';
import ApagarProduto from '../ApagarProduto';

class ConsultarProduto extends Component {

    INITIAL_STATE = {
        nome: undefined,
        categoria: undefined,
        stock: undefined,
        descricao: undefined,
        precoBase: undefined,
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.INITIAL_STATE,
            produto: undefined,
            modoEdicao: false,
            modal: false,
        }
    }

    componentWillMount() {
        services.getProduto(this.props.match.params.codigo)
            .then(response => this.setState({ produto: response.data }))
            .catch(error => console.error(error.response));
    }

    guardar = () => {
        const dados = {
            codigo: this.state.produto.codigo,
        };
        if (this.state.nome) {
            dados['nome'] = this.state.nome;
        }
        if (this.state.categoria !== undefined) {
            dados['categoria'] = this.state.categoria;
        }
        if (this.state.stock !== undefined) {
            dados['stock'] = this.state.stock;
        }
        if (this.state.descricao !== undefined) {
            dados['descricao'] = this.state.descricao;
        }
        if (this.state.precoBase !== undefined) {
            dados['precoBase'] = this.state.precoBase;
        }
        services.editarProduto(dados, this.props.sessionStore.accessToken)
            .then(response => this.setState({ produto: response.data, modoEdicao: false }))
            .catch(error => console.log(error.response));
    }

    editar = () => {
        this.setState({ modoEdicao: true })
    }

    cancelar = () => {
        this.setState({ modoEdicao: false, ...this.INITIAL_STATE })
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }

    onChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        if (!this.state.produto) {
            return null;
        }
        let {
            codigo,
            nome,
            categoria,
            stock,
            descricao,
            precoBase,
            valorDesconto,
            precoFinal,
            estatisticasVendas
        } = this.state.produto;

        return (
            <div>
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
                                        <div>
                                            <Button color="primary" className="mr-2 block inline-md" style={{ width: '180px' }} onClick={this.editar}>
                                                <PencilIcon className="mr-1" />
                                                Editar Produto
                                        </Button>
                                            <Button color="danger" className="mr-2 block inline-md" style={{ width: '180px' }} onClick={this.toggle}>
                                                <PencilIcon className="mr-1" />
                                                Remover Produto
                                        </Button>
                                        </div>
                                }
                            </Col>
                        </Row>
                        {
                            this.state.modoEdicao ?
                                <EditarProduto produto={this.state.produto} onChange={this.onChange} />
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
                                            <img src={this.state.produto.imageURL} alt="Imagem do produto" className="img-fluid" />
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
                                            <span><strong>Desconto:</strong> {valorDesconto === 0 ? 'Sem promoções associadas' : formatterPrice.format(valorDesconto)}</span> <br />
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
                <ApagarProduto modal={this.state.modal} produto={this.state.produto.codigo} toggle={this.toggle} />
            </div>
        );
    }

}


export default compose(
    inject('sessionStore'),
    observer
)(ConsultarProduto);