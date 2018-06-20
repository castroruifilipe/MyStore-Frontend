import React, { Component } from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardBody, Badge, CardFooter, } from 'reactstrap';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import * as services from '../../services/carrinho';
import * as routes from '../../constants/routes';

class Produto extends Component {

    comprar = () => {
        services.addCarrinho(this.props.produto.codigo, 1)
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

    render() {
        let produto = this.props.produto;

        return (
            <Card key={produto.codigo} className="mb-3">
                <div className="position-absolute" style={{ right: '5px', top: '5px' }} >
                    <h5>
                        <Badge pill color="success" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                            {produto.precoBase} €
                        </Badge>
                    </h5>
                </div>

                <CardImg top width="100%" src="https://i.imgur.com/IpEsYSH.jpg" alt="Card image cap" />
                <CardBody>
                    <CardTitle>{produto.nome}</CardTitle>
                    <CardText>{produto.descricao}</CardText>
                </CardBody>
                <CardFooter className="d-flex justify-content-between">
                    <Button size="sm" tag={Link} to={routes.PRODUTO + produto.codigo}>Ver produto</Button>
                    <Button size="sm" color="success" onClick={this.comprar}>Comprar</Button>
                </CardFooter>
            </Card>
        );
    }

}

export default compose(
    inject('carrinhoStore'),
    observer
)(Produto);