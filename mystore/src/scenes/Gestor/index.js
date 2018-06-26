import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Route } from 'react-router-dom';

import * as routes from '../../constants/routes';
import SideMenu from '../../components/SideMenu';
import GestorHome from '../GestorHome';

import ConsultarCliente from '../GestaoClientes/scenes/ConsultarCliente';
import GestaoClientes from '../GestaoClientes';
import GestaoEncomendas from '../GestaoEncomendas';
import ConsultarEncomenda from '../GestaoEncomendas/scenes/ConsultarEncomenda';

class Gestor extends Component {

    render() {
        return (
            <Container fluid style={{ minHeight: '60vh' }} className="custom-container">
                <Row>
                    <Col md="3">
                        <SideMenu />
                    </Col>
                    <Col md="9" className="mt-4">
                        <Route exact path={routes.GESTOR_HOME} component={GestorHome} />
                        <Route exact path={routes.GESTAO_CLIENTES} component={GestaoClientes} />
                        <Route exact path={routes.GESTAO_CLIENTES + ':id'} component={ConsultarCliente} />
                        <Route exact path={routes.GESTAO_ENCOMENDAS} component={GestaoEncomendas} />
                        <Route exact path={routes.GESTAO_ENCOMENDAS + ':id'} component={ConsultarEncomenda} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Gestor;