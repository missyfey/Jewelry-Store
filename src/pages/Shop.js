import React from 'react'
import Filter from '../components/Filter'
import ProductList from '../components/ProductList'
import {StyledHero} from '../components/StyledHero'
export default function Shop() {
    return (
        <div className="page page-container">
            <StyledHero title1='Products' >
                <span className="hero-overlay">
                    <h2>Products</h2>
                </span>
            </StyledHero>
            <section>
            <Filter />
            <ProductList />
            </section>
        </div>
    )
}


