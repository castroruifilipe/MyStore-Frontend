import React, { Component } from 'react';
import { Row, Button, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/lib/ti';

import * as services from '../../services/categorias';

class GestaoCategorias extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categorias: [],
        }
    }

    componentWillMount() {
        services.getCategorias()
            .then(response => this.setState({ categorias: response.data }))
            .catch(error => console.error(error));
    }

    apagarCategoria = (id) => {
        console.log(id);
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
        return <Button size="sm" color="danger" onClick={(e) => this.apagarCategoria(row, e)}>Apagar</Button>
    }

    render() {
        return (
            <Row>
                <Col >
                    <Row>
                        <Col className="p-0">
                            <h4>Gestão de Categorias</h4>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="p-0">
                            <BootstrapTable version='4' data={this.state.categorias} pagination >
                                <TableHeaderColumn isKey dataField='id' dataSort caretRender={this.getCaret} width="15%" filter={{ type: 'TextFilter' }} className='customHeader' dataAlign="center">Código</TableHeaderColumn>
                                <TableHeaderColumn dataField='descricao' dataSort caretRender={this.getCaret} className="customHeader" dataAlign="center">Descrição</TableHeaderColumn>
                                <TableHeaderColumn dataField='button' dataAlign="center" dataFormat={this.buttonFormatter} width='15%' className="customHeader"></TableHeaderColumn>
                            </BootstrapTable>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );

    }
}

export default GestaoCategorias;