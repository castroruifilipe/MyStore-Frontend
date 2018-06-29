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
import GestaoProdutos from '../GestaoProdutos';
import ConsultarProduto from '../GestaoProdutos/scenes/ConsultarProduto';
import GestaoCategorias from '../GestaoCategorias';
import GestaoPromocoes from '../GestaoPromocoes';
import ConsultarPromocao from '../GestaoPromocoes/scenes/ConsultarPromocao';
import CriarPromocao from '../GestaoPromocoes/scenes/CriarPromocao';
import NovoProduto from '../GestaoProdutos/scenes/NovoProduto';

class Gestor extends Component {

    render() {
        return (
            <Container fluid style={{ minHeight: '90vh' }} className="custom-container">
                <Row>
                    <Col md="3">
                        <SideMenu />
                    </Col>
                    <Col md="9" className="mt-5">
                        <Route exact path={routes.GESTOR_HOME} component={GestorHome} />
                        <Route exact path={routes.GESTAO_CLIENTES} component={GestaoClientes} />
                        <Route exact path={routes.GESTAO_CLIENTES + ':id'} component={ConsultarCliente} />
                        <Route exact path={routes.GESTAO_ENCOMENDAS} component={GestaoEncomendas} />
                        <Route exact path={routes.GESTAO_ENCOMENDAS + ':id'} component={ConsultarEncomenda} />
                        <Route exact path={routes.GESTAO_PRODUTOS} component={GestaoProdutos} />
                        <Route exact path={routes.GESTAO_PRODUTOS + ':codigo'} component={ConsultarProduto} />
                        <Route exact path={routes.GESTAO_PRODUTOS + '/criar'} component={NovoProduto} />
                        <Route exact path={routes.GESTAO_PROMOCOES} component={GestaoPromocoes} />
                        <Route exact path={routes.GESTAO_PROMOCOES + '/:id'} component={ConsultarPromocao} />
                        <Route exact path={routes.GESTAO_PROMOCOES_CRIAR} component={CriarPromocao} />
                        <Route exact path={routes.GESTAO_CATEGORIAS} component={GestaoCategorias} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Gestor;