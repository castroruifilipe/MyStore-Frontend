import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/lib/ti';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import * as services from '../../../../services/utilizadores';
import * as routes from '../../../../constants/routes';
import metodoPagEnum from '../../../../constants/metodoPagEnum';
import estadoEnum from '../../../../constants/estadoEnum';
import { formatterPrice } from '../../../../constants/formatters';
import './style.css';

class ConsultarCliente extends Component {

    constructor(props) {
        super(props);
        this.state = {
            codigo: '',
            nome: '',
            email: '',
            telemovel: '',
            contribuinte: '',
            rua: '',
            localidade: '',
            codigoPostal: '',
            encomendas: [],
        };
    }

    componentWillMount() {
        services.getCliente(this.props.match.params.id, this.props.sessionStore.accessToken)
            .then(response => {
                console.log(response);
                let data = [];
                response.data.encomendas.forEach(v => {
                    data.push({
                        numero: v.id,
                        data: new Date(v.dataRegisto).toLocaleString(),
                        total: v.total,
                        estado: v.estado,
                        metodo: v.metodoPagamento,
                    })
                }
                );
                this.setState({ ...response.data, encomendas: data });
            })
            .catch(error => console.error(error.response));
    }

    buttonFormatter = (cell, row) => {
        return <Button size="sm" tag={Link} to={routes.GESTAO_ENCOMENDAS + row.numero}>Ver encomenda</Button>
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

    render() {
        let {
            nome,
            email,
            telemovel,
            contribuinte,
            rua,
            localidade,
            codigoPostal,
        } = this.state;

        return (
            <Row>
                <Col >
                    <Row>
                        <Col className="p-0">
                            <h3>Ficha de cliente</h3>
                            <h6>Cliente #{this.state.id}</h6>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="pl-0">
                            <h5 className="textColor">Dados pessoais</h5>
                            <div className="form-label-group">
                                <Input value={nome} disabled placeholder="Nome" type="text" className="form-control" id="nome" onChange={this.onChange} />
                                <label htmlFor="nome">Nome</label>
                            </div>
                            <div className="form-label-group">
                                <Input value={email} disabled placeholder="Email" type="email" className="form-control" id="email" onChange={this.onChange} />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="form-label-group">
                                <Input value={telemovel} disabled placeholder="Telemóvel" type="text" className="form-control" id="telemovel" onChange={this.onChange} />
                                <label htmlFor="telemovel">Telemóvel</label>
                            </div>
                            <div className="form-label-group">
                                <Input value={contribuinte} disabled placeholder="Contribuinte" type="text" className="form-control" id="contribuinte" onChange={this.onChange} />
                                <label htmlFor="contribuinte">Contribuinte</label>
                            </div>
                        </Col>
                        <Col>
                            <h5 className="textColor">Endereço</h5>
                            <div className="form-label-group">
                                <Input value={rua} disabled placeholder="Rua" type="text" className="form-control" id="rua" onChange={this.onChange} />
                                <label htmlFor="rua">Rua</label>
                            </div>
                            <div className="form-label-group">
                                <Input value={localidade} disabled placeholder="Rua" type="text" className="form-control" id="localidade" onChange={this.onChange} />
                                <label htmlFor="localidade">Localidade</label>
                            </div>
                            <div className="form-label-group">
                                <Input value={codigoPostal} disabled placeholder="Código Postal" type="text" className="form-control" id="codigoPostal" onChange={this.onChange} />
                                <label htmlFor="codigoPostal">Código Postal</label>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col className="p-0">
                            <h5 className="textColor">Encomendas</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pl-0">
                            <BootstrapTable version='4' data={this.state.encomendas} pagination >
                                <TableHeaderColumn isKey dataField='numero' width='15%' filter={{ type: 'TextFilter' }} className='customHeader' dataAlign="center">Nº Encomenda</TableHeaderColumn>
                                <TableHeaderColumn dataField='data' dataSort={true} caretRender={this.getCaret} className="customHeader" dataAlign="center">Data</TableHeaderColumn>
                                <TableHeaderColumn dataField='total' dataFormat={this.priceFormatter} width='10%' className="customHeader" dataAlign="center">Total</TableHeaderColumn>
                                <TableHeaderColumn dataField='metodo' dataFormat={this.enumFormatter} formatExtraData={metodoPagEnum} className="customHeader" dataAlign="center">Método pagamento</TableHeaderColumn>
                                <TableHeaderColumn dataField='estado' dataFormat={this.enumFormatter} formatExtraData={estadoEnum} className="customHeader" dataAlign="center">Estado</TableHeaderColumn>
                                <TableHeaderColumn dataField='button' width='15%' dataAlign="center" dataFormat={this.buttonFormatter} className="customHeader"></TableHeaderColumn>
                            </BootstrapTable>
                        </Col>
                    </Row>
                </Col>
            </Row >
        );
    }
}

export default compose(
    inject('sessionStore'),
    observer
)(ConsultarCliente);