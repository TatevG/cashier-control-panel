import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { GetBonusCumulate, GetBonusSpend } from '../../actions/transactions';

const DIGIT_REGEX = /^\d{1,8}$/;
const TYPES = {
    DIESEL: 'DIESEL',
    REGULAR: 'REGULAR',
    PREMIUM: 'PREMIUM',
    SUPER: 'SUPER',
}
class TypeInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: null,
            toggle: true,
            cumulate: '',
            spend: '',
        }
        this.handlerToggled = this.handlerToggled.bind(this);
        this.handlerClick = this.handlerClick.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
    }
    componentWillMount() {
        if (_.isEmpty(this.props.user) || _.isEmpty(this.props.data))
            this.props.history.push('/private');
    }
    handlerToggled() {
        this.setState({ toggle: !this.state.toggle });
    }
    handlerChange(e) {
        const { name, value } = e.target;
        if (DIGIT_REGEX.test(value)) {
            this.setState({ [name]: value });
        }
        if (value === '')
            this.setState({ [name]: '' });
    }
    async handlerClick() {
        if (this.state.toggle) {
            if (await window.modal.confirm('Are you sure?', `You want to add ${this.state.cumulate} points to ${this.props.user.name} ${this.props.user.surname}'s balance? `)) {
                if(this.props.data.type === 'LITER'){
                    this.props.GetBonusCumulate(this.props.cardNumber, parseFloat(this.state.cumulate), this.props.data.id, this.props.history, this.state.active);
                }else{
                    this.props.GetBonusCumulate(this.props.cardNumber, parseFloat(this.state.cumulate), this.props.data.id, this.props.history);
                }                
            }
        } else {
            if (await window.modal.confirm('Are you sure?', `You want to spend ${this.state.spend} points from ${this.props.user.name} ${this.props.user.surname}'s balance? `)) {
                this.props.GetBonusSpend(this.props.cardNumber, parseFloat(this.state.spend), this.props.history);
            }
        }
    }
    render() {
        const { cumulative, spendable, user, balance, data } = this.props;
        const { active, toggle, cumulate, spend } = this.state;
        return (
            <div className="typeInfo">
                {
                    (cumulative && spendable) ?
                        (<div className="can-toggle can-toggle--size-large toggle">
                            <input id="switcher1" type="checkbox" />
                            <label htmlFor="switcher1" onClick={this.handlerToggled}>
                                <div className="can-toggle__switch" data-checked="Spend" data-unchecked="Cumulate"></div>
                            </label>
                        </div>) : (cumulative ? 'Կուտակել' : 'Ծախսել')
                }
                <span>{`${user.name} ${user.surname}`}</span>
                <p className="balance">
                    <span>Cumulate - {(Math.round(balance * 100) / 100)}</span>
                    <span>Spend - {Math.round((balance - (balance / 100) * 10) * 100) / 100}</span>
                </p>
                {
                    (data.type === 'LITER' && toggle && cumulative) ? (
                        <div className="info">
                            <input
                                type="text"
                                placeholder="Ընդհամենը Լիտր"
                                autoFocus={true}
                                name="cumulate"
                                value={cumulate === '' ? '' : cumulate}
                                onChange={this.handlerChange}
                            />
                            <div className="petrolType">
                                <button className={active === TYPES.DIESEL ? 'active' : ''} onClick={() => this.setState({ active: TYPES.DIESEL })}>{TYPES.DIESEL}</button>
                                <button className={active === TYPES.REGULAR ? 'active' : ''} onClick={() => this.setState({ active: TYPES.REGULAR })}>{TYPES.REGULAR}</button>
                                <button className={active === TYPES.PREMIUM ? 'active' : ''} onClick={() => this.setState({ active: TYPES.PREMIUM })}>{TYPES.PREMIUM}</button>
                                <button className={active === TYPES.SUPER ? 'active' : ''} onClick={() => this.setState({ active: TYPES.SUPER })}>{TYPES.SUPER}</button>
                            </div>
                        </div>
                    ) : (data.type === 'CUBES' && toggle && cumulative) ?
                            (<input
                                type="text"
                                placeholder="Ընդհամենը Խորանարդ"
                                autoFocus={true}
                                onChange={this.handlerChange}
                                name="cumulate"
                                value={cumulate === '' ? '' : cumulate}
                            />) : (data.type === 'PERCENT' && toggle && cumulative) ? <input
                                type="text"
                                placeholder="Ընդհամենը Դրամ"
                                autoFocus={true}
                                onChange={this.handlerChange}
                                name="cumulate"
                                value={cumulate === '' ? '' : cumulate}
                            /> : (spendable && !toggle)?  (<input
                                type="text"
                                placeholder="Ընդհամենը Բոնուս"
                                autoFocus={true}
                                onChange={this.handlerChange}
                                name="spend"
                                value={spend}
                            />) : ''
                }
                <button className="confirm" onClick={() => this.handlerClick()}>Confirm</button>
            </div>
        )
    }
}
const mapStateToProps = store => {
    return {
        data: store.transactions.data,
        cumulative: store.user.data.shop[0].cumulative,
        spendable: store.user.data.shop[0].spendable,
        user: store.transactions.user,
        balance: store.transactions.user.balance,
        cardNumber: store.transactions.cardNumber,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        GetBonusCumulate: (cardNumber, total, typeId, history, note) => dispatch(GetBonusCumulate(cardNumber, total, typeId, history, note)),
        GetBonusSpend: (cardNumber, total, history) => dispatch(GetBonusSpend(cardNumber, total, history)),
    };
};
TypeInformation.defaultTypes = {
    balance: 0,
}
TypeInformation.propTypes = {
    GetBonusCumulate: propTypes.func.isRequired,
    GetBonusSpend: propTypes.func.isRequired,
    user: propTypes.objectOf(propTypes.any).isRequired,
    cumulative: propTypes.bool.isRequired,
    spendable: propTypes.bool.isRequired,
    balance: propTypes.number,
    cardNumber: propTypes.string.isRequired,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TypeInformation));