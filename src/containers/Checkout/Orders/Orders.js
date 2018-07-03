import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../../components/Order/Order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';

import * as actions from '../../../store/actions/index';

import axios from '../../../axios-order';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
        // console.log(this.props.token);
        
    }

    render() {
        // console.log(this.props.loading);
        
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                return <Order
                    key={order.id}
                    price={order.price}
                    deliveryMethod={order.orderData.deliveryMethod}
                    ingredients={order.ingredients}
                />
            })
        };
        return (
            <div>
                {orders}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.loading,
        token: state.auth.token
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));