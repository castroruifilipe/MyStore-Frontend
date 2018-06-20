import { configure } from 'mobx';

import SessionStore from './sessionStore';
import CarrinhoStore from './carrinhoStore';


configure({ enforceActions: true });

class RootStore {

    constructor() {
        this.sessionStore = new SessionStore(this);
        this.carrinhoStore = new CarrinhoStore(this);
    }

}

const rootStore = new RootStore();

export default rootStore;