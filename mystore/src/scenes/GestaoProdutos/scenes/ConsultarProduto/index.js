import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import * as services from '../../../../services/produtos';

class ConsultarProduto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            produto: undefined,
        }
    }

    componentWillMount() {
        services.getProduto(this.props.match.params.codigo)
            .then(response => {
                this.setState({ produto: response.data })
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
        let produto = this.state.produto;
        if (!produto) {
            return null;
        }
        return (
            <Row className="ml-0">
                <Col>
                    <Row>
                        <Col>
                            <h3>Detalhes do Produto</h3>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <h4>{produto.nome}</h4>
                            <h6>Categoria:{produto.categoria.descricao}</h6>
                        </Col>
                        <Col>
                            <Button color="primary">Editar Produto</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

}

export default ConsultarProduto;