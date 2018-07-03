import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

// import * as actions from '../../store/actions/index';


class Checkout extends Component {

    // componentDidMount () {
    //     this.props.onInitPurchase();
    // }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to="/" />;
        if (this.props.igrs) {
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.igrs}
                        checkoutCanceled={this.checkoutCanceledHandler}
                        checkoutContined={this.checkoutContinedHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        igrs: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit)
//     };
// };

export default connect(mapStateToProps)(Checkout);