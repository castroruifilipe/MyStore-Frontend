import React, { Component } from 'react';
import { Row, Button, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/lib/ti';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';
import * as services from '../../services/encomendas';
import metodoPagEnum from '../../constants/metodoPagEnum';
import estadoEnum from '../../constants/estadoEnum';
import {formatterPrice} from '../../constants/formatters';

class GestaoEncomendas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            encomendas: [],
        }
    }

    componentWillMount() {
        services.getEncomendasCliente()
            .then(response => {
                let data = [];
                response.data.forEach(v => {
                    data.push({
                        numero: v.id,
                        data: v.dataRegisto,
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

    priceFormatter = (cell, row) =>{
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
                            <h4>Gestão de Clientes</h4>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <BootstrapTable version='4' data={this.state.encomendas} pagination >
                            <TableHeaderColumn isKey dataField='numero' filter={{ type: 'TextFilter' }} className='customHeader'>Nº Encomenda</TableHeaderColumn>
                            <TableHeaderColumn dataField='data' width='10%' dataSort={true} caretRender={this.getCaret} className="customHeader">Data</TableHeaderColumn>
                            <TableHeaderColumn dataField='total' dataFormat={this.priceFormatter} width='10%' className="customHeader">Total</TableHeaderColumn>
                            <TableHeaderColumn dataField='metodo' dataFormat={this.enumFormatter} formatExtraData={metodoPagEnum} className="customHeader">Método pagamento</TableHeaderColumn>
                            <TableHeaderColumn dataField='estado' dataFormat={this.enumFormatter} formatExtraData={estadoEnum} className="customHeader">Estado</TableHeaderColumn>
                            <TableHeaderColumn dataField='button' dataAlign="center" dataFormat={this.buttonFormatter} className="customHeader"></TableHeaderColumn>
                        </BootstrapTable>
                    </Row>
                </Col>
            </Row>
        );

    }
}

export default GestaoEncomendas;

