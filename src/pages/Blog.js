import React , {Component} from 'react'
import {useContext} from 'react'
import {StyledHero} from '../components/StyledHero'
import SingleBlog from '../components/SingleBlog'
import {productContext} from '../context'

export default function Blog(){
    let mainContext = useContext(productContext)
    let{blogList} = mainContext

    const blogs = blogList.map(item =>{
        return <SingleBlog key={item.id} blog={item}/>
    })
    return (
        <div className="page page-container">
            <StyledHero title1='About us'>
                <span className="hero-overlay">
                    <h2>Blogs</h2>
                </span>
            </StyledHero>
            <section>
                <div className="blog-container">
                    {blogs}
                </div>
            </section>
                </div>
    )
}
