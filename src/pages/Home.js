import React from 'react'
import Hero from '../components/Hero'
import CategoriesHome from '../components/CategoriesHome'
import FeaturedProducts from '../components/FeaturedProducts'
export default function Home() {
    return (
        <div className="home-container page">
            <Hero title1="world jewelry" title2="What you need to know for a perfect wedding">
            </Hero>            
            <CategoriesHome />
            <FeaturedProducts />
        </div>
    )
}
