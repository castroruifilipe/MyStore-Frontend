import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/lib/ti';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';
import * as servicesProdutos from '../../services/produtos';
import * as servicesEncomendas from '../../services/encomendas';
import { formatterPrice } from '../../constants/formatters';
import metodoPagEnum from '../../constants/metodoPagEnum';
import estadoEnum from '../../constants/estadoEnum';

class GestorHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maisVendidos: [],
            ultimasEncomendas: [],
        }
    }

    componentWillMount() {
        servicesProdutos.getMaisVendidosDetail(10)
            .then(response => {
                let maisVendidos = [];
                response.data.forEach((a => {
                    maisVendidos.push({
                        codigo: a.codigo,
                        nome: a.nome,
                        precoBase: formatterPrice.format(a.precoBase),
                        vendas: a.estatisticasVendas.numeroVendas,
                        faturado: formatterPrice.format(a.estatisticasVendas.totalFaturado),
                    });
                }))
                this.setState({ maisVendidos });
            })
            .catch(error => console.error(error.response));

        servicesEncomendas.getUltimas(10, this.props.sessionStore.accessToken)
            .then(response => {
                let data = [];
                response.data.forEach(v => {
                    data.push({
                        numero: v.id,
                        data: new Date(v.dataRegisto).toLocaleString(),
                        total: v.total,
                        estado: v.estado,
                        metodo: v.metodoPagamento,
                    })
                }
                );
                this.setState({ ultimasEncomendas: data })
            })
            .catch(error => console.error(error.response));
    }

    buttonFormatter = (cell, row) => {
        return <Button size="sm" tag={Link} to={routes.GESTAO_PRODUTOS + row.codigo}>Ver produto</Button>
    }

    enumFormatter = (cell, row, enumObject) => {
        return enumObject[cell];
    }

    priceFormatter = (cell, row) => {
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

    buttonFormatterEncomendas = (cell, row) => {
        return <Button size="sm" tag={Link} to={routes.GESTAO_ENCOMENDAS + row.numero}>Ver encomenda</Button>
    }

    render() {
        const options = {
            page: 1,
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }],
            sizePerPage: 5,
        };

        return (
            <Row>
                <Col>
                    <Row>
                        <h4>Produtos mais vendidos</h4>
                    </Row>
                    <Row className="mt-3">
                        <Col className="px-0">
                            <BootstrapTable version='4' data={this.state.maisVendidos} pagination options={options}>
                                <TableHeaderColumn isKey width='13%' dataField='codigo' className='customHeader' dataAlign="center">
                                    Nº Produto
                            </TableHeaderColumn>
                                <TableHeaderColumn dataField='nome' className="customHeader" dataAlign="center">
                                    Nome
                            </TableHeaderColumn>
                                <TableHeaderColumn dataField='precoBase' width='13%' className="customHeader" dataAlign="center">
                                    Preço base
                            </TableHeaderColumn>
                                <TableHeaderColumn dataField='vendas' width='13%' className="customHeader" dataAlign="center">
                                    Nº Unidades
                            </TableHeaderColumn>
                                <TableHeaderColumn dataField='faturado' width='15%' className="customHeader" dataAlign="center">
                                    Total faturado
                            </TableHeaderColumn>
                                <TableHeaderColumn dataField='button' dataAlign="center" dataFormat={this.buttonFormatter} className="customHeader">
                                </TableHeaderColumn>
                            </BootstrapTable>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <h4>Últimas encomendas</h4>
                    </Row>
                    <Row className="mt-3">
                        <Col className="px-0">
                            <BootstrapTable version='4' data={this.state.ultimasEncomendas} pagination options={options}>
                                <TableHeaderColumn isKey dataField='numero' dataSort={true} caretRender={this.getCaret} filter={{ type: 'TextFilter' }} className='customHeader' dataAlign="center">Nº Encomenda</TableHeaderColumn>
                                <TableHeaderColumn dataField='data' dataSort={true} caretRender={this.getCaret} filter={{ type: 'TextFilter' }} className="customHeader" dataAlign="center">Data</TableHeaderColumn>
                                <TableHeaderColumn dataField='total' dataFormat={this.priceFormatter} width='10%' className="customHeader" dataAlign="center" dataSort caretRender={this.getCaret}>Total</TableHeaderColumn>
                                <TableHeaderColumn dataField='metodo' dataFormat={this.enumFormatter} filterFormatted filter={{ type: 'SelectFilter', options: metodoPagEnum }}
                                    formatExtraData={metodoPagEnum} className="customHeader" dataAlign="center" >Método pagamento</TableHeaderColumn>
                                <TableHeaderColumn dataField='estado' dataFormat={this.enumFormatter} filterFormatted filter={{ type: 'SelectFilter', options: estadoEnum }}
                                    formatExtraData={estadoEnum} className="customHeader" dataAlign="center" >Estado</TableHeaderColumn>
                                <TableHeaderColumn dataField='button' dataAlign="center" dataFormat={this.buttonFormatterEncomendas} className="customHeader"></TableHeaderColumn>
                            </BootstrapTable>
                        </Col>
                    </Row>
                </Col>
            </Row >
        );
    }
}

export default compose(
    inject('sessionStore'),
    observer
)(GestorHome);