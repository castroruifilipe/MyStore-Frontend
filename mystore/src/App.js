import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import NavBar from './components/NavBar';
import Login from './scenes/Login';
import Registar from './scenes/Registar';

import * as routes from './constants/routes';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<BrowserRouter >
					<div>
						<NavBar />
						<Switch>
							<Route exact path={routes.HOME} />
							<Route exact path={routes.LOGIN} component={Login} />
							<Route exact path={routes.REGISTAR} component={Registar} />
						</Switch>
					</div>
				</BrowserRouter >
			</div>
		);
	}
}

export default App;
