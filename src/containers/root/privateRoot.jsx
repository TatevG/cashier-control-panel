import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Login from '../login';
import LogOut from '../../components/header/logout';
import Footer from '../../components/footer';

export default class PrivateRoot extends Component {
    render() {
        if (this.props.isSignIn) {
            return (
                <Route {...this.props} >
                    <div className="privateMain">
                        <div className="header">
                            <LogOut isSignIn={this.props.isSignIn} LogOut={this.props.LogOut} />
                        </div>
                        <div className="wrapper">
                            {this.props.children}
                        </div>
                        <Footer />
                    </div>
                </Route>
            );
        } else {
            return (<Login />);
        }
    }
}

PrivateRoot.propTypes = {
    isSignIn: propTypes.bool.isRequired,
    LogOut: propTypes.func.isRequired,
    path: propTypes.string.isRequired,
}