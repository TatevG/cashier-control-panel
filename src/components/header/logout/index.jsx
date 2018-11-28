import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';

class LogOut extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }
    async logOut() {
        this.props.LogOut(this.props.history);
    }
    render() {
        return (
            <header className="logout">
                <button className="btn" type="submit" onClick={this.logOut}>Log Out</button>
            </header>
        );
    }
}
LogOut.propType = {
    LogOut: propTypes.func.isRequired,
}
export default withRouter(LogOut);