import React from 'react'
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {productContext} from '../../context'
import {BlueButton} from '../Button'
import {FaChevronLeft} from 'react-icons/fa'

export default function CheckoutNavigation({navigate,btnText}) {
    const mainContext = useContext(productContext)
    let {fullPage} = mainContext
    return (
        <div className="navigation-checkout">
            <span onClick={()=>fullPage(false)}><Link to='/cart' className="back-cart-link"><FaChevronLeft />Return to cart</Link></span>
            <BlueButton onClick={navigate}>{btnText}</BlueButton>
        </div>
    )
}
