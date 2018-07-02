import React, { Component } from 'react';
import { Row, Col, Input } from 'reactstrap';

import * as services from '../../../../services/categorias';

class EditarProduto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: this.props.produto.nome,
            categoria: this.props.produto.categoria,
            stock: this.props.produto.stock,
            descricao: this.props.produto.descricao,
            precoBase: this.props.produto.precoBase,
            categorias: [],
        }
    }

    componentWillMount() {
        services.getCategorias()
            .then(response => {
                let data = [];
                response.data.forEach(c =>
                    data.push({ key: c.id, descricao: c.descricao })
                );
                this.setState({ categorias: data });
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
        this.props.onChange(event);
    }

    render() {
        let {
            nome,
            categoria,
            stock,
            descricao,
            precoBase,
        } = this.state;
        return (
            <div>
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
                        <select className="form-control" id="categoria" value={categoria.descricao} onChange={this.onChange}>
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

export default EditarProduto;