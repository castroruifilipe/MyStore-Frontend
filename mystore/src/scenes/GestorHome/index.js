import React, { Component } from 'react';
import { Row, Col, Button} from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import { Link } from 'react-router-dom';

//import * as routes from '../../constants/routes';
import * as servicesProdutos from '../../services/produtos';
// import * as servicesEncomendas from '../../services/encomendas';
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

        // servicesEncomendas.getUltimas(30)
        //     .then(response => this.setState({ ultimasEncomendas: response.data }))
        //     .catch(error => console.error(error.response));
    }

    buttonFormatter = (cell, row) => {
        return <Button size="sm">Ver produto</Button>
    }

    render() {
        return (
            <Row>
                <Col>
                    <Row>
                        <h4>Produtos mais vendidos</h4>
                    </Row>
                    <Row className="mt-3">
                        <BootstrapTable version='4' data={this.state.maisVendidos} >
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
                    </Row>
                    <Row className="mt-3">
                        <h4>Últimas encomendas</h4>
                    </Row>
                </Col>
            </Row >
        );
    }
}

export default GestorHome;