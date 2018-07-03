import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // var obj = { 0: 'a', 1: 'b', 2: 'c' };
    // console.log(Object.keys(obj)); // console: ['0', '1', '2']
    let transformedIngredients = Object.keys(props.ingredients)
            .map( igKey => {
                // console.log(props.ingredients[igKey]); //console : ['1', '2', '3', '2']
                return [...Array(props.ingredients[igKey])].map( (_, i) => {
                    // console.log(igKey);
                    return <BurgerIngredient key={igKey+i} type={igKey} />
                });
            })
            .reduce((arr, el) => {
                return arr.concat(el);
            }, []);
    // console.log(transformedIngredients);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }
            
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;