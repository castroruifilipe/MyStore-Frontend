import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
import NumericInput from 'react-numeric-input';
import { CardDeck } from 'reactstrap';
import FaTruck from 'react-icons/lib/fa/truck';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { formatterPrice } from '../../constants/formatters';
import { Link } from 'react-router-dom';

import Produto from '../../components/Produto';
import * as servicesProduto from '../../services/produtos';
import * as servicesCarrinho from '../../services/carrinho';
import * as routes from '../../constants/routes';

import './style.css';

class DetalhesProduto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            error: null,
            produto: {},
            relacionados: [],
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillMount() {
        this.getProduto(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.getProduto(this.props.match.params.id)
            window.scrollTo(0, 0);
        }

    }

    getProduto = (id) => {
        servicesProduto.getProduto(id)
            .then(response => {
                this.setState({ produto: response.data });
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                    this.setState({ error: error.response.data.message });
                } else {
                    console.error(error);
                }
            });
        servicesProduto.getRelacionados(id, 5)
            .then(response => {
                this.setState({ relacionados: response.data });
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

    makeProdutosRelacionados = (rows) => {
        this.state.relacionados.forEach(produto => {
            rows.push(
                <Produto key={produto.codigo} produto={produto} />
            );
        });
    }

    comprar = () => {
        servicesCarrinho.addCarrinho(this.state.produto.codigo, this.state.value)
            .then(response => {
                this.props.carrinhoStore.setCarrinho(response.data);
                this.setState({
                    value: 1,
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

    onChange = (valueAsNumber, valueAsString, input) => {
        this.setState({
            value: valueAsNumber,
        })
    }

    render() {
        let rows = [];
        this.makeProdutosRelacionados(rows);
        let price;
        if (this.state.produto.precoPromocional !== 0) {
            price =
                <div>
                    <small className="strikethrough">{formatterPrice.format(this.state.produto.precoBase)}</small>
                    <strong> {formatterPrice.format(this.state.produto.precoPromocional)}</strong>
                </div>
        } else {
            price = <strong>{formatterPrice.format(this.state.produto.precoBase)}</strong>
        }

        let text;
        if (this.props.sessionStore.role !== "FUNCIONARIO") {
            text =
                <Row className="pt-5">
                    <Col md="2" >
                        <h5 className="centerLine">{price}</h5>
                    </Col>
                    <Col xs="2">
                        <NumericInput className="form-control"
                            min={1} max={this.state.produto.stock} precision={0}
                            value={this.state.value}
                            onChange={this.onChange}
                            size={6} />
                    </Col>
                    <Col md="4">
                        <Button color="success" className="btn-block" onClick={this.comprar}>
                            Adicionar <span className="hideComponent"> ao carrinho</span>
                        </Button>

                    </Col>
                    <Col md="4">
                        <FaTruck size="25" className="hideTruck" />
                        <span className="centerLine pl-2">
                            Stock: {this.state.produto.stock} unidades
                        </span>
                    </Col>
                </Row>
        } else {
            text =
                <Row className="pt-5">
                    <Col md="4" align="center" >
                        <h5 className="centerLine">{price}</h5>
                    </Col>
                    <Col md="4" >
                        <FaTruck size="25" className="hideTruck" />
                        <span className="centerLine pl-2">
                            Stock: {this.state.produto.stock} unidades
                        </span>
                    </Col>
                    <Col md="4" >
                        <Button color="primary" className="btn-block" tag={Link}  block to={routes.GESTAO_PRODUTOS + this.state.produto.codigo}>
                            Consultar <span className="hideComponent"> produto na loja</span>
                        </Button>
                    </Col>
                </Row>
        }


        return (
            <Container fluid className="custom-container">
                <Row className="pt-5">
                    <Col md="4" align="center">
                        <div>
                            <img src="https://i.imgur.com/t7DTziH.jpg" alt="Imagem do produto" className="img-fluid" />
                        </div>
                    </Col>
                    <Col md="8" >
                        <h3>{this.state.produto.nome}</h3>
                        <div className="d-inline-block text-justify pt-3">
                            {this.state.produto.descricao}
                        </div>
                        {text}
                    </Col>
                </Row>

                <Row className="mt-5">
                    <h4>Produtos relacionados</h4>
                </Row>
                <Row>
                    <CardDeck>
                        {rows}
                    </CardDeck>
                </Row>
            </Container>
        );
    }
}

export default compose(
    inject('carrinhoStore', 'sessionStore'),
    observer
)(DetalhesProduto);