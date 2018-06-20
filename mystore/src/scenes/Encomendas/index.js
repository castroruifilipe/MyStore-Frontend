import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { Container, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/lib/ti';
import { Link } from 'react-router-dom';

import * as services from '../../services/encomendas';
import * as routes from '../../constants/routes';
import metodoPagEnum from '../../constants/metodoPagEnum';
import estadoEnum from '../../constants/estadoEnum';
import {formatterPrice} from '../../constants/formatters';

import './style.css';

class Encomendas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            encomendas: [],
        }
    }

    enumFormatter = (cell, row, enumObject) => {
        return enumObject[cell];
    }

    priceFormatter = (cell, row) =>{
        return formatterPrice.format(cell);
    }

    componentWillMount() {
        services.getEncomendasCliente(this.props.sessionStore.accessToken)
            .then(response => {
                let data = [];
                response.data.forEach(v => {
                    console.log(v);
                    data.push({
                        numero: v.id,
                        data: v.data,
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
        return <Button size="sm" tag={Link} to={routes.ENCOMENDA + row.numero}>Ver encomenda</Button>
    }

    render() {
        let html;

        if (this.state.encomendas.length === 0) {
            html = <h2>Ainda não realizou nenhuma encomenda!</h2>
        } else {
            html =
                <BootstrapTable version='4' data={this.state.encomendas} pagination >
                    <TableHeaderColumn isKey dataField='numero' filter={{ type: 'TextFilter' }} className='customHeader'>Nº Encomenda</TableHeaderColumn>
                    <TableHeaderColumn dataField='data' width='10%' dataSort={true} caretRender={this.getCaret} className="customHeader">Data</TableHeaderColumn>
                    <TableHeaderColumn dataField='total' dataFormat={this.priceFormatter} width='10%' className="customHeader">Total</TableHeaderColumn>
                    <TableHeaderColumn dataField='metodo' dataFormat={this.enumFormatter} formatExtraData={metodoPagEnum} className="customHeader">Método pagamento</TableHeaderColumn>
                    <TableHeaderColumn dataField='estado' dataFormat={this.enumFormatter} formatExtraData={estadoEnum} className="customHeader">Estado</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataAlign="center" dataFormat={this.buttonFormatter} className="customHeader"></TableHeaderColumn>
                </BootstrapTable>
        }

        return (
            <Container className="pt-4" style={{ minHeight: '50vh' }}>
                {html}
            </Container>
        );

    }

}

export default compose(
    inject('sessionStore'),
    observer
)(Encomendas);