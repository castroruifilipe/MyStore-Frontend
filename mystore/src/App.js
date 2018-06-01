import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Login from './scenes/Login'

import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<NavBar />

				<Login/>
			</div>
		);
	}
}

export default App;
