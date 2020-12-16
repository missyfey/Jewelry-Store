import React, { Component } from 'react'
import {productContext} from '../context'
import CartSummary from '../components/checkout/CartSummary'
import CheckoutInfo from '../components/checkout/CheckoutInfo'

export default class Checkout extends Component{
    static contextType = productContext
    render(){
        const {cartTotal , clearCart,fullPage} = this.context
        return (
            <div className="checkout-page">
                <div className="checkout-banner">
                    <h1>Glamira - Jewelry Store Checkout</h1>
                </div>
                <div className="checkout-summary"><CartSummary /></div>
                <div className="checkout-info">
                <div className="checkout-banner-inside">
                    <h1>Glamira - Jewelry Store Checkout</h1>
                </div>
                    <CheckoutInfo />
                </div>
            </div>
        )
    }
}
