import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Login } from '../../actions/auth';

let EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const BASE_URL = process.env.BASE_URL;

class Root extends Component {
    constructor() {
        super();
        this.ErrorMessage = {
            emailError: "Email is wrong",
            passwordError: "Password is wrng",
        }
        this.state = {
            email: '',
            password: '',
            error: { emailError: false, passwordError: false },
            showError: false,
        };
    }

    inputHandler = e => {
        const { name, value } = e.target;
        const error = this.validateField(name, value);
        this.setState({ [name]: value, error: Object.assign({}, this.state.error, error), showError: false });
    }

    validateField(fieldName, value) {
        let error = {};
        switch (fieldName) {
            case 'email':
                if (value && !EMAIL_REGEX.test(value)) {
                    error.emailError = true;
                } else {
                    error.emailError = false;
                }
                break;
            case 'password':
                if (value && !(value.length >= 6)) {
                    error.passwordError = true;
                } else {
                    error.passwordError = false;
                }
                break;
            default:
                throw new Error(`${fieldName} is not definrd`);
        }
        return error;
    }

    clickHandler = () => {
        const { email, password, error } = this.state;
        if (email && password && Object.keys(error).every((item) => !error[item])) {
            this.props.Login(email, password, this.props.history);
        } else {
            this.setState({ showError: true });
        }
    }

    render() {
        const { email, password, error, showError } = this.state;
        let errorMessage = null;
        if (!(email && password)) {
            errorMessage = 'Email and Password are empty'
        } else {
            const keys = Object.keys(error);
            keys.forEach((key) => {
                if (error[key]) {
                    errorMessage = `${this.ErrorMessage[key]}`;
                }
            });
        }
        return (
            <div className="main">
                <div className="demoRequest">
                    <Link to='/request'>Demo Request</Link>
                </div>
                <div className="login-form">
                    <h1>Sign In</h1>
                    <div className="head">
                        <img src='/public/images/user_login.png' />
                    </div>
                    <form className="form" action="javascript:void(0);" >
                        <input
                            className={`valid ${error.emailError ? 'error' : ''}`}
                            name="email"
                            type="text"
                            value={email}
                            onChange={this.inputHandler}
                            placeholder="Email"
                        />
                        <input
                            className={`valid ${error.passwordError ? 'error' : ''}`}
                            name="password"
                            type="password"
                            value={password}
                            onChange={this.inputHandler}
                            placeholder="Password"
                        />
                        {
                            (errorMessage && showError) ? (
                                <span className="error-message">{errorMessage}</span>
                            ) : ''
                        }
                        <button
                            type="submit"
                            className="loginBtn"
                            onClick={this.clickHandler}
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = store => {
    return {};
}
const mapDispatchToProps = dispatch => {
    return {
        Login: (email, password, history) => dispatch(Login(email, password, history)),
    };
};
Root.propTypes = {
    Login: propTypes.func.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));