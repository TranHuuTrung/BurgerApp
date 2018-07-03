import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';
import axios from '../../axios-order';

class BuggerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purcharsing: false
        }
    }

    updatePurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purcharseHandler = () => {
        this.setState({ purcharsing: true });
    }

    purcharseCancelHandler = () => {
        this.setState({ purcharsing: false });
    }

    purcharseContinuehandler = () => {
        // alert("You continued !");
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    componentDidMount() {
       this.props.onInitIngredients();
    }
    render() {
        const disabledInfo = {
            ...this.props.igrs
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.props.error ? <p>Can't be loaded burger</p> : <Spinner />;
        if (this.props.igrs) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.igrs} />
                    <BuildControls
                        ingredientDeducted={this.props.onIngredientRemoved}
                        ingredientAdded={this.props.onIngredientAdded}
                        disabled={disabledInfo}
                        totalPrice={this.props.price}
                        purcharsable={!this.updatePurchasable(this.props.igrs)}
                        ordered={this.purcharseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                CancelModal={this.purcharseCancelHandler}
                Continued={this.purcharseContinuehandler}
            />;
        }
        return (
            <Aux>
                <Modal show={this.state.purcharsing} modalClosed={this.purcharseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        igrs: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (igrName) => dispatch(actions.addIngredient(igrName)),
        onIngredientRemoved: (igrName) => dispatch(actions.removeIngredient(igrName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BuggerBuilder, axios));