import React from 'react'
import {Link} from 'react-router-dom'
export default function SingleBlog({blog}) {
    var shortDesc = ''
    var shortContent = blog.content.content.map(item=>{
        shortDesc += item.content[0].value
        return shortDesc
    })
    if(shortDesc){shortContent = shortDesc.substr(0,150)}
    
    return (
        <div className="single-blog-container">
            <div className="image-container">
                <Link to={`blog/${blog.slug}`}>
                <img src={blog.image} alt={blog.title} />
                </Link>
            </div>
            <div className="content-container">
                <h2 className='blog-title'>{blog.title}</h2>     
                <p className="blog-short-text">{shortContent} . . . </p>     
                <span><Link to={`blog/${blog.slug}`}>Read more</Link></span>     
            </div>
        </div>
    )
}

