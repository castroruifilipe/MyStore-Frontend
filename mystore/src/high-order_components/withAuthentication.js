import React from 'react';
import { inject } from 'mobx-react';

import * as services from '../services/utilizadores';

const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {

        componentWillMount() {
            const { sessionStore } = this.props;
            let accessToken = sessionStorage.getItem('accessToken');
            if (accessToken) {
                sessionStore.setAccessToken(accessToken);
                services.getUser(accessToken)
                    .then(response => {
                        sessionStore.setUser(response.data)
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }

        render() {
            return <Component {...this.props} />
        }
    }

    return inject('sessionStore')(WithAuthentication);
}

export default withAuthentication;