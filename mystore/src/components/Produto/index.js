import React, { Component } from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardBody, Badge, CardFooter, } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import * as routes from '../../constants/routes';

class Produto extends Component {

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
                    <Button size="sm" onClick={() => {this.props.history.push(routes.PRODUTO+produto.codigo)}} >Ver produto</Button>
                    <Button size="sm" color="success">Comprar</Button>
                </CardFooter>
            </Card>
        );
    }

}

export default withRouter(Produto);