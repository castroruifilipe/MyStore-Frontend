import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import * as routes from '../../constants/routes';

class SideMenu extends Component {

    render() {

        return (
            <Nav className="ml-auto mt-5 side-menu" vertical pills>
            <h6 class="ml-3 font-weight-bold"> Opções de gestão </h6>
            <NavItem className="mt-2">
                <NavLink tag={Link} to={routes.GESTAO_CLIENTES}>Gestão de clientes</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to={routes.GESTAO_ENCOMENDAS}>Gestão de encomendas</NavLink>
            </NavItem>
            <br class="nav-break"/>
            <NavItem>
                <NavLink className="side-menu-link" tag={Link} to={routes.GESTAO_PRODUTOS}>Gestão de produtos</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="side-menu-link" tag={Link} to={routes.GESTAO_PROMOCOES}>Gestão de promoções</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="side-menu-link" tag={Link} to={routes.GESTAO_CATEGORIAS}>Gestão de categorias</NavLink>
            </NavItem>
        </Nav>
        );
    }

}

export default withRouter(SideMenu);
