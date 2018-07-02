import React, { Component } from 'react';
import { Row, Button, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/lib/ti';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import * as routes from '../../constants/routes';
import * as services from '../../services/encomendas';
import metodoPagEnum from '../../constants/metodoPagEnum';
import estadoEnum from '../../constants/estadoEnum';
import { formatterPrice } from '../../constants/formatters';

class GestaoEncomendas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            encomendas: [],
        }
    }

    componentWillMount() {
        services.getEncomendas(this.props.sessionStore.accessToken)
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
                this.setState({ encomendas: data });
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                    this.setState({ error: error.response.data.message });
                } else {
                    console.error(error);
                }
            });
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

    buttonFormatter = (cell, row) => {
        return <Button size="sm" tag={Link} to={routes.GESTAO_ENCOMENDAS + row.numero}>Ver encomenda</Button>
    }

    render() {

        return (
            <Row>
                <Col >
                    <Row>
                        <Col className="p-0">
                            <h4>Gestão de Encomendas</h4>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="p-0">
                            <BootstrapTable version='4' data={this.state.encomendas} pagination >
                                <TableHeaderColumn isKey dataField='numero' dataSort={true} caretRender={this.getCaret} filter={{ type: 'TextFilter' }} className='customHeader' dataAlign="center">Nº Encomenda</TableHeaderColumn>
                                <TableHeaderColumn dataField='data' dataSort={true} caretRender={this.getCaret} filter={{ type: 'TextFilter' }} className="customHeader" dataAlign="center">Data</TableHeaderColumn>
                                <TableHeaderColumn dataField='total' dataFormat={this.priceFormatter} width='10%' className="customHeader" dataAlign="center" dataSort caretRender={this.getCaret}>Total</TableHeaderColumn>
                                <TableHeaderColumn dataField='metodo' dataFormat={this.enumFormatter} filterFormatted filter={{ type: 'SelectFilter', options: metodoPagEnum }}
                                    formatExtraData={metodoPagEnum} className="customHeader" dataAlign="center" >Método pagamento</TableHeaderColumn>
                                <TableHeaderColumn dataField='estado' dataFormat={this.enumFormatter} filterFormatted filter={{ type: 'SelectFilter', options: estadoEnum }}
                                    formatExtraData={estadoEnum} className="customHeader" dataAlign="center" >Estado</TableHeaderColumn>
                                <TableHeaderColumn dataField='button' dataAlign="center" dataFormat={this.buttonFormatter} className="customHeader"></TableHeaderColumn>
                            </BootstrapTable>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );

    }
}

export default compose(
    inject('sessionStore'),
    observer
)(GestaoEncomendas);