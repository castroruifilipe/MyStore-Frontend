import React, { Component } from 'react';
import { Row, Col, Input, FormGroup, Label } from 'reactstrap';

import mbway_logo from '../../../../static/mbway.png';
import multibanco_logo from '../../../../static/multibanco.png';
import paypal_logo from '../../../../static/paypal.png';

class Pagamento extends Component {

    constructor(props) {
        super(props);
        this.state = {
            metodo: 0
        };
    }

    onChange(metodo) {
        this.setState({ metodo });
        this.props.setMetodoPagamento(metodo);
    }

    render() {
        return (
            <Row >
                <Col md="8">
                    <h5>Método de Pagamento</h5>
                    <Row>
                        <Col>
                            <FormGroup tag="fieldset" required>
                                <FormGroup check className="py-2">
                                    <Label check>
                                        <Input type="radio" name="metodo" onChange={event => { this.onChange('multibanco') }} />
                                        {' '}<img src={multibanco_logo} alt="Multibanco" />
                                    </Label>
                                </FormGroup>
                                <FormGroup check className="py-2">
                                    <Label check>
                                        <Input type="radio" name="metodo" onChange={event => { this.onChange('paypal') }} />
                                        {' '}<img src={paypal_logo} alt="Paypal" />
                                    </Label>
                                </FormGroup>
                                <FormGroup check className="py-2">
                                    <Label check>
                                        <Input type="radio" name="metodo" onChange={event => { this.onChange('mbway') }} />
                                        {' '}<img src={mbway_logo} alt="MB Way" />
                                    </Label>
                                </FormGroup>
                                <FormGroup check className="py-2">
                                    <Label check>
                                        <Input type="radio" name="metodo" onChange={event => { this.onChange('cobranca') }} />
                                        {' '}Pagamento no ato da entrega
                                </Label>
                                </FormGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

}

export default Pagamento;