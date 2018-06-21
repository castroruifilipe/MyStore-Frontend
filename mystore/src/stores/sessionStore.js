import { observable, action } from 'mobx';
import decode from 'jwt-claims';

class SessionStore {

    @observable accessToken = null;
    @observable user = {};
    @observable role = null;


    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setAccessToken = accessToken => {
        this.accessToken = accessToken;
        if (accessToken) {
            let claims = decode(accessToken);
            this.setRole(claims.role);
            sessionStorage.setItem('accessToken', accessToken);
        } else {
            this.setRole(null);
            sessionStorage.removeItem('accessToken');
            this.setUser({});
        }
    }

    @action setUser = user => {
        this.user = user;
    }

    @action setRole = role => {
        this.role = role;
    }

}

export default SessionStore;