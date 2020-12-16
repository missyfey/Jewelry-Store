import React from 'react'
import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {productContext} from '../context'
import {FaPlus , FaMinus, FaTimes} from 'react-icons/fa'
import {DefaultButton, BlackButton} from '../components/Button'
import {StyledHero} from '../components/StyledHero'

export default function Cart() {
    const mainContext = useContext(productContext)
    const{cart, increament, decreament, removeItem,cartTotal,cartSubtotal,cartTax,clearCart,fullPage} = mainContext
    
    const cartItems = cart.map(item =>{
        return(
            <tr key={item.id}>
                <td className="cart-small-img"><img src={item.image[0]} alt="cart item" />{item.name}</td>
                <td>${item.saleprice ? item.saleprice : item.price}</td>
                <td>
                <div className="counter-box">
                            <div className="counter">{item.count}</div>
                                <div className="increment-box">
                                    <button className="increase" onClick={()=>increament(item.id)}><FaPlus /></button>
                                    <button className="decrease" onClick={()=>decreament(item.id)}><FaMinus /></button>
                                </div>
                            </div>
                </td>
                <td>${item.total}</td>
                <td className="remove-from-cart"><button onClick={()=> removeItem(item.id)}><FaTimes /></button></td>
            </tr>
        )
    })
    if(cart.length === 0){
        return (
            <div className="page page-container">
                <StyledHero title1='Products' >
                <span className="hero-overlay">
                    <h2>Cart</h2>
                </span>
                </StyledHero>
                <section>
                    <div className="empty-cart">
                    Your cart is currently empty.
                    </div>
                </section>                
            </div>
        )
    }
    
    return (
        <div className="page page-container">
            <StyledHero title1='Products' >
                <span className="hero-overlay">
                    <h2>Cart</h2>
                </span>
            </StyledHero>
            <section>
            <div className="cart-container">                
                <table className="cart-table">
                    <thead>
                    <tr>
                        <th>PRODUCT NAME</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>TOTAL</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems}
                    </tbody>
                </table>
                <Link to='/shop'><DefaultButton>continue shopping</DefaultButton></Link>
                <BlackButton className="clear-cart-btn" onClick={clearCart}>Clear Cart</BlackButton>
                <div className="cart-total-box">
                    <p>CART TOTALS</p>
                    <p>Subtotal: ${cartSubtotal}</p>
                    <p>Tax: ${cartTax}</p>
                    <p>Total: ${cartTotal}</p>
                    <Link to='/checkout'><DefaultButton onClick={()=>fullPage(true)}>proceed to checkout</DefaultButton></Link>
                </div>
            </div>
            </section>
        </div>
    )
}
