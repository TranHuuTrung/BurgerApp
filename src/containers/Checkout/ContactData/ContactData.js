import React, { Component } from 'react';
import {connect} from 'react-redux';

import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios-order';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Phone Number'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10,
                    maxLength: 11
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ],
                },
                value: 'cheapest',
                validation: {},
                valid: true
            }

        },
        formIsValid: false

    }
    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIndentifer in this.state.orderForm){
            formData[formElementIndentifer] = this.state.orderForm[formElementIndentifer].value;
        }
        
        const order = {
            ingredients: this.props.igrs,
            price: this.props.price,
            orderData: formData
        }

        this.props.onOrderBurger(order, this.props.token);
    }

    checkValidity = (value, rules) => {
         let isValid = true;
         
         if(!rules){
             return true;
         }

         if(rules.required){
             isValid = value.trim() !== '' && isValid;
         }

         if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
         return isValid;
    }

    inputChangedHandler = (event, inputIndentifer) => {
        const updateOrderForm = {
            ...this.state.orderForm
        };
        const updateFormElement = {
            ...updateOrderForm[inputIndentifer]
        };

        updateFormElement.value = event.target.value;
        updateFormElement.touched = true;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateOrderForm[inputIndentifer] = updateFormElement;
        
        let formIsValid = true;
        for(let inputIndentifer in updateOrderForm){
            formIsValid = updateOrderForm[inputIndentifer].valid && formIsValid;
        }
        
        this.setState({orderForm: updateOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {/* <Input elementType={"..."} elementConfig={"..."} value={"..."} /> */}
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>    
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return{
        igrs: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.loading,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData, axios));