import React from 'react'
import PropType from 'prop-types'
import {Link} from 'react-router-dom'

import {AiOutlineHeart , AiOutlineSearch,AiOutlineShopping} from 'react-icons/ai'

export default function SingleProduct({product,image,getProduct,quickView,openModal,toggleWishlist}) {
    let{id, name, price,saleprice, featured, incart,fav} = product
    price = Number(price.toFixed(2))
    let discount = (((price - saleprice) / price)*100).toFixed(0)

    return (
        <div className="single-product">
            <Link to={`/detail/${id}`}>
                <img src={image} className="product-image"
                    onClick={()=> getProduct(id)}
                />
            </Link>
            {saleprice ? <span className="discount">%{discount}</span> : null}
            <p>{name}</p>
            <p className="price">
                <span className="sale-price">{featured ? `$${price}` : null}</span>
                {featured ? `$${saleprice}` : `$${price}`}
            </p>
            <div className="circle-icons-container">
                <button className="circle-icon circle-icon-cart" onClick={()=> openModal(id)} disabled={incart}>
                <AiOutlineShopping />
                <span className="tooltip-text">{incart ? "In Cart" : "Add to Cart" }</span>
                </button>
                <button className="circle-icon circle-icon-search" onClick={()=> quickView(id)}>
                    <AiOutlineSearch />
                    <span className="tooltip-text">Quickview</span>
                </button>
                <button className={fav ? "circle-icon circle-icon-heart icon-active" : "circle-icon circle-icon-heart"} onClick={()=>toggleWishlist(id)}>
                    <AiOutlineHeart />
                    <span className="tooltip-text">{fav ? "In Wishlist" : "Add to Wishlist"}</span>
                </button>
            </div>
        </div>
    )
}

const propType = PropType.shape({
    name: PropType.string.isRequired,
    saleprice: PropType.number,
    image: PropType.arrayOf(PropType.string),
    price: PropType.number
})