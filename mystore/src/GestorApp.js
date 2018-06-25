import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { Container } from 'reactstrap';

import SideMenu from './components/SideMenu';
import GestorHome from './scenes/GestorHome';

import * as routes from './constants/routes';


class AppAuth extends Component {

    render() {
        return (
            <div>
                <SideMenu />
                <Container fluid id="content" className="pageContent">
                    <Redirect to={routes.GESTOR_HOME} />
                    <Switch>
                        <Route exact path={routes.GESTOR_HOME} component={GestorHome} />
                    </Switch>
                </Container>
            </div>

        );
    }
}

export default AppAuth;