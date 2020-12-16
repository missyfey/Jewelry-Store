import React , {Component} from 'react'
import {productContext} from '../../context'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {FaChevronDown , FaChevronUp} from 'react-icons/fa'

export default class CartSummary extends Component {
    constructor(){
        super()
        this.state={
            isMenuOpen: false
        }
    }
    static contextType = productContext
    toggleMenu = () =>{
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        },this.handleHeight)
    }
    handleHeight = () =>{        
        const container = document.querySelector('.cart-summary-container')
        const status = this.state.isMenuOpen
        if(status){
           container.style.height = '100%'
        } 
        if(!status){
            container.style.height = '0'
         }
    }
    render(){
    const{cart,cartTotal,cartSubtotal,cartTax} = this.context
    const cartItems = cart.map(item =>{
        return(
            <tr key={item.id} className="cart-summary-row">
                <td className="cart-summary-small-img">
                    <span className="count-summary-item">{item.count}</span>
                    <img src={item.image[0]} alt="cart item"/>
                </td>                
                <td className="cart-summary-small-name">{item.name}</td>
                <td>${item.total}</td>
            </tr>
        )
    })

    return (
        <>
        <div className="cart-summary-link group-row" onClick={this.toggleMenu}>
            <span className="cart-summary-title cart-summary-title-top">
                <AiOutlineShoppingCart/> 
                Show order summary 
                {this.state.isMenuOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
            <span className="">${cartTotal}</span>
        </div>
        <div className="cart-summary-container">
            <table className="cart-summary-table">
                <tbody>{cartItems}</tbody>              
            </table>
            <div className="cart-summary-subtotal">
                <div className="group-row">
                    <span className="cart-summary-title">Subtotal</span>
                    <span>${cartSubtotal}</span>
                </div>
                <div className="group-row">
                    <span className="cart-summary-title">Tax</span>
                    <span>${cartTax}</span>
                </div>
            </div>
            <div className="group-row">
                <span className="cart-summary-title">Total</span>
                <span className="text-bold">${cartTotal}</span>
            </div>
        </div>
        </>
    )
    }
}
