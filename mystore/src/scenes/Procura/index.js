import React, { Component } from 'react';
import { Container, Row, Col, CardDeck } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroller';
import ScrollUpButton from "react-scroll-up-button";

import * as services from '../../services/produtos';
import Produto from '../../components/Produto';

class Procura extends Component {

    constructor(props) {
        super(props);
        this.state = {
            produtos: [],
            nPaginas: 0,
            paginaAtual: 1,
            moreProdutos: true,
        };
    }

    // componentWillMount() {
    //     let servico;
    //     let string = this.props.match.params.string;
    //     let categoria = this.props.match.params.categoria;
    //     if (categoria !== undefined) {
    //         servico = services.getProdutosProcuraCategoria(categoria, string)
    //     } else {
    //         servico = services.getProdutosProcura(string)
    //     }
    //     servico
    //         .then(response => {
    //             this.setState({ produtos: response.data });
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         })
    // }

    makeProdutos = (rows) => {
        for (let i = 0; i < this.state.produtos.length; i++) {
            rows.push(
                <Produto key={this.state.produtos[i].codigo} produto={this.state.produtos[i]} />
            )

            if ((i + 1) % 2 === 0) {
                rows.push(<div className="w-100 d-none d-md-block d-lg-none"></div>);
                rows.push(<div className="w-100 d-none d-sm-block d-md-none"></div>);
            }
            if ((i + 1) % 3 === 0) {
                rows.push(<div className="w-100 d-none d-lg-block d-xl-none"></div>);
            }
            if ((i + 1) % 4 === 0) {
                rows.push(<div className="w-100 d-none d-xl-block"></div>);
            }
        }
    }

    loadMoreProdutos = () => {
        let servico;
        let string = this.props.match.params.string;
        let categoria = this.props.match.params.categoria;
        if (categoria !== undefined) {
            servico = services.getProdutosProcuraCategoria(categoria, string, this.state.paginaAtual, 10)
        } else {
            servico = services.getProdutosProcura(string, this.state.paginaAtual, 10)
        }
        let self = this;
        servico
            .then(response => {
                if (response.data.length === 0) {
                    this.setState({ moreProdutos: false });
                    return;
                }

                let produtos = self.state.produtos;
                response.data.forEach((produto) => {
                    produtos.push(produto);
                })

                self.setState({ produtos: produtos, paginaAtual: self.state.paginaAtual + 1 });
            })
            .catch(error => {
                console.error(error);
            })
    }

    render() {
        let rows = [];
        console.log(this.state);
        let text = <h6>Não foram encontrados resultados para a procura que efetuou.</h6>
        if (this.state.produtos.length !== 0) {
            this.makeProdutos(rows);
            text =
                <CardDeck>
                    {rows}
                </CardDeck>
        }
        const loader = <div className="loader">Loading ...</div>;

        return (
            <div>
                <ScrollUpButton />
                <Container style={{ minHeight: "60vh" }}>
                    <Row className="mt-5">
                        <Col className="pl-0">
                            <h4>Pesquisa por "{this.props.match.params.string}":</h4>
                            <h6>{this.props.match.params.categoria !== undefined ? "Categoria: " + this.props.match.params.categoria : ""}</h6>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadMoreProdutos}
                            hasMore={this.state.moreProdutos}
                            loader={loader}>
                            {text}
                        </InfiniteScroll>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Procura;
