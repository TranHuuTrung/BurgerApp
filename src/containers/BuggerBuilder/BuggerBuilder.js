import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
        salad: 0.5,
        bacon: 0.4,
        cheese: 0.7,
        meat: 1.4

}
class BuggerBuilder extends Component {
    constructor(props){
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese:0,
                meat: 0,    
            },
            totalPrice: 3,
            purcharsable: false,
            purcharsing: false
        }
    }

    updatePurchasable (ingredients){
        const sum = Object.keys(ingredients)
            .map( igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
        this.setState({ purcharsable: sum > 0});
    }
    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients});
        this.updatePurchasable(updateIngredients);
    }

    removeIngreditionHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){ return ;};
        const updateCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients});
        this.updatePurchasable(updateIngredients);
    }

    purcharseHandler = ()=>{
        this.setState({ purcharsing: true});
    }

    purcharseCancelHandler = () =>{
        this.setState({ purcharsing: false});
    }

    purcharseContinuehandler = () =>{
        alert("You continued !");
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for( let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purcharsing} modalClosed={this.purcharseCancelHandler}> 
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        totalPrice={this.state.totalPrice} 
                        CancelModal={this.purcharseCancelHandler}
                        Continued={this.purcharseContinuehandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientDeducted={this.removeIngreditionHandler}
                    ingredientAdded={this.addIngredientHandler}
                    disabled={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    purcharsable={!this.state.purcharsable}
                    ordered={this.purcharseHandler}
                />
            </Aux>
        );
    }
}

export default BuggerBuilder;