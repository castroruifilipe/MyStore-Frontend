import { observable, action } from 'mobx';

class ProdutosStore {

    @observable novidades = new Map();


    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setNovidades = produtos => {
        produtos.forEach(produto => {
            this.novidades.set(produto.codigo, produto);
        })
    }

}

export default ProdutosStore;