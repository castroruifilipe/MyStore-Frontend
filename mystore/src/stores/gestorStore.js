import { observable, action } from 'mobx';

class ProdutosStore {

    @observable ultimasEncomendas = new Map();

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setUltimasEncomendas = encomendas => {

        encomendas.forEach(encomenda => {
            this.ultimasEncomendas.set(encomenda.codigo, encomenda);
        })
    }

}

export default ProdutosStore;
