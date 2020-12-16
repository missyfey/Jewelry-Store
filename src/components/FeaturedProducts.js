import React from 'react'
import {useContext} from 'react'
import {productContext} from '../context'
import Title from './Title'
import SingleFeatureProducts from './SingleFeatureProducts'

export default function FeaturedProducts() {
    const mainContext = useContext(productContext)
    let {featuredProduct} = mainContext
    featuredProduct = featuredProduct.slice(0,6)
    const singleFeatured = featuredProduct.map((item,index)=>{
        return <SingleFeatureProducts key={index} product={item} number={index+1}/>
    })
    return (
        <div className="Featured-container">
            <Title title="Featured products" />
            <section className="featured-product-container">
                {singleFeatured}
            </section>
        </div>
    )
}
