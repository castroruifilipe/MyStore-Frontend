import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';

const withAuthorization = (accessCondition) => (Component) => {
    class WithAuthorization extends React.Component {

        componentDidMount() {
            if (!this.props.sessionStore.accessToken) {
                this.props.history.push(routes.LOGIN);
            }

            if (!accessCondition) {
                this.props.history.push(routes.HOME);
            }
        }

        render() {
            return <Component {...this.props} />;
        }
    }

    return compose(
        withRouter,
        inject('sessionStore'),
        observer
    )(WithAuthorization);
}

export default withAuthorization;