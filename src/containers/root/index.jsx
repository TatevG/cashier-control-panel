import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import Login from '../login';
import PrivateRoot from './privateRoot';
import PublicRoot from './publicRoot';
import { Logout, IsSignIn } from '../../actions/auth';
import Home from '../../containers/home';
import TypeInformation from '../../containers/typeInformation';
import CardNumber from '../../containers/cardNumber';
import DemoRequest from '../../components/demoRequest';

class Root extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        const token = window.localStorage.getItem('accessToken')
        if (token) {
            this.props.IsSignIn(token);
        }
    }
    render() {
        const { loading, isSignIn } = this.props;
        if (loading) {
            return (
                <div>loading...</div>
            )
        } else {
            return (
                <Switch>
                    <PublicRoot path='/' isSignIn={isSignIn} component={Login} exact />
                    <PrivateRoot
                        path='/private'
                        isSignIn={isSignIn}
                        LogOut={this.props.LogOut}
                    >
                        <Home/>
                    </PrivateRoot>
                    <PrivateRoot
                        path='/cardNumber'
                        isSignIn={isSignIn}
                        LogOut={this.props.LogOut}
                    >
                        <CardNumber/>
                    </PrivateRoot>
                    <PrivateRoot
                        path='/transaction'
                        isSignIn={isSignIn}
                        LogOut={this.props.LogOut}
                    >
                        <TypeInformation/>
                    </PrivateRoot>
                    <PublicRoot path='/signin' isSignIn={isSignIn} component={Login} />
                    <PublicRoot path='/request' isSignIn={isSignIn} component={DemoRequest} />
                </Switch>
            )
        }
    }
}
const mapStateToProps = store => {
    return {
        loading: store.user.loading,
        isSignIn: store.user.isSignIn,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        IsSignIn: (token) => dispatch(IsSignIn(token)),
        LogOut: (history) => dispatch(Logout(history)),
    };
};
Root.propTypes = {
    loading: propTypes.bool.isRequired,
    isSignIn: propTypes.bool.isRequired,
    IsSignIn: propTypes.func.isRequired,
    LogOut: propTypes.func.isRequired,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
