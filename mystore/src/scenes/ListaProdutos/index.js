import React, { Component } from 'react';
import { Container, Row, CardColumns, CardDeck } from 'reactstrap';
import withRouter from 'react-router-dom/withRouter';
import InfiniteScroll from 'react-infinite-scroller';

import * as services from '../../services/produtos';
import Produto from '../../components/Produto';
import './style.css';

class ListaProdutos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            produtos: [],
            nPaginas: 0,
            paginaAtual: 1,
            moreProdutos: true,
        };
    }

    makeProdutos = (rows) => {
        for (let i = 0; i < this.state.produtos.length; i++) {
            rows.push(
                <Produto produto={this.state.produtos[i]} />
            )
            // if ((i + 1) % 2 == 0) {
            //     rows.push(<div class="w-100 d-none d-sm-block d-md-none"></div>)
            // }
            // if ((i + 1) % 3 == 0) {
            //     rows.push(<div class="w-100 d-none d-md-block d-lg-none"></div>)
            // }
            // if ((i + 1) % 4 == 0) {
            //     rows.push(<div class="w-100 d-none d-lg-block d-xl-none"></div>)
            // }
            // if ((i + 1) % 5 == 0) {
            //     rows.push(<div class="w-100 d-none d-xl-block"></div>)
            // }



            if ((i + 1) % 2 == 0) {
                rows.push(<div class="w-100 d-none d-md-block d-lg-none"></div>)
                rows.push(<div class="w-100 d-none d-sm-block d-md-none"></div>)
            }
            if ((i + 1) % 3 == 0) {
                rows.push(<div class="w-100 d-none d-lg-block d-xl-none"></div>)
            }
            if ((i + 1) % 4 == 0) {
                rows.push(<div class="w-100 d-none d-xl-block"></div>)
            }
        }
    }

    loadMoreProdutos = () => {
        let self = this;

        let categoria = this.props.match.params.categoria;
        services.getProdutos(categoria, this.state.paginaAtual, 10)
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
        this.makeProdutos(rows);

        const loader = <div className="loader">Loading ...</div>;

        return (
            <div>
                <Container >
                    <Row className="mt-5">
                        <h4>Lista de Produtos</h4>
                    </Row>

                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadMoreProdutos}
                        hasMore={this.state.moreProdutos}
                        loader={loader}>
                        <CardDeck>
                            {rows}
                        </CardDeck>
                    </InfiniteScroll>




                </Container>
            </div>
        );
    }
}

export default withRouter(ListaProdutos);
