import React, { Component } from 'react';
import { TabContent, TabPane, Row, Col, Container, Button, Progress } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { observe } from 'mobx';
import { withRouter } from 'react-router-dom';

import Entrega from './components/Entrega';
import Pagamento from './components/Pagamento';
import Confirmacao from './components/Confirmacao';
import { formatterPrice } from '../../constants/formatters';
import * as servicesEncomenda from '../../services/encomendas';
import * as servicesCarrinho from '../../services/carrinho';
import * as routes from '../../constants/routes';

class Checkout extends Component {

    constructor(props) {
        super(props);
        let loadUser, moradaEntrega;
        if (this.props.sessionStore.user.nome) {
            loadUser = true;
            moradaEntrega = {
                nome: this.props.sessionStore.user.nome,
                rua: this.props.sessionStore.user.morada.rua || '',
                codigoPostal: this.props.sessionStore.user.morada.codigoPostal || '',
                localidade: this.props.sessionStore.user.morada.localidade || '',
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
        let loadCarrinho, resumo;
        if (this.props.carrinhoStore.carrinho.total) {
            loadCarrinho = true;
            resumo = {
                subTotal: this.props.carrinhoStore.carrinho.total,
                portes: 5.45,
                total: this.props.carrinhoStore.carrinho.total + 5.45,
            }
        } else {
            loadCarrinho = false;
            resumo = {
                subTotal: '',
                portes: '',
                total: '',
            }
        }
        this.state = {
            loadUser,
            loadCarrinho,
            resumo,
            moradaEntrega,
            metodoPagamento: 'MULTIBANCO',
            progress: {
                entrega: 100 / 3,
                pagamento: 0,
                confirmacao: 0
            },
            activeTab: '1',
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
            this.setState({
                loadCarrinho: true,
                resumo: {
                    subTotal: change.newValue.total,
                    portes: 5.45,
                    total: change.newValue.total + 5.45,
                }
            });
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

    confirmar = () => {
        servicesEncomenda.checkout(this.state.moradaEntrega, this.state.metodoPagamento, this.props.sessionStore.accessToken)
            .then(response => servicesCarrinho.getCarrinho())
            .then(response => {
                console.log(response.data);
                this.props.carrinhoStore.setCarrinho(response.data);
                this.props.history.push(routes.ENCOMENDAS)
            })
            .catch(error => {
                console.error(error.response)
            });
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
                                <Confirmacao carrinho={this.props.carrinhoStore.carrinho} morada={this.state.moradaEntrega}
                                    metodo={this.state.metodoPagamento} resumo={this.state.resumo}
                                    confirmar={this.confirmar} previous={this.previous} />
                            </TabPane>
                        </TabContent>
                    </Col>
                    {this.state.activeTab !== '3' &&

                        <div className="float-right p-4 mr-3" style={{ boxShadow: '0 0 4px 1px rgba(0, 0, 0, 0.3)', width: "250px" }}>
                            <div>
                                <h5>Resumo</h5>

                                <div className="py-1 d-flex justify-content-between">
                                    <span>Sub-Total</span>
                                    <span>{formatterPrice.format(this.state.resumo.subTotal)}</span>
                                </div>
                                <div className="py-1 d-flex justify-content-between">
                                    <span>Portes</span>
                                    <span>{formatterPrice.format(this.state.resumo.portes)}</span>
                                </div>
                                <div className="py-1 d-flex justify-content-between">
                                    <span>Total</span>
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
    withRouter,
    inject('carrinhoStore', 'sessionStore'),
    observer
)(Checkout);