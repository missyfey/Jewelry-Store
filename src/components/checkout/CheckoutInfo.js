import React, { Component } from 'react'
import ContactInfo from './ContactInfo'
import ShippingInfo from './ShippingInfo'
import Payment from './Payment'
import BreadCrumbs from './BreadCrumbs'
import CheckoutNavigation from './CheckoutNavigation'
export default class CheckoutInfo extends Component {
    constructor(){
        super()
        this.state={
            step:1,
            province:[],
            country:'',
            provinceList:[],
            email:'',
            firstname:'',
            lastname:'',
            address:'',
            suite:'',
            city:'',
            postalcode:'',
            saveEmail:false,
            saveInfo:false,
            shipping:'standard',
            shippingPrice: 19.8
        }
    }
    
    navigate = () =>{
        let step = this.state.step
        if(step===1){
            //if form is untauched, should check validate the form
            let allInputs = document.querySelectorAll('.contact-information-form input')
            let allSelects = document.querySelectorAll('.contact-information-form select')
            allInputs.forEach(item => this.validateField(item))
            allSelects.forEach(item => this.validateField(item))
            //check for any error in the form
            let errors = document.querySelectorAll('.errormsg:not(.hidden)')
            let hasError = errors.length !== 0 ? true : false

            if(!hasError){
                step++
                this.setState({
                step
            })
            }
            else{return false}
        }
        else if(step!==1){
            step++
            this.setState({
            step
        })
        }
    }

    updateState = (e)=>{
        const name = e.target.name
        let value = e.target.value
        const type = e.target.type
        value = type === 'checkbox' ? e.target.checked : value
        this.setState({
            [name]:value
        })
    }

    updateList = (name,value)=>{
        this.setState({
            [name]:value
        })
    }
    stepBack = ()=>{
        let step = 1
        this.setState({
            step
        })
    }
    changeStep = (step) =>{
        this.setState({
            step
        })
    }
    shippingMethod=(shipping)=>{
        let shippingPrice = shipping ==='standard' ? 19.8 : 29.8
        this.setState({
            shipping,shippingPrice
        })
    }
    
    validateField = (item) =>{
        const errorBox = item.nextSibling
        if(item.type != 'checkbox'){
            if(errorBox){errorBox.classList.add('hidden')}
        }
        //check for empty field
        if(item.required  && item.value === ''){
            errorBox.classList.remove('hidden')
            errorBox.innerText = 'This field is required'
        }
        //check for email field
        if(item.type === 'email' && item.value !==''){
            if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(item.value))
            {return true}
            errorBox.classList.remove('hidden')
            errorBox.innerText = "Email format dosen't look right"
        }
    }
    render() {
        let allInputs = document.querySelectorAll('.contact-information-form input')
        let allSelects = document.querySelectorAll('.contact-information-form select')
        allInputs.forEach(item => item.addEventListener('focusout',()=> this.validateField(item)))
        allSelects.forEach(item => item.addEventListener('focusout',()=> this.validateField(item)))
        allInputs.forEach(item => item.addEventListener('change',()=> this.validateField(item)))
        allSelects.forEach(item => item.addEventListener('change',()=> this.validateField(item)))

        const step = this.state.step
        switch (step) {
            case 1:
                return(
                    <>
                        <BreadCrumbs step={this.state.step} changeStep={this.changeStep}/>
                        <ContactInfo updateState={this.updateState} updateList={this.updateList} inputInfo={this.state}/>
                        <CheckoutNavigation navigate={this.navigate} btnText='Continue to shopping'/>
                    </>
                )
                break;
            case 2:
                return(
                    <>
                        <BreadCrumbs step={this.state.step} changeStep={this.changeStep}/>
                        <ShippingInfo contactInfo={this.state} stepBack={this.stepBack} shippingMethod={this.shippingMethod} selectedShipping={this.state.shipping}/>
                        <CheckoutNavigation navigate={this.navigate} btnText='Continue to payment'/>
                    </>
                )
                break;
            case 3:
                return(
                    <>
                        <BreadCrumbs step={this.state.step} changeStep={this.changeStep}/>
                        <Payment contactInfo={this.state} stepBack={this.stepBack}/>
                    </>
                )
            break;

            default:
                return(
                    <>
                        <BreadCrumbs step={this.state.step}/>
                        <ContactInfo />
                        <CheckoutNavigation navigate={this.navigate}/>
                    </>
                )
                break;
    }
}
}
