import React from 'react'
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {productContext} from '../context'
import {StyledHero} from '../components/StyledHero'
import wishImage from '../images/wishlist-banner.jpeg'
import {Button} from '../components/Button'

export default function WishList() {

    const mainContext = useContext(productContext)
    let {products, clearWishList} = mainContext
    const wishList = products.filter(item=> item.fav === true)
    if(wishList.length === 0 || wishList === ''){
        return(
            <div className="page page-container">
            <StyledHero title1='Products' image={wishImage}>
                <span className="hero-overlay">
                    <h2>WishList</h2>
                </span>
            </StyledHero>
            <div className="empty-cart">Nothing in your Wish List</div>
            </div>
        )
    }
    const showList = wishList.map(item => {
        if(item.fav){
            return (
                <div key={item.id}>
                    <Link to={`/detail/${item.id}`} >
                        <div className="search-item wishlist-item">
                            <div className="search-item-img">
                                <img src={item.image[0]} />
                            </div>
                            <div className="search-detail">
                                <p>{item.name}</p>
                                <p>{item.featured 
                                ? <><span className="search-saleprice">${item.saleprice}</span> <span className="search-price">${item.price}</span></>
                                : <span className="search-saleprice">${item.price}</span>}
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        }
    })
    return (
        <div className="page page-container">
            <StyledHero title1='Products' image={wishImage}>
                <span className="hero-overlay">
                    <h2>WishList</h2>
                </span>
            </StyledHero>
            <section>
                <h3 className="align-center">Add your Wishlist Items to your Cart?</h3>
            <div className="wishlist-result-container">
                {showList}            
            </div>
            <Button onClick={clearWishList}>Clear wish list</Button>
            </section>
        </div>
    )
}
