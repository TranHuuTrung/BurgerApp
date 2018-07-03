import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';


const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.igrs)
            .map(igKey => {
                return( 
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey} : {props.igrs[igKey]}</span>
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
            <p>Total Price: <strong>{Number.parseFloat(props.price).toFixed(2)} $</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.CancelModal}>Cancel</Button>
            <Button btnType="Success" clicked={props.Continued}>Continue</Button>
        </Aux>
    )
};

const mapStateToProps = state => {
    return {
        igrs: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    };
};

export default connect(mapStateToProps)(OrderSummary);