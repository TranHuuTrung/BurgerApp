import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';


const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
            .map(igKey => {
                return( 
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey} : {props.ingredients[igKey]}</span>
                    </li>
                )
            });
    return (
        <Aux>
            <h3>Your Orders</h3>
            <p>A delicous burger with following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>{props.totalPrice.toFixed(2)} $</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.CancelModal}>Cancel</Button>
            <Button btnType="Success" clicked={props.Continued}>Continue</Button>
        </Aux>
    )
};

export default OrderSummary;