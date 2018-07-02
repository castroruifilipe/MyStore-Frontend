import React, { Component } from 'react';
import { Row, Button, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/lib/ti';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import * as routes from '../../constants/routes';
import * as services from '../../services/produtos';
import { formatterPrice } from '../../constants/formatters';

class GestaoProdutos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            produtos: [],
        }
    }

    componentWillMount() {
        services.getAllProdutos()
            .then(response => {
                let data = [];
                response.data.forEach(p => {
                    data.push({
                        codigo: p.codigo,
                        nome: p.nome,
                        categoria: p.categoria.descricao,
                        base: p.precoBase,
                        promo: p.precoPromocional,
                        stock: p.stock,
                    })
                }
                );
                this.setState({ produtos: data });
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

    buttonFormatter = (cell, row) => {
        return <Button size="sm" tag={Link} to={routes.GESTAO_PRODUTOS + row.codigo}>Ver produto</Button>
    }

    render() {

        return (
            <Row>
                <Col >
                    <Row>
                        <Col className="p-0">
                            <h4>Gestão de Produtos</h4>
                        </Col>
                        <Col className="p-0" align="right">
                        <Button color="primary"  tag={Link} to={routes.GESTAO_PRODUTOS + '/criar'}>Novo produto</Button>
                    </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="p-0">
                            <BootstrapTable version='4' data={this.state.produtos} pagination >
                                <TableHeaderColumn isKey dataField='codigo' dataSort={true} caretRender={this.getCaret} width="10%" filter={{ type: 'TextFilter' }} className='customHeader' dataAlign="center">Código</TableHeaderColumn>
                                <TableHeaderColumn dataField='nome' dataSort={true} caretRender={this.getCaret} filter={{ type: 'TextFilter' }} className="customHeader" dataAlign="center">Nome</TableHeaderColumn>
                                <TableHeaderColumn dataField='categoria' dataSort caretRender={this.getCaret} className="customHeader" dataAlign="center">Categoria</TableHeaderColumn>
                                <TableHeaderColumn dataField='base' dataFormat={this.priceFormatter} dataSort caretRender={this.getCaret} width='12%' className="customHeader" dataAlign="center">Preco Base</TableHeaderColumn>
                                <TableHeaderColumn dataField='promo' dataFormat={this.priceFormatter} dataSort caretRender={this.getCaret} width='12%' className="customHeader" dataAlign="center">Promoção</TableHeaderColumn>
                                <TableHeaderColumn dataField='stock' className="customHeader" dataAlign="center" dataSort caretRender={this.getCaret} zwidth='10%'>Stock</TableHeaderColumn>
                                <TableHeaderColumn dataField='button' dataAlign="center" dataFormat={this.buttonFormatter} width='12%' className="customHeader"></TableHeaderColumn>
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
)(GestaoProdutos);