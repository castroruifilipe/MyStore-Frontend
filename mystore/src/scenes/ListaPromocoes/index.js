import React, { Component } from 'react';
import { Container, Row, CardDeck } from 'reactstrap';

import * as services from '../../services/produtos';
import Produto from '../../components/Produto';

class ListaPromocoes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            produtos: [],
        };
    }

    componentWillMount() {
        services.getNovidades(20)
            .then(response => {
                this.setState({ produtos: response.data});
            })
            .catch(error => {
                console.error(error);
            })
    }

    makeNovidades = (rows) => {
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

    render() {
        let rows = [];
        this.makeNovidades(rows);

        return (
            <div>
                <Container >
                    <Row className="mt-5">
                        <h4>Promoções</h4>
                    </Row>
                    <CardDeck>
                        {rows}
                    </CardDeck>
                </Container>
            </div>
        );
    }
}

export default ListaPromocoes;
