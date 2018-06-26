import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as servicesProdutos from '../../services/produtos';
import * as servicesEncomendas from '../../services/encomendas';
import { formatterPrice } from '../../constants/formatters';


class GestorHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maisVendidos: [],
            ultimasEncomendas: [],
        }
    }

    componentWillMount() {
        servicesProdutos.getMaisVendidosDetail(6)
            .then(response => {
                let maisVendidos = [];
                response.data.forEach((a => {
                    maisVendidos.push({
                        ...a[0],
                        vendas: a[1],
                        faturado: formatterPrice.format(a[2]),
                    });
                }))
                this.setState({ maisVendidos });
            })
            .catch(error => console.error(error.response));

        servicesEncomendas.getUltimas(30)
            .then(response => this.setState({ ultimasEncomendas: response.data }))
            .catch(error => console.error(error.response));
    }

    render() {
        return (
            <Row>
                <Col >
                    <h4>Produtos mais vendidos</h4>
                    <BootstrapTable version='4' data={this.state.maisVendidos}>
                        <TableHeaderColumn isKey dataField='codigo' className='customHeader'>
                            Nº Produto
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='nome' className="customHeader">
                            Nome
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='precoBase' className="customHeader">
                            Preço base
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='vendas' className="customHeader">
                            Unidades
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='faturado' className="customHeader">
                            Total faturado
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='button' dataAlign="center" dataFormat={this.buttonProduto} className="customHeader">
                        </TableHeaderColumn>
                    </BootstrapTable>


                    <h4>Últimas encomendas</h4>
                </Col>
            </Row >
        );
    }
}

export default GestorHome;