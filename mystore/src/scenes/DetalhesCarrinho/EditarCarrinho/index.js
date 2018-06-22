import React, { Component } from 'react';
import { Table, Input } from 'reactstrap';
import { formatterPrice } from '../../../constants/formatters';

class EditarCarrinho extends Component {

    constructor(props) {
        super(props);
        this.state = {
            carrinho: this.props.carrinho,
        }
    }

    apagarLinha = (codigo, event) => {
        let linhas = this.state.carrinho.linhasCarrinho;
        let index = linhas.findIndex(linha => linha.produto.codigo === codigo);
        linhas.splice(index, 1);
        this.setState({
            carrinho: { ...this.state.carrinho, linhasCarrinho: linhas }
        });
        this.props.onChangeQnt(codigo, 0);
    }

    onChangeQnt = (codigo, event) => {
        let linhas = this.state.carrinho.linhasCarrinho;
        let index = linhas.findIndex(linha => linha.produto.codigo === codigo);
        let linha = linhas[index];
        let quantidade = event.target.value;
        let preco = (linha.produto.precoPromocional !== 0) ? linha.produto.precoPromocional : linha.produto.precoBase;
        linha = { ...linha, quantidade: quantidade, subTotal: quantidade * preco };
        linhas[index] = linha;
        this.setState({
            carrinho: { ...this.state.carrinho, linhasCarrinho: linhas }
        });
        this.props.onChangeQnt(codigo, quantidade);
    }

    makeRows = (rows) => {
        this.state.carrinho.linhasCarrinho.forEach((linha) => {
            let desconto = 0;
            if (linha.produto.precoPromocional !== 0) {
                desconto = (linha.produto.precoBase - linha.produto.precoPromocional) * linha.quantidade;
            }
            rows.push(
                <tr key={linha.produto.codigo}>
                    <td className="pl-3" >{linha.produto.codigo}</td>
                    <td>{linha.produto.nome}</td>
                    <td className="centerElem">
                        <Input type="number" name="number" className="numeric" placeholder="qnt" min={1} max={linha.produto.stock}
                            onChange={(e) => { this.onChangeQnt(linha.produto.codigo, e) }} value={linha.quantidade} />
                    </td>
                    <td className="text-center">{formatterPrice.format(linha.produto.precoBase)}</td>
                    <td className="text-center">{formatterPrice.format(linha.produto.precoBase * linha.quantidade)}</td>
                    <td className="text-center">{formatterPrice.format(desconto)}</td>
                    <td className="text-center">{formatterPrice.format(linha.subTotal)}</td>
                    <td>
                        <button type="button" className="close" aria-label="Close" onClick={(e) => { this.apagarLinha(linha.produto.codigo, e) }} >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        let rows = [];
        this.makeRows(rows);
        return (
            <Table className="align-middle" borderless responsive>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th style={{ width: '23%' }}>Produto</th>
                        <th className="text-center">Quantidade</th>
                        <th className="text-center">Preco Unitário</th>
                        <th className="text-center">Preco</th>
                        <th className="text-center">Desconto</th>
                        <th className="text-center">Sub-Total</th>
                        <th className="text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>


        );
    }
}

export default EditarCarrinho;