import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {productContext} from '../context'
import {FaChevronRight , FaChevronLeft} from 'react-icons/fa'
export default class FullBlog extends Component {
    static contextType = productContext
    constructor(){
        super()
        this.state={
            slug:'',
            blogList:[],
            blog:[],
            currentIndex:0,
            maxIndex:0
        }
    }
    componentDidMount(){
        let blogList = localStorage.getItem('blogList') !=='' && localStorage.getItem('blogList') ? JSON.parse(localStorage.getItem('blogList')) : []
        const maxIndex = blogList.length - 1
        let slug = this.props.match.params.slug
        const blog = blogList.find(item=> item.slug === slug)
        //find index of blog in bloglist
        const currentIndex = blogList.findIndex(item => item.slug === slug)
        this.setState({
            slug , blogList , blog, currentIndex , maxIndex
        })
    }
    navigateBlog = (order) =>{        
        //set the new index
        const newIndex = this.state.currentIndex + order
        // //find new blog index in teh list
        const newBlog = this.state.blogList[newIndex]
        // //update blog in the state
        this.setState({
            blog:newBlog,
            currentIndex:newIndex
        })
    }
    render() {
        const blog = {...this.state.blog}
        const maxIndex = this.state.maxIndex

    if(blog.content){
        var blogContent = blog.content.content
        blogContent = blogContent.map((item, index)=>{
            let value = item.content[0].value
            let nodeType = item.nodeType
        
            //if there is - in the string
            let dashIndex = nodeType.indexOf('-')
            if(dashIndex !== -1){
                nodeType = nodeType.substr(0,1)+nodeType.substr(dashIndex+1,dashIndex+2)
                const CustomTag = `${nodeType}`
                return <CustomTag key={index}>{value}</CustomTag>
            }
            //if there is blockquote in the string
            else if(nodeType === 'blockquote'){
                let value = item.content[0].content[0].value
                const CustomTag = `${nodeType}`
                return <CustomTag key={index}><p>{value}</p></CustomTag>
                }
            else{
                nodeType = nodeType.substr(0,1)
                const CustomTag = `${nodeType}`
                return <CustomTag key={index}>{value}</CustomTag>
            }
            })
    }
    

        return (
            <div className="page page-container">
                <section className="blog-page-center">
                    <h1>{blog.title}</h1>
                    <p className="author"><span className="light-text">By: </span>{blog.author}</p>
                    <div className="fullblog-img">
                    <img src={blog.image} />
                    </div>
                    <p className="blog-text">{blogContent}</p>
                    <div className="blog-nav-box">
                        <Link className={this.state.currentIndex === 0 ? 'invisible' : ''} 
                        to={`/blog/${this.state.slug}`} onClick={()=>this.navigateBlog(-1)}><FaChevronLeft className="blog-nav-icon"/> Prev</Link>
                        <Link className={this.state.currentIndex === maxIndex ? 'invisible' : ''} 
                        to={`/blog/${this.state.slug}`} onClick={()=>this.navigateBlog(1)}>Next <FaChevronRight className="blog-nav-icon"/></Link>
                    </div>
                </section>
            </div>
        )
    }
}


