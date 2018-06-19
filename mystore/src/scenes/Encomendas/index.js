import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { Container, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/lib/ti';
import { Link } from 'react-router-dom';

import * as services from '../../services/encomendas';
import * as routes from '../../constants/routes';

import './style.css';

class Encomendas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            encomendas: [],
        }
    }

    componentWillMount() {
        services.getEncomendasCliente(this.props.sessionStore.accessToken)
            .then(response => {
                console.log(response.data);
                this.setState({ encomendas: response.data });
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

    makeRows = (produtos) => {
        let produto = {
            numero: "",
            data: "20/12/2001",
            envio: "1",
            total: "20",
            estado: "envio",
            metodo: "ctt",
        }
        for (let i = 0; i < 100; i++)
            produtos.push({ ...produto, data: produto.data, numero: i });
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
        const products = [];
        this.makeRows(products);
        let html;

        if (this.state.encomendas.length === 0) {
            html = <h2>Ainda não realizou nenhuma encomenda!</h2>
        } else {
            html =
                <BootstrapTable version='4' data={products} pagination >
                    <TableHeaderColumn isKey dataField='numero' filter={{ type: 'TextFilter' }} className='customHeader'>Nº Encomenda</TableHeaderColumn>
                    <TableHeaderColumn dataField='data' dataSort={true} caretRender={this.getCaret} className="customHeader">Data</TableHeaderColumn>
                    <TableHeaderColumn dataField='envio' className="customHeader">Envio para</TableHeaderColumn>
                    <TableHeaderColumn dataField='total' className="customHeader">Total</TableHeaderColumn>
                    <TableHeaderColumn dataField='estado' className="customHeader">Estado</TableHeaderColumn>
                    <TableHeaderColumn dataField='metodo' className="customHeader">Método envio</TableHeaderColumn>
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