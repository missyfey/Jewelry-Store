import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import {productContext} from '../context'
import {FaTimes} from 'react-icons/fa'

export default class SearchBar extends Component{
constructor(){
    super()
    this.state={
        searchResult:'',
        searchedText:''
    }
}

static contextType = productContext
handleSearch = (e) => {
    let {handleSearch} = this.context
    let query = e.target.value    
    let searchResult = handleSearch(query)

    if(query === ''){
        searchResult = ''
    }
    
    this.setState({
        searchResult,
        searchedText : query
})
}
closeSearchBar = () =>{
    let container = document.querySelector('.search-container')
    container.style.height = 0
    const overlay = document.querySelector('.overlay-search')
    overlay.classList.add('hidden')
    const nav = document.querySelector('nav')
    nav.style.paddingTop = 0
    let input = document.querySelector('#search')
    input.value = ''
    this.setState({
        searchResult:''
    })
}

submitSearch = (e) =>{
    e.preventDefault()
}
highlight = (name) =>{
    // to highlight searched text - part 2 is searched charachter
    let part1, part2, part3 = ''
    let query = this.state.searchedText
    let start = name.toLowerCase().search(query.toLowerCase())
    part1  =name.substr(0,start-1)
    part2 = name.substr(start, query.length)
    part3 = name.substr(start+query.length , name.length)
    return {part1,part2,part3}
}
render(){
let result = [...this.state.searchResult]
let searchResult = result.map(item => {
    let {part1,part2,part3} = this.highlight(item.name)
    return(        
        <Link to={`/detail/${item.id}`} onClick={this.closeSearchBar} key={item.id} >
            <div className="search-item">
                <div className="search-item-img">
                    <img src={item.image[0]} />
                </div>
                <div className="search-detail">
                    <p>{part1}<mark>{part2}</mark>{part3}</p>
                    <p>{item.featured 
                    ? <><span className="search-saleprice">${item.saleprice}</span> <span className="search-price">${item.price}</span></>
                    : <span className="search-saleprice">${item.price}</span>}
                    </p>
                </div>
            </div>
        </Link>
    )
})

return (
    <>
        <div className="search-container">
            <div className="search-frame">
                <button className="close-search-btn icon-btn" onClick={this.closeSearchBar}>
                    <FaTimes />
                </button>
                <h1>Start typing what you looking for...</h1>
                <form onSubmit={(e)=> this.submitSearch(e)}>
                    <input type="text" name="search" id="search" className="search-input" placeholder="Search Anything" 
                    onKeyUp={(e) => this.handleSearch(e)}/>
                </form>                
                <div className="search-result-container">
                    {searchResult}
                </div>
            </div>
        </div>
        <div className="overlay-search hidden"></div>
    </>
)
}
}
