import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Login from './scenes/Login'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './scenes/Home';
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
							<Route exact path={routes.HOME} component={Home}/>
						</Switch>
					</div>
				</BrowserRouter >
			</div>
		);
	}
}

export default App;
