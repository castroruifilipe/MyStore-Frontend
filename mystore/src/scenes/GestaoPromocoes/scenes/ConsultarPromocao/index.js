import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import * as services from '../../../../services/promocoes';

class ConsultarPromocao extends Component {

    constructor(props) {
        super(props);
        this.state = {
            promocao: undefined,
        }
    }

    componentWillMount() {
        services.getPromocao(this.props.match.params.id, this.props.sessionStore.accessToken)
            .then(response => this.setState({ promocao: response.data }))
            .catch(error => console.error(error.response));
    }

    render() {
        let promocao = this.state.promocao;
        if (!promocao) {
            return null;
        }
        return (
            <Row className="ml-0">
                <Col>
                    <Row>
                        <Col>
                            <h3>Detalhes da Promoção</h3>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            {/* <h4>{produto.nome}</h4>
                            <h6>Categoria:{produto.categoria.descricao}</h6> */}
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

export default compose(
    inject('sessionStore'),
    observer
)(ConsultarPromocao);