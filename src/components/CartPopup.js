import React from 'react'
import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {productContext} from '../context'
import {FaTimes , FaCheck} from 'react-icons/fa'
import defaultImage from '../images/banner.jpg'
import {DefaultButton , OutlineButton} from '../components/Button'

export default function CartPopup() {
    const checkoutBtn = document.querySelector('.checkout-btn')
    const toggleAgreement = () =>{
        checkoutBtn.classList.toggle('btn-disabled')
    }
    const mainContext = useContext(productContext)
    let {closecart,clickedProduct, cartTotal, cartCount,fullPage} = mainContext
    let{name, count, price,image} = clickedProduct
    
    let mainImg = {defaultImage}
    if(image){
        mainImg = image[0]
    }    

    return (
        <div className="cart-popup-container cart-popup">
           <div className="cart-left-container">
               <p className="success-add-to-cart"><FaCheck/> Added to cart successfully!</p>
               <img src={mainImg} alt={name} />
               <p className="name">{name}</p>
               <p className="price">PRICE: <span>${price}</span></p>
               <p className="qty">QTY: <span>{count}</span></p>
               <p className="cart-total">CART TOTALS: <span>$ {price * count}</span></p>
           </div>
           <div className="cart-right-container">
               <p>There are <span>{cartCount}</span> items in your cart</p>
               <p className="cart-total">CART TOTALS: <span>$ {cartTotal}</span></p>
               <OutlineButton onClick={(e)=>closecart(e)}><Link to="/shop">continue shopping</Link></OutlineButton>
                <DefaultButton><Link to="/cart">go to cart</Link></DefaultButton>
                <div className="input-group">
                    <input type="checkbox" name="agreement" onClick={toggleAgreement}/>
                    <label htmlFor="agreement">Agree with term and conditional.</label>
                </div>  
                <Link to="/checkout" ><DefaultButton className="btn-disabled checkout-btn" onClick={()=>fullPage(true)}>proceed to checkout</DefaultButton></Link>
            </div>
           <div className="close-btn" onClick={(e)=>closecart(e)}>
                <FaTimes />
           </div>
        </div>
    )
}
