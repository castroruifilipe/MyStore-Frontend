import { observable, action } from 'mobx';

class CarrinhoStore {

    @observable carrinho = {};

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setCarrinho = carrinho => {
        this.carrinho = carrinho;
    }

    @action setQuantidade = (codigoProduto, quantidade) => {
        this.carrinho.linhasCarrinho.forEach(linha => {
            if (linha.produto.codigo === codigoProduto) {
                linha.quantidade = quantidade;
                return;
            }
        })
    }
   
}

export default CarrinhoStore;