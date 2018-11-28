import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { GetCardUserByNumber } from '../../actions/transactions';
import _ from 'lodash';

const DIGIT_REGEX = /^\d{1,8}$/;

class CardNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardNumber: '',
        }
        this.handlerChange = this.handlerChange.bind(this);
    }
    componentWillMount() {
        if (_.isEmpty(this.props.data)) {
            this.props.history.push('/private');
        }
    }
    handlerChange(e) {
        const { value } = e.target;
        if (DIGIT_REGEX.test(value)) {
            value.length === 8 ? this.props.GetCardUserByNumber(value, this.props.history) : this.setState({ cardNumber: value });
        }
        if(value === '')
            this.setState({cardNumber: ''});
    }
    render() {
        return (
            <div className="cardNumber">
                <img src="/public/images/nest.jpg" alt="Image" />
                <h1>Insert Card Number</h1>
                <input
                    type="text"
                    name="cardNumber"
                    value={this.state.cardNumber}
                    onChange={this.handlerChange}
                    placeholder="Card Number"
                    autoFocus={true}
                />
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        data: store.transactions.data,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        GetCardUserByNumber: (cardNumber, history) => dispatch(GetCardUserByNumber(cardNumber, history)),
    };
};
CardNumber.propTypes = {
    GetCardUserByNumber: propTypes.func.isRequired,
    data: propTypes.objectOf(propTypes.any).isRequired,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardNumber));