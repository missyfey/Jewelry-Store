import React from 'react'

export default function ShippingInfo({contactInfo,stepBack,shippingMethod,selectedShipping}) {
    const fullAddress = contactInfo.suite+' '+contactInfo.address+', '+contactInfo.city+' '+contactInfo.province+', '+contactInfo.postalcode+', '+contactInfo.country
    const isChecked = (value) =>{
        if(selectedShipping === value){
            return true
        }
    }
    return (
        <div>
            <h3 className="contact-form-header">Shipping information</h3>
            <div className="shipping-top-box">
                <span className="shipping-title">Contact</span><span>{contactInfo.email}</span><span className="changeBtn" onClick={stepBack}>Change</span>
                <span className="shipping-title">Ship to</span><span>{fullAddress}</span><span className="changeBtn" onClick={stepBack}>Change</span>
            </div>
            <h3 className="contact-form-header">Shipping method</h3>
            <div className="shipping-method-box">
                <input type="radio" id="standard" name="shippingmethod" value='standard' onChange={()=>shippingMethod('standard')} checked={isChecked('standard')}/>
                <label htmlFor="standard">Standard</label>
                <p>$19.8</p>

                <input type="radio" id="express" name="shippingmethod" value='express' onChange={()=>shippingMethod('express')} checked={isChecked('express')}/>
                <label htmlFor="express">Express</label>
                <p>$29.8</p>
            </div>
        </div>
    )
}
