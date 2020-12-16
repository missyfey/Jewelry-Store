import React from 'react'
import {useContext} from 'react'
import {productContext} from '../context'
import CategorySingle from './CategorySingle'


export default function CategoriesHome() {
    const mainContext = useContext(productContext)
    let {categories} = mainContext
    const category = categories.map((item, index)=>{
        return <CategorySingle key={index} category={item}/>
    }) 
    return (
        <div className="categories-container">
            {category}
        </div>
    )
}
