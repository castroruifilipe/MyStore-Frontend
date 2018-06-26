import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';

import * as routes from '../../constants/routes';
import './style.css';

class SideMenu extends Component {

    render() {

        return (
            <div>
                <Nav className="mx-auto mt-5 p-3 side-menu" vertical pills>
                    <h5 className="ml-3 font-weight-bold" onClick={(e) => {this.props.history.push(routes.GESTOR_HOME)}} style={{cursor: 'pointer'}}>Gestão de Loja</h5>
                    <NavItem className="mt-2">
                        <NavLink tag={Link} to={routes.GESTAO_CLIENTES}>Gestão de clientes</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to={routes.GESTAO_ENCOMENDAS}>Gestão de encomendas</NavLink>
                    </NavItem>
                    <br className="nav-break" />
                    <NavItem>
                        <NavLink tag={Link} to={routes.GESTAO_PRODUTOS}>Gestão de produtos</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to={routes.GESTAO_PROMOCOES}>Gestão de promoções</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to={routes.GESTAO_CATEGORIAS}>Gestão de categorias</NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }

}

export default withRouter(SideMenu);