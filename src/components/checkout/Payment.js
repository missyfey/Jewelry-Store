import React, { Component } from 'react'
import {productContext} from '../../context'
import PaypalButton from './PaypalButton'

export default class Payment extends Component{
static contextType = productContext
render(){

    let {contactInfo,stepBack} = this.props
    const fullAddress = contactInfo.suite+' '+contactInfo.address+', '+contactInfo.city+' '+contactInfo.province+', '+contactInfo.postalcode+', '+contactInfo.country
    let{cartTotal,clearCart} = this.context
    let total =Number((( cartTotal + contactInfo.shippingPrice ).toFixed(2)))
return (
    <div>
        <h3 className="contact-form-header">Payment</h3>
        <div className="shipping-top-box payment-top-box">
            <span className="shipping-title">Contact</span><span>{contactInfo.email}</span><span className="changeBtn" onClick={stepBack}>Change</span>
            <span className="shipping-title">Ship to</span><span>{fullAddress}</span><span className="changeBtn" onClick={stepBack}>Change</span>
            <span className="shipping-title">Method</span><span>{contactInfo.shipping} <b>${contactInfo.shippingPrice}</b></span><span></span>
        </div>
        <h3 className="contact-form-header">Total</h3>
        <p>${cartTotal} + ${contactInfo.shippingPrice} = ${total}</p>
            <div className="empty-cart">
            <PaypalButton 
                total={cartTotal}
                //change to total later
                // history={window.location.pathname}
                clearCart ={clearCart}/>
            </div>              

    </div>
)
}
}
