import React, { Component } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

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
						</Switch>
					</div>
				</BrowserRouter >
			</div>
		);
	}
}

export default App;
