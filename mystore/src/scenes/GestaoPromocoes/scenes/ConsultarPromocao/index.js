import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/lib/ti';

import * as services from '../../../../services/promocoes';
import * as routes from '../../../../constants/routes';
import { formatterPercent, formatterPrice } from '../../../../constants/formatters';

class ConsultarPromocao extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            desconto: '',
            descricao: '',
            dataInicio: '',
            dataFim: '',
            produtos: '',
            categoria: '',
        }
    }

    componentWillMount() {
        services.getPromocao(this.props.match.params.id, this.props.sessionStore.accessToken)
            .then(response => {
                let produtos = response.data.produtos;
                produtos.map(produto => produto['categoria'] = produto['categoria']['descricao']);
                this.setState({
                    id: response.data.id,
                    desconto: response.data.desconto,
                    descricao: response.data.descricao,
                    dataInicio: new Date(response.data.dataInicio, ).toLocaleString(),
                    dataFim: new Date(response.data.dataFim, ).toLocaleString(),
                    produtos,
                    categoria: response.data.categoria,
                });
            })
            .catch(error => console.error(error.response));
    }

    apagar = () => {
        services.apagar(this.state.id, this.props.sessionStore.accessToken)
            .then(response => {
                this.props.history.push(routes.GESTAO_PROMOCOES)
            })
            .catch(error => console.error(error.response));
    }

    priceFormatter = (cell, row) => {
        if (cell === 0) return '';
        return formatterPrice.format(cell);
    }

    getCaret = (direction) => {
        if (direction === 'asc') {
            return (
                <TiArrowSortedUp />
            )
        }
        if (direction === 'desc') {
            return (
                <TiArrowSortedDown />
            )
        }
        return (<TiArrowUnsorted />);
    }

    render() {
        let {
            id,
            desconto,
            descricao,
            dataInicio,
            dataFim,
            produtos,
            categoria,
        } = this.state;

        if (id === '') {
            return null;
        }

        return (
            <Row className="ml-0">
                <Col>
                    <Row>
                        <Col>
                            <h3 className='headerColor'>Detalhes da Promoção</h3>
                            <h6>Promoção #{id}</h6>
                        </Col>
                        <Col align="right">
                            <Button color="danger" className="mr-2 block inline-md" style={{ width: '180px' }} onClick={this.apagar}>
                                Apagar Promoção
                            </Button>
                        </Col>
                    </Row>
                    <div>
                        <Row className="mt-3">
                            <Col>
                                <h5>{descricao}</h5>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <span><strong>Data de início </strong>{dataInicio}</span> <br />
                                <span><strong>Data de fim </strong>{dataFim}</span> <br />
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <span><strong>Desconto </strong> {formatterPercent.format(desconto)}</span> <br />
                            </Col>
                        </Row>
                        {
                            categoria !== null
                                ?
                                <Row className="mt-4">
                                    <Col>
                                        <span><strong>Categoria </strong> {categoria.descricao}</span> <br />
                                    </Col>
                                </Row>
                                :
                                <Row className="mt-4">
                                    <Col>
                                        <h5 className="headerColor">Produtos</h5>
                                        <BootstrapTable version='4' data={produtos} pagination >
                                            <TableHeaderColumn isKey dataField='codigo' dataSort caretRender={this.getCaret} width="13%" filter={{ type: 'TextFilter' }} className='customHeader' dataAlign="center">Código</TableHeaderColumn>
                                            <TableHeaderColumn dataField='nome' dataSort caretRender={this.getCaret} filter={{ type: 'TextFilter' }} className="customHeader" dataAlign="center">Nome</TableHeaderColumn>
                                            <TableHeaderColumn dataField='categoria' dataSort caretRender={this.getCaret} className="customHeader" filter={{ type: 'TextFilter' }} dataAlign="center">Categoria</TableHeaderColumn>
                                            <TableHeaderColumn dataField='precoBase' dataSort caretRender={this.getCaret} dataFormat={this.priceFormatter} width='14%' className="customHeader" dataAlign="center">Preco</TableHeaderColumn>
                                            <TableHeaderColumn dataField='stock' dataSort caretRender={this.getCaret} className="customHeader" dataAlign="center" width='14%'>Stock</TableHeaderColumn>
                                        </BootstrapTable>
                                    </Col>
                                </Row>
                        }
                    </div>

                </Col>
            </Row>
        );
    }

}

export default compose(
    inject('sessionStore'),
    observer
)(ConsultarPromocao);