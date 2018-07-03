import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, withRouter } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';

import withAuthentication from './high-order_components/withAuthentication';
import Home from './scenes/Home';
import NavBar from './components/NavBar';
import Login from './scenes/Login';
import Registar from './scenes/Registar';
import DetalhesProduto from './scenes/DetalhesProduto';
import Conta from './scenes/Conta';
import Novidades from './scenes/ListaNovidades';
import Promocoes from './scenes/ListaPromocoes';
import Encomendas from './scenes/Encomendas';
import Footer from './components/Footer'
import ListaProdutos from './scenes/ListaProdutos';
import Procura from './scenes/Procura';
import DetalhesEncomenda from './scenes/DetalhesEncomenda';
import DetalhesCarrinho from './scenes/DetalhesCarrinho';
import Checkout from './scenes/Checkout';

import * as routes from './constants/routes';
import './App.css';
import Gestor from './scenes/Gestor';

const Breadcrumbs = withRouter((props) => {
	if (props.location.pathname === "/") {
		return null;
	}
	return (
		<Breadcrumb >
			<Route path='/:path' component={BreadcrumbsItem} />
		</Breadcrumb>
	)
});

const BreadcrumbsItem = ({ ...rest, match }) => {
	return (
		<div style={{ display: 'inline' }}>
			<BreadcrumbItem active={match.isExact} style={{ display: 'inline' }} >
				{match.url !== '/gestor'
					?
					<Link to={match.url || ''}>
						{routes.routesToTitle(match.url)}
					</Link>
					:
					routes.routesToTitle(match.url)
				}
			</BreadcrumbItem>
			<span className="text-secondary"> / </span>
			<Route path={`${match.url}/:path`} component={BreadcrumbsItem} />
		</div>
	)
}

class App extends Component {

	render() {
		return (
			<div className="App">
				<BrowserRouter >
					<div>
						<NavBar />
						<Breadcrumbs />
						<Switch>
							<Route exact path={routes.HOME} component={Home} />
							<Route exact path={routes.LOGIN} component={Login} />
							<Route exact path={routes.REGISTAR} component={Registar} />
							<Route path={routes.PRODUTO + ':id'} component={DetalhesProduto} />
							<Route path={routes.LISTA_PRODUTOS + ':categoria'} component={ListaProdutos} />
							<Route exact path={routes.CONTA} component={Conta} />
							<Route exact path={routes.NOVIDADES} component={Novidades} />
							<Route exact path={routes.PROMOCOES} component={Promocoes} />
							<Route exact path={routes.ENCOMENDAS} component={Encomendas} />
							<Route exact path={routes.ENCOMENDA + ':numero'} component={DetalhesEncomenda} />
							<Route path={routes.PROCURA + ':categoria/:string'} component={Procura} />
							<Route path={routes.PROCURA + ':string'} component={Procura} />
							<Route exact path={routes.CARRINHO} component={DetalhesCarrinho} />
							<Route exact path={routes.CHECKOUT} component={Checkout} />
							<Route path={routes.GESTOR} component={Gestor} />
						</Switch>
						<Footer />
					</div>
				</BrowserRouter >
			</div>
		);
	}

}

export default withAuthentication(App);
