import React from 'react'
import {useContext} from 'react'
import {productContext} from '../context'
import SingleProduct from './SingleProduct'
import CartPopup from '../components/CartPopup'
import QuickView from '../components/QuickView'
export default function ProductList() {
    const mainContext = useContext(productContext)
    let {filteredList,getProduct,addtocart,quickView,openModal,products,toggleWishlist} = mainContext

    const productList = filteredList.map(product=>{
        const [mainImg, ...defaultImg] = product.image
        return <SingleProduct key={product.id} 
                            product={product} 
                            image={mainImg} 
                            getProduct={getProduct}
                            addtocart={addtocart}
                            quickView={quickView}
                            openModal={openModal}
                            toggleWishlist={toggleWishlist}/>
    })
    return (
        <>
            <div className="products-container">
                {productList}
            </div>
            <div className="cart-overlay hidden overlay">
                <CartPopup />
            </div>
            <div className="quick-view-overlay hidden overlay">
                <QuickView  />
            </div>
        </>
    )
}
