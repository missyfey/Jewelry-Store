import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import {productContext} from '../context'
import {FaTimes ,FaPlus , FaMinus} from 'react-icons/fa'
import {Button,BlackButton} from '../components/Button'

export default class QuickView extends Component{
    constructor(){
        super()
        this.state={
            centerImage:''
        }
    }
    static contextType = productContext

    render(){
        const mainContext = this.context
    let {closecart,increament,decreament,addtocart,getProduct, singleProduct,fullPage} = mainContext

    if(singleProduct ==='' || !singleProduct){
        return null
    }

    singleProduct = singleProduct[0]
    let{name, price, featured, saleprice, description,image, count, id,incart} = singleProduct
    let [centerImage, ...defaultImages] = image;
    let album = ''

    if(image && image.length != 0){
        album = image.map((item,index)=>{
        while(index<3){
            return <img className="album-img" src={item} key={index} onClick={()=> changeCenterImg(item)}/>
        }        
        })
    }
    const changeCenterImg = (img) =>{
        this.setState({
            centerImage: img
        })
    }
    description = description?  description.substring(0,150) + '...' : ''
    centerImage = this.state.centerImage!='' ? this.state.centerImage : centerImage

        return (
            <div className="cart-popup-container">
               <div className="quickview-left-container">
               <div className="quickview-image-container">
                    <div className="mainImg">
                        <img src={centerImage} alt={name}/>
                    </div>
                    <div className="album">
                        {album}
                    </div>
                </div>
               </div>
               <div className="quickview-right-container">
                    <h2>{name}</h2>
                    <p className="price">
                        <span className="sale-price">{featured ? `$${price}` : null}</span>
                        {featured ? `$${saleprice}` : `$${price}`}
                    </p>
                    <hr/>
                    <p className="pt-1 pb-1">{description}</p>
                        <div className="row quickview-row">
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
                    <Link to='/checkout' ><BlackButton onClick={()=>fullPage(true)}>proceed to checkout</BlackButton></Link>
                </div>
                <div className="close-btn" onClick={(e)=>closecart(e)}>
                    <FaTimes />
               </div>
            </div>
        )
    }
    
}
