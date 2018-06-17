import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

import withAuthentication from './high-order_components/withAuthentication';
import Home from './scenes/Home';
import NavBar from './components/NavBar';
import Login from './scenes/Login';
import Registar from './scenes/Registar';
import Produto from './scenes/Produto';
import Conta from './scenes/Conta';
import Footer from './components/Footer'
import * as routes from './constants/routes';
import './App.css';
import ListaProdutos from './scenes/ListaProdutos';

class App extends Component {

	render() {
		return (
			<div className="App">
				<BrowserRouter >
					<div>
						<NavBar />
						<Switch>
							<Route exact path={routes.HOME} component={Home} />
							<Route exact path={routes.LOGIN} component={Login} />
							<Route exact path={routes.REGISTAR} component={Registar} />
							<Route path={routes.PRODUTO + ':id'} component={Produto} />
							<Route path={routes.LISTA_PRODUTOS + ':categoria'} component={ListaProdutos} />
							<Route path={routes.CONTA} component={Conta}/>
						</Switch>
						<Footer />
					</div>
				</BrowserRouter >
			</div>
		);
	}

}

export default withAuthentication(App);
