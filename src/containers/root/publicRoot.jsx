import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default class PublicRoot extends Component {
    render() {
        if (!this.props.isSignIn) {
            return (
                <Route {...this.props} />
            );
        } else {
            return (<Redirect to={'/private'} />);
        }
    }
}

PublicRoot.propTypes = {
    isSignIn: propTypes.bool.isRequired,
}