import React from 'react'
import {Link} from 'react-router-dom'

export default function SingleFeatureProducts({product, number}) {
    const {image} = product
    return (
        <div className="featured-img-container" >
            <button><Link to="/shop">shop it</Link></button>
            <img src={`img/featured-${number}.jpg`} alt='featured'/>
        </div>
    )
}
