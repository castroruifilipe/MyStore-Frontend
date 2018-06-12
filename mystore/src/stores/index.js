import { configure } from 'mobx';

import SessionStore from './sessionStore';
import ProdutosStore from './produtosStore';


configure({ enforceActions: true });

class RootStore {

    constructor() {
        this.sessionStore = new SessionStore(this);
        this.produtosStore = new ProdutosStore(this);
    }

}

const rootStore = new RootStore();

export default rootStore;