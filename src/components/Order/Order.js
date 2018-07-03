import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }
    
    const ingredientOutput = ingredients.map((ig, index )=>{
        return  <span
                    key={index}
                    style={{
                        textTransform:'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }}
                >{ig.name}({ig.amount})</span>; 
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Prices: <strong>{Number.parseFloat(props.price).toFixed(2)} USD </strong></p>
            <small>DeliveryMethod:<strong> {props.deliveryMethod}</strong></small>
        </div>
    );
}

export default order;