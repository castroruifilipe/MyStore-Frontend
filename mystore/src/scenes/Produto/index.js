import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Container, Button } from 'reactstrap';
import NumericInput from 'react-numeric-input';
import { Card, CardImg, CardTitle, CardText, CardSubtitle, CardBody, CardDeck } from 'reactstrap';
import FaTruck from 'react-icons/lib/fa/truck';
import './style.css';

class Produto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            error: null,
            produto: {
                codigo: 1223,
                nome: 'The Essence of Software Engineering',
                descricao: 'This book is open access under a CC BY 4.0 license.This book '
                    + 'includes contributions by leading researchers and industry thought'
                    + 'leaders on various topics related to the essence of software engineering'
                    + 'and their application in industrial projects. It offers a broad overview'
                    + 'of research findings dealing with current practical software engineering'
                    + 'issues and also pointers to potential future developments.',
                precoBase: 59.99,
                stock: 3,
                iva: 0.06
            }
        };
    }

    getProdutos() {
        let produtos = [];
        let produto = {
            codigo: 1223,
            nome: 'The Essence of Software Engineering',
            descricao: 'This book is open access under a CC BY 4.0 license.This book '
                + 'includes contributions by leading researchers and industry thought'
                + 'leaders on various topics related to the essence of software engineering'
                + 'and their application in industrial projects. It offers a broad overview'
                + 'of research findings dealing with current practical software engineering'
                + 'issues and also pointers to potential future developments.',
            precoBase: 59.99,
            stock: 3,
            iva: 0.06
        }
        //retirar construção produto com +i;
        for (let i = 0; i < 4; i++) {
            produtos[i] = { ...produto, codigo: produto.codigo + i };
        }
        return produtos;
    }

    makeProdutosRelacionados = (rows) => {
        let produtos = this.getProdutos();
        produtos.forEach(produto => {
            rows.push(
                <Card key={produto.codigo}>
                    <CardImg top width="100%" src="https://i.imgur.com/IpEsYSH.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{produto.nome}</CardTitle>
                        <CardSubtitle>{produto.precoBase}€</CardSubtitle>
                        <CardText>{produto.descricao}</CardText>
                        <Button>Ver produto</Button>
                    </CardBody>
                </Card>
            );
        });
    }



    render() {
        // let produto = this.props.produtosStore.produtos.get(this.props.match.params.id);
        let rows = [];
        this.makeProdutosRelacionados(rows);
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
                        <Row className="pt-5">
                            <Col md="2" >
                                <h5 className="centerLine">{this.state.produto.precoBase}€</h5>
                            </Col>
                            <Col xs="2">
                                <NumericInput className="form-control"
                                    min={0} max={this.state.produto.stock} precision={0}
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    size={6} />
                            </Col>
                            <Col md="4">
                                <Button color="success" className="btn-block">
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

export default withRouter(Produto);