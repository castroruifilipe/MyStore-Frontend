import { observable, action } from 'mobx';

class SessionStore {

    @observable accessToken = null;
    @observable user = {};


    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setAccessToken = accessToken => {
        this.accessToken = accessToken;
        if (accessToken) {
            sessionStorage.setItem('accessToken', accessToken);
        } else {
            sessionStorage.removeItem('accessToken');
            this.setUser({});
        }
    }

    @action setUser = user => {
        this.user = user;
    }

}

export default SessionStore;