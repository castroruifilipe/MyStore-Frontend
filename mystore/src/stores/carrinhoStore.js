import { observable, action } from 'mobx';

class CarrinhoStore {

    @observable carrinho = {};

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setCarrinho = carrinho => {
        this.carrinho = carrinho;
    }

   
}

export default CarrinhoStore;