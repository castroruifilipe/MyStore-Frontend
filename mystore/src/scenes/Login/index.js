import React, { Component } from 'react';
import { Row, Col, Container, Alert, Button, Form, Input } from 'reactstrap';


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
		let credentials = {
			email: this.state.email,
			password: this.state.password
		}
	}

	criarConta = (event) => {
		
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
									onChange={event => this.setState({
										'email': event.target.value
									})}
								/>
								<label htmlFor="inputEmail">Email</label>
							</div>

							<div className="form-label-group">
								<Input required value={password} placeholder="Password" type="password" className="form-control" id="inputPassword"
									onChange={event => this.setState({
										'password': event.target.value
									})}
								/>
								<label htmlFor="inputPassword">Password</label>
							</div>

							<Button color="primary" disabled={isInvalid} type="submit" block={true} size="lg">Login</Button>
                            
                            {error && <Alert color="danger" className="mt-5">{error}</Alert>}
                            
                            <hr/>

                            <p className="text-muted text-center">Não tem conta?</p>

                            <Button color="basic" size="lg" type="submit" block={true} onClick={this.criarConta}><small>Criar nova conta</small></Button>
						</Form >
					</Col>
				</Row>
				{/* <Row>
					<Footer />
				</Row> */}
			</Container>
        );
    }   
}

export default Login;