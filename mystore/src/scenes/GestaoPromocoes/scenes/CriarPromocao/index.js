import React, { Component } from 'react';
import { Row, Col, Input, Button, FormGroup, Label } from 'reactstrap';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/lib/ti';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as servicesCategorias from '../../../../services/categorias';
import * as servicesProdutos from '../../../../services/produtos';
import { formatterPercent, formatterPrice } from '../../../../constants/formatters'



class CriarPromocao extends Component {

    constructor(props) {
        super(props);
        this.state = {
            desconto: '',
            descricao: '',
            dataInicio: '',
            dataFim: '',
            produtos: [],
            categoria: '',
            listCategorias: undefined,
            listProdutos: undefined,
            tipo: 'categoria',
            selectRowProp: {
                mode: 'checkbox',
                showOnlySelected: true,
                clickToSelect: true,
                onSelect: this.onRowSelect,
                onSelectAll: this.onSelectAll,
                columnWidth: '60px'
            },
        }
    }

    componentWillMount() {
        servicesCategorias.getCategorias()
            .then(response => {
                let data = [];
                response.data.forEach(c =>
                    data.push({ key: c.id, descricao: c.descricao })
                );
                this.setState({ listCategorias: data });
            })
            .catch(error => console.error(error.response));
        servicesProdutos.getAllProdutos()
            .then(response => {
                let data = [];
                response.data.forEach(p => {
                    data.push({
                        codigo: p.codigo,
                        nome: p.nome,
                        categoria: p.categoria.descricao,
                        precoBase: p.precoBase,
                        stock: p.stock,
                    })
                });
                this.setState({ listProdutos: data });
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

    onRowSelect = (row, isSelected, e) => {
        let produtos = this.state.produtos;
        if (isSelected) {
            produtos.push(row.codigo);
        } else {
            let index = produtos.findIndex(num => num === row.codigo);
            produtos.splice(index, 1);
        }
        this.setState({ produtos });
    }

    onSelectAll = (isSelected, rows) => {
        let produtos = this.state.produtos;
        if (isSelected) {
            this.state.listProdutos.forEach(produto => produtos.push(produto.codigo));
        } else {
            produtos = [];
        }
        this.setState({ produtos });
    }

    onChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
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




    render() {
        if (!this.state.listCategorias || !this.state.listProdutos) {
            return null;
        }

        let {
            desconto,
            descricao,
            dataInicio,
            dataFim,
            produtos,
            categoria,
        } = this.state;
        return (
            <Row className="ml-0">
                <Col>
                    <Row>
                        <Col>
                            <h3 className='headerColor'>Criar Promoção</h3>
                        </Col>
                        <Col align="right">
                            <Button color="danger" className="mr-2 block inline-md" style={{ width: '180px' }} onClick={this.apagar}>
                                Cancelar
                            </Button>
                            <Button color="success" className="mr-2 block inline-md" style={{ width: '180px' }} onClick={this.apagar}>
                                Guardar
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <div className="form-label-group">
                                <Input value={descricao} placeholder="Descrição" type="text" className="form-control" id="descricao" onChange={this.onChange} />
                                <label htmlFor="descricao">Descrição</label>
                            </div>
                            <div className="form-label-group">
                                <Input value={desconto} placeholder="Desconto" type="text" className="form-control" id="desconto" onChange={this.onChange} />
                                <label htmlFor="desconto">Desconto</label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-label-group">
                                <Input value={dataInicio} placeholder="Data de início" type="text" className="form-control" id="dataInicio" onChange={this.onChange} />
                                <label htmlFor="dataInicio">Data de início</label>
                            </div>
                            <div className="form-label-group">
                                <Input value={dataFim} placeholder="Data de fim" type="text" className="form-control" id="dataFim" onChange={this.onChange} />
                                <label htmlFor="dataFim">Data de fim</label>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <span><strong>Deseja registar a promoção em alguns produtos ou numa determinada categoria?</strong></span>

                            <FormGroup tag="fieldset" required>
                                <FormGroup check className="py-2">
                                    <Label check>
                                        <Input type="radio" defaultChecked name="tipo" onChange={event => { this.setState({ tipo: 'categoria' }) }} />
                                        {' '}Numa categoria
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="tipo" onChange={event => { this.setState({ tipo: 'produtos' }) }} />
                                        {' '}Em alguns produtos
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        {
                            this.state.tipo === 'categoria'
                                ?
                                <Col md="6">
                                    <p className="mb-1">Categoria:</p>
                                    <select className="form-control" id="categoria" value={categoria.descricao} onChange={this.onChange}>
                                        {this.state.listCategorias.map(o => <option key={o.key}>{o.descricao}</option>)}
                                    </select>
                                </Col>
                                :
                                <Col>
                                    <h5 className="headerColor">Produtos</h5>
                                    <BootstrapTable version='4' data={this.state.listProdutos} selectRow={this.state.selectRowProp} pagination >
                                        <TableHeaderColumn isKey dataField='codigo' dataSort caretRender={this.getCaret} width="10%" filter={{ type: 'TextFilter' }} className='customHeader' dataAlign="center">Código</TableHeaderColumn>
                                        <TableHeaderColumn dataField='nome' dataSort caretRender={this.getCaret} filter={{ type: 'TextFilter' }} className="customHeader" dataAlign="center">Nome</TableHeaderColumn>
                                        <TableHeaderColumn dataField='categoria' className="customHeader" filter={{ type: 'TextFilter' }} dataAlign="center">Categoria</TableHeaderColumn>
                                        <TableHeaderColumn dataField='precoBase' dataSort caretRender={this.getCaret} dataFormat={this.priceFormatter} width='12%' className="customHeader" dataAlign="center">Preco Base</TableHeaderColumn>
                                        <TableHeaderColumn dataField='stock' dataSort caretRender={this.getCaret} className="customHeader" dataAlign="center" width='10%'>Stock</TableHeaderColumn>
                                    </BootstrapTable>
                                </Col>
                        }
                    </Row>


                </Col>
            </Row>
        );
    }

}

export default CriarPromocao;