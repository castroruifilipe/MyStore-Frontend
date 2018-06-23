import React, { Component } from 'react';
import { TabContent, TabPane, Row, Col, Container, Button, Progress } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { observe } from 'mobx';

import Entrega from './components/Entrega';
import Pagamento from './components/Pagamento';
import Confirmacao from './components/Confirmacao';
import { formatterPrice } from '../../constants/formatters';

class Checkout extends Component {

    constructor(props) {
        super(props);
        let loadUser, moradaEntrega;
        let loadCarrinho = this.props.carrinhoStore.carrinho !== {};
        if (this.props.sessionStore.user.nome) {
            loadUser = true;
            moradaEntrega = {
                nome: this.props.sessionStore.user.nome,
                rua: this.props.sessionStore.user.morada.rua,
                codigoPostal: this.props.sessionStore.user.morada.codigoPostal,
                localidade: this.props.sessionStore.user.morada.localidade,
            }
        } else {
            loadUser = false;
            moradaEntrega = {
                nome: '',
                rua: '',
                codigoPostal: '',
                localidade: '',
            }
        }
        this.state = {
            loadUser,
            loadCarrinho,
            moradaEntrega,
            metodoPagamento: '',
            progress: {
                entrega: 100 / 3,
                pagamento: 0,
                confirmacao: 0
            },
            activeTab: '1',
            resumo: {
                subTotal: 0,
                portes: 0,
                total: 0,
            },
        };
    }


    disposerUser = observe(this.props.sessionStore, "user", (change) => {
        if (!this.state.loadUser) {
            this.setState({
                loadUser: true,
                moradaEntrega: {
                    nome: change.newValue.nome,
                    rua: change.newValue.morada.rua || '',
                    codigoPostal: change.newValue.morada.codigoPostal || '',
                    localidade: change.newValue.morada.localidade || '',
                }
            });
        }
    });

    disposerCarrinho = observe(this.props.carrinhoStore, "carrinho", (change) => {
        if (!this.state.loadCarrinho) {
            this.setState({ loadCarrinho: true, });
        }
    });


    next = () => {
        switch (this.state.activeTab) {
            case '1':
                this.setState({
                    activeTab: '2',
                    progress: { entrega: 100 / 3, pagamento: 100 / 3, confirmacao: 0 }
                });
                break;
            case '2':
                this.setState({
                    activeTab: '3',
                    progress: { entrega: 100 / 3, pagamento: 100 / 3, confirmacao: 100 / 3 }
                });
                break;
            default:
                return;
        }
    }

    previous = () => {
        switch (this.state.activeTab) {
            case '2':
                this.setState({
                    activeTab: '1',
                    progress: { entrega: 100 / 3, pagamento: 0, confirmacao: 0 }
                });
                break;
            case '3':
                this.setState({
                    activeTab: '2',
                    progress: { entrega: 100 / 3, pagamento: 100 / 3, confirmacao: 0 }
                });
                break;
            default:
                return;
        }
    }

    setMoradaEntrega = (event) => {
        this.setState({
            moradaEntrega: {
                ...this.state.moradaEntrega,
                [event.target.id]: event.target.value,
            }
        })
    }

    setMetodoPagamento = (metodoPagamento) => {
        this.setState({ metodoPagamento });
    }

    render() {
        if (!this.state.loadUser || !this.state.loadCarrinho) {
            return null;
        }

        let {
            nome,
            rua,
            codigoPostal,
            localidade
        } = this.state.moradaEntrega;
        let canContinuar = (
            nome !== '' &&
            rua !== '' &&
            codigoPostal !== '' &&
            localidade !== ''
        );

        return (
            <Container className="pt-5" style={{ minHeight: '80vh' }}>
                <Row>
                    <Col>
                        <h1>Checkout</h1>
                    </Col>
                </Row>
                <Row className="mt-3 mb-4">
                    <Col>
                        <Progress multi style={{ height: '40px', fontSize: '1em' }}>
                            <Progress bar value={this.state.progress.entrega} animated={this.state.activeTab === '1'}>
                                {this.state.progress.entrega !== 0 && 'ENTREGA'}
                            </Progress>
                            <Progress bar color="success" value={this.state.progress.pagamento} animated={this.state.activeTab === '2'}>
                                {this.state.progress.pagamento !== 0 && 'PAGAMENTO'}
                            </Progress>
                            <Progress bar color="info" value={this.state.progress.confirmacao} animated={this.state.activeTab === '3'}>
                                {this.state.progress.confirmacao !== 0 && 'CONFIRMAÇÃO'}
                            </Progress>
                        </Progress>
                    </Col>
                </Row>
                <Row className="pt-3">
                    <Col>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Entrega user={this.props.sessionStore.user} setMoradaEntrega={this.setMoradaEntrega} />
                            </TabPane>
                            <TabPane tabId="2">
                                <Pagamento setMetodoPagamento={this.setMetodoPagamento} />
                            </TabPane>
                            <TabPane tabId="3">
                                <Confirmacao carrinho={this.props.carrinhoStore.carrinho} />
                            </TabPane>
                        </TabContent>
                    </Col>
                    {this.state.activeTab !== '3' &&

                        <div className="float-right p-4 mr-3" style={{ boxShadow: '0 0 4px 1px rgba(0, 0, 0, 0.3)', width: "250px"}}>
                            <div>
                                <h5>Resumo</h5>

                                <div className="py-1 d-flex justify-content-between">
                                    <strong>Sub-Total</strong>
                                    <span>{formatterPrice.format(this.state.resumo.subTotal)}</span>
                                </div>
                                <div className="py-1 d-flex justify-content-between">
                                    <strong>Portes</strong>
                                    <span>{formatterPrice.format(this.state.resumo.portes)}</span>
                                </div>
                                <div className="py-1 d-flex justify-content-between">
                                    <strong>Total</strong>
                                    <span>{formatterPrice.format(this.state.resumo.total)}</span>
                                </div>
                            </div>

                            {this.state.activeTab !== '1' &&
                                <div className="pt-3">
                                    <h5>Entrega</h5>

                                    <span>{this.state.moradaEntrega.nome}</span><br />
                                    <small>{this.state.moradaEntrega.rua}</small><br />
                                    <small>{this.state.moradaEntrega.codigoPostal + ' ' + this.state.moradaEntrega.localidade}</small>
                                </div>
                            }

                            <Button block color='success' className="mt-3" onClick={this.next} disabled={!canContinuar}>
                                Continuar
                            </Button>
                            {this.state.activeTab !== '1' &&
                                <Button block color='secondary' onClick={this.previous} size="sm">
                                    Voltar
                                </Button>
                            }
                        </div>

                    }
                </Row>
            </Container>
        );
    }

}

export default compose(
    inject('carrinhoStore', 'sessionStore'),
    observer
)(Checkout);