import React from 'react';
import { inject } from 'mobx-react';

const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {

        componentWillMount() {
            const { sessionStore } = this.props;
            let accessToken = sessionStorage.getItem('accessToken');
            if (accessToken) {
                sessionStore.setAccessToken(accessToken);
            }
        }

        render() {
            return <Component {...this.props} />
        }
    }

    return inject('sessionStore')(WithAuthentication);
}

export default withAuthentication;