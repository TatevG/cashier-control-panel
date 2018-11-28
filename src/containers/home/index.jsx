import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { CardInfo } from '../../actions/transactions';

const BASE_URL_IMG = process.env.BASE_URL + '/assets/';

class Home extends Component {
    constructor(props) {
        super(props);
        this.handlerClick = this.handlerClick.bind(this);
    }
    componentDidMount() {
        if (this.props.types && this.props.types.length === 1) {
            this.props.history.push(`/types/${this.props.types[0]._id}`)
        }
    }
    handlerClick(id, type) {
        this.props.CardInfo(id, type, this.props.history);
    }
    render() {
        const { types } = this.props;
        return (
            <div className="home">
                {
                    types ?
                        types.map(item => (
                            < div className="showInfo" key={item._id} onClick={() => this.handlerClick(item._id, item.bonuseType)}>
                                <div className="inside">
                                    <img src={BASE_URL_IMG + item.imageUrl} alt="Image" />
                                    <span>{item.name.en}</span>
                                </div>

                            </div>
                        )) : ''
                }
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        types: store.user.data.shopTypePermission,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        CardInfo: (id, type, history) => dispatch(CardInfo(id, type, history)),
    };
};
Home.dafauleTypes = {
    types: [],
}
Home.propTypes = {
    CardInfo: propTypes.func.isRequired,
    types: propTypes.arrayOf(propTypes.any),
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));