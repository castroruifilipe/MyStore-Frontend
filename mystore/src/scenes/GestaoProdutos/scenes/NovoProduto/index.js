import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';
import PencilIcon from 'react-icons/lib/fa/edit';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import * as servicesCategorias from '../../../../services/categorias';
import * as servicesProdutos from '../../../../services/produtos';
import * as routes from '../../../../constants/routes';

class NovoProduto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            categoria: "",
            stock: '',
            descricao: "",
            precoBase: "",
            categorias: [],
        }
    }

    componentWillMount() {
        servicesCategorias.getCategorias()
            .then(response => {
                let data = [];
                response.data.forEach(c =>
                    data.push({ key: c.id, descricao: c.descricao })
                );
                this.setState({ categorias: data, categoria: data[0].descricao });
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

    onChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    guardar = () => {
        let dados = {
            nome: this.state.nome,
            categoria: this.state.categoria,
            stock: this.state.stock,
            descricao: this.state.descricao,
            precoBase: this.state.precoBase,
        };
        servicesProdutos.criarProduto(dados, this.props.sessionStore.accessToken)
            .then(response => {
                this.props.history.push(routes.GESTAO_PRODUTOS);
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

    isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n)

    render() {
        let {
            nome,
            stock,
            descricao,
            categoria,
            precoBase,
        } = this.state;

        const isInvalid =
            nome === "" ||
            stock === "" || stock <= 0 || !this.isNumeric(stock) ||
            precoBase === "" || precoBase <= 0 || !this.isNumeric(precoBase) ||
            categoria === "";

        return (
            <div>
                <Row>
                    <Col>
                        <h3 className='headerColor'>Novo produto</h3>
                    </Col>
                    <Col align="center">
                        <div>
                            <Button color="success" disabled={isInvalid} className="mr-2 block inline-md" style={{ width: '180px' }} onClick={this.guardar}>
                                <PencilIcon className="mr-1" />
                                Guardar
                            </Button>
                            <Button color="secondary" className="mr-2 block inline-md" style={{ width: '180px' }} tag={Link} to={routes.GESTAO_PRODUTOS}>
                                Cancelar
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <div className="form-label-group">
                            <Input value={nome} placeholder="Nome" type="text" className="form-control" id="nome" onChange={this.onChange} />
                            <label htmlFor="nome">Nome</label>
                        </div>
                        <div className="form-label-group">
                            <Input value={precoBase} placeholder="Preço Base" type="text" className="form-control" id="precoBase" onChange={this.onChange} />
                            <label htmlFor="precoBase">Preço base</label>
                        </div>
                        <div className="form-label-group">
                            <Input value={stock} placeholder="Stock" type="text" className="form-control" id="stock" onChange={this.onChange} />
                            <label htmlFor="stock">Stock</label>
                        </div>
                        <p className="mb-1">Categoria:</p>
                        <select className="form-control" id="categoria" value={categoria} onChange={this.onChange}>
                            {this.state.categorias.map(o => <option key={o.key}>{o.descricao}</option>)}
                        </select>
                    </Col>
                    <Col>
                        <div className="form-group">
                            <label htmlFor="descricao">Descrição:</label>
                            <textarea className="form-control" rows="8" id="descricao" onChange={this.onChange} value={descricao}
                                placeholder="Descrição"></textarea>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default compose(
    inject('sessionStore'),
    observer
)(NovoProduto);