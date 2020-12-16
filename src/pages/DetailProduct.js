import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaAngleLeft} from 'react-icons/fa'
import {productContext} from '../context'
import CartPopup from '../components/CartPopup'
import {FaPlus , FaMinus} from 'react-icons/fa'
import {Button, BlackButton} from '../components/Button'

export default class DetailProduct extends Component{
    constructor(props){
        super(props)        
        this.state={
            id:'',
            centerImage:''
        }
    }
    static contextType = productContext
    
    changeImg = (src) =>{
        this.setState({
            centerImage: src
        })
    }
    render(){
        let id = this.props.match.params.id
        let { addtocart, increament, decreament,getProduct,fullPage} = this.context
        let singleProduct = getProduct(id)
        
        singleProduct = singleProduct[0]
        if(singleProduct === '' || !singleProduct){
            return(
                <div className="no-result page-container">
                    <h3>NO SUCH PRODUCT COULD BE FOUND...</h3>
                    <Button className="banner-btn btn"><Link to="/shop" >back to rooms</Link></Button>
                </div>
            )
        }

        let {name, category, count,description, incart, price, saleprice,featured,image} = singleProduct
        let [mainImg, ...defaultImg] = image
        let centerImage = mainImg
        let album = image.map((item,index)=>{
            return <img className="album-img" src={item} key={index} onClick={(e)=> this.changeImg(e.target.src)}/>
        })

    return (
    <>
        <div className="page page-container">
            <Link to='/shop' className="inner-link"><FaAngleLeft className="bigger"/>Back to products</Link>
            <section className="detail-page-container">
            <div className="detail-container">
                <div className="detail-image-container">
                    <div className="album">
                        {album}
                    </div>
                    <div className="mainImg">
                        <img src={this.state.centerImage || centerImage} alt={name}/>
                    </div>
                </div>
                <div className="detail-detail-container">
                    <p className="name">{name}</p>
                    <p className="price">
                    <span className="sale-price">{featured ? `$${price} USD` : null}</span>
                    ${saleprice} USD
                    </p>
                    <span className="h-line"></span>
                    <p className="description">{description}</p>
                    <div className="fix-width">
                        <div className="row">
                            <div className="counter-box">
                            <div className="counter">{count}</div>
                                <div className="increment-box">
                                    <button className="increase" onClick={()=>increament(id)}><FaPlus /></button>
                                    <button className="decrease" onClick={()=>decreament(id)}><FaMinus /></button>
                                </div>
                            </div>
                            <Button className={incart ? "no-margin btn-disabled" : "no-margin"} onClick={()=> addtocart(id)} disabled={incart}>
                                {incart? "in cart" : "Add to cart"}
                            </Button>
                        </div>
                        <Link to="/checkout"><BlackButton onClick={()=> {addtocart(id);fullPage(true)}}>Buy it now</BlackButton></Link>
                    </div>
                    <p>Categories: {category.map((item, index)=>{
                        return <span className="category-span" key={index}>{item}</span>
                    })}</p>
                </div>
            </div>
            <div className="sidebar-container">
                <div className="">
                    <h3>Why choose us?</h3>
                    <p>
                    Official Herschel stockist Australian warranty assistance & support Australian shipping & returns.Customer first experience environmentally focused
                    </p>
                </div>
                <div className="">
                    <h3>Returns</h3>
                    <p>
                    Return this product within 100 days if you change your mind. Get a refund/replacement & free return shipping if it arrives damaged or not as described                    </p>
                </div>
                <div className="">
                    <h3>shipping</h3>
                    <p>
                    Free if stated near price. $9.95 Australia wide (up to 10 items). $18.95 for Express Post (generally 1 business day).                    </p>
                </div>
            </div>
            </section>
        </div>
        <div className="cart-overlay hidden">
            <CartPopup />
        </div>
    </>
    )
    }
 
    
}
