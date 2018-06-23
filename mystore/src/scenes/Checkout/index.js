import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Container, Button, Input, FormGroup, Label } from 'reactstrap';
import classnames from 'classnames';
import { formatterPrice } from '../../constants/formatters';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

class Checkout extends Component {

    INITIAL_STATE = {
        nome: "",
        telemovel: "",
        contribuinte: "",
        rua: "",
        localidade: "",
        codigoPostal: "",
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.INITIAL_STATE,
            entrega: {},
            metodo: '',
            activeTab: '1',
        };
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    onChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    render() {
        let {
            nome,
            telemovel,
            rua,
            localidade,
            codigoPostal,
        } = this.state;

        return (
            <Container className="pt-5" style={{ minHeight: '60vh' }}>
                <Row>
                    <Col>
                        <h1>Checkout</h1>
                    </Col>
                </Row>
                <Row className="pt-3">
                    <Col>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    Entrega
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Pagamento
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggle('3'); }}
                                >
                                    Confirmação
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row className="pt-4">
                                    <Col sm="6">
                                        <h5>Morada de Entrega</h5>
                                        <Row>
                                            <Col sm="6">
                                                <div className="form-label-group">
                                                    <Input required value={nome} placeholder="Nome" type="text" className="form-control" id="inputNome"
                                                        onChange={this.onChange} />
                                                    <label htmlFor="inputNome">Nome</label>
                                                </div>
                                            </Col>
                                            <Col sm="6">
                                                <div className="form-label-group">
                                                    <Input required value={telemovel} placeholder="Telemóvel" type="text" className="form-control" id="inputTele"
                                                        onChange={event => this.setState({ 'entrega.telemovel': event.target.value })} />
                                                    <label htmlFor="inputTele">Telemovel</label>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="form-label-group">
                                            <Input required value={rua} placeholder="Rua" type="text" className="form-control" id="inputRua"
                                                onChange={event => this.setState({ 'entrega.nome': event.target.value })} />
                                            <label htmlFor="inputRua">Rua</label>
                                        </div>
                                        <Row>
                                            <Col sm="6">
                                                <div className="form-label-group">
                                                    <Input required value={codigoPostal} placeholder="Código Postal" type="text" className="form-control" id="inputCodigo"
                                                        onChange={event => this.setState({ 'entrega.codigoPostal': event.target.value })} />
                                                    <label htmlFor="inputCodigo">Código Postal</label>
                                                </div>
                                            </Col>
                                            <Col sm="6">
                                                <div className="form-label-group">
                                                    <Input required value={localidade} placeholder="Localidade" type="text" className="form-control" id="inputLocalidade"
                                                        onChange={event => this.setState({ 'entrega.localidade': event.target.value })} />
                                                    <label htmlFor="inputLocalidade">Localidade</label>
                                                </div>
                                            </Col>
                                        </Row>

                                    </Col>
                                    <Col sm="6">
                                        <div className="float-right p-3" style={{ boxShadow: '0 0 4px 1px rgba(0, 0, 0, 0.3)', width: "250px" }}>
                                            <div className="p-2">
                                                <strong>Sub-Total </strong> <span className="float-right">{formatterPrice.format(200)}</span><br />
                                            </div>
                                            <div className="px-2">
                                                <strong>Portes </strong> <span className="float-right">{formatterPrice.format(200)}</span><br />
                                            </div>
                                            <div className="p-2">
                                                <strong>Total </strong>  <span className="float-right">{formatterPrice.format(200)}</span><br />
                                            </div>
                                            <Button className="btn btn-success btn-block my-2">Continuar</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row className="pt-4">
                                    <Col sm="6">
                                        <h5>Método de Pagamento</h5>
                                        <Row>
                                            <Col>
                                                <FormGroup tag="fieldset">
                                                    <FormGroup check  className="py-2">
                                                        <Label check>
                                                            <Input type="radio" name="radio1" onChange={event => this.setState({ 'metodo': event.target.value })}/>{' '}
                                                            Multibanco
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup check  className="py-2">
                                                        <Label check>
                                                            <Input type="radio" name="radio1" />{' '}
                                                            Paypal
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup check className="py-2">
                                                        <Label check>
                                                            <Input type="radio" name="radio1" />{' '}
                                                            MB WAY
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup check className="py-2">
                                                        <Label check>
                                                            <Input type="radio" name="radio1" />{' '}
                                                            Pagamento no ato de levantamento
                                                        </Label>
                                                    </FormGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                    </Col>
                                    <Col sm="6">
                                        <div className="float-right p-3" style={{ boxShadow: '0 0 4px 1px rgba(0, 0, 0, 0.3)', width: "250px" }}>
                                            <div className="p-2">
                                                <strong>Sub-Total </strong> <span className="float-right">{formatterPrice.format(200)}</span><br />
                                            </div>
                                            <div className="px-2">
                                                <strong>Portes </strong> <span className="float-right">{formatterPrice.format(200)}</span><br />
                                            </div>
                                            <div className="p-2">
                                                <strong>Total </strong>  <span className="float-right">{formatterPrice.format(200)}</span><br />
                                            </div>
                                            <Button className="btn btn-success btn-block my-2">Continuar</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default compose(
    inject('carrinhoStore', 'sessionStore'),
    observer
)(Checkout);