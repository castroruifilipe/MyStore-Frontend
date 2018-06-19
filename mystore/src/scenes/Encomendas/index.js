import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/lib/ti';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';
import './style.css';

class Encomendas extends Component {

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

        return (
            <Container className="pt-4">
                <BootstrapTable version='4' data={products} pagination >
                    <TableHeaderColumn isKey dataField='numero' filter={{ type: 'TextFilter'}} className='customHeader'>Nº Encomenda</TableHeaderColumn>
                    <TableHeaderColumn dataField='data' dataSort={true} caretRender={this.getCaret} className="customHeader">Data</TableHeaderColumn>
                    <TableHeaderColumn dataField='envio' className="customHeader">Envio para</TableHeaderColumn>
                    <TableHeaderColumn dataField='total' className="customHeader">Total</TableHeaderColumn>
                    <TableHeaderColumn dataField='estado' className="customHeader">Estado</TableHeaderColumn>
                    <TableHeaderColumn dataField='metodo' className="customHeader">Método envio</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataAlign="center" dataFormat={this.buttonFormatter} className="customHeader"></TableHeaderColumn>
                </BootstrapTable>
            </Container>
        );

    }

}

export default Encomendas;