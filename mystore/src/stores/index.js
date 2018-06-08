import { configure } from 'mobx';

import SessionStore from './sessionStore';


configure({ enforceActions: true });

class RootStore {

    constructor() {
        this.sessionStore = new SessionStore(this);
    }

}

const rootStore = new RootStore();

export default rootStore;