import React, { Component } from 'react';
import { Row, Col, Container, Alert, Button, Form, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import * as services from '../../services/utilizadores';
import * as routes from '../../constants/routes';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			error: null,
		};
	}

	onSubmit = (event) => {
		const { email, password } = this.state;
		services.signin(email, password)
			.then(response => {
				let accessToken = response.headers['access-token'];
				this.props.sessionStore.setAccessToken(accessToken);
				this.props.sessionStore.setUser(response.data);
			})
			.then(() => this.props.history.push(routes.HOME))
			.catch(error => {
				if (error.response) {
					this.setState({ error: error.response.data.message });
				} else {
					console.error(error);
				}
			});
		event.preventDefault();
	}

	criarConta = (event) => {
		this.props.history.push(routes.REGISTAR);
	}

	render() {
		const {
			email,
			password,
			error,
		} = this.state;

		const isInvalid =
			password === '' ||
			email === '';

		return (
			<Container fluid >
				<Row style={{ minHeight: '90vh' }}>
					<Col md={{ size: 6, offset: 4 }}>
						<h3 className="font-weight-normal mt-5 mb-3" style={{ paddingTop: '90px' }}>Login</h3>

						<Form className="form-sign" onSubmit={this.onSubmit}>
							<div className="form-label-group">
								<Input required value={email} placeholder="Email" type="email" className="form-control" id="inputEmail"
									onChange={event => this.setState({ 'email': event.target.value })} />
								<label htmlFor="inputEmail">Email</label>
							</div>

							<div className="form-label-group">
								<Input required value={password} placeholder="Password" type="password" className="form-control" id="inputPassword"
									onChange={event => this.setState({ 'password': event.target.value })} />
								<label htmlFor="inputPassword">Password</label>
							</div>

							<Button color="primary" disabled={isInvalid} type="submit" block={true} size="lg">Login</Button>

							{error && <Alert color="danger" className="mt-5">{error}</Alert>}

							<hr />

							<p className="text-muted text-center">Não tem conta?</p>

							<Button size="lg" type="submit" block={true} onClick={this.criarConta}>
								<small>Criar nova conta</small>
							</Button>
						</Form >
					</Col>
				</Row>
			</Container>
		);
	}
}

export default compose(
	withRouter,
	inject('sessionStore'),
	observer
)(Login);