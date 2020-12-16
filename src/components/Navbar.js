import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import {productContext} from '../context'
import {Link} from 'react-router-dom'
import logo from '../logo.svg'
import {AiOutlineHeart , AiOutlineSearch , AiOutlineUser, AiOutlineShopping, AiOutlineAlignLeft} from 'react-icons/ai'
import {FaTimes} from 'react-icons/fa'
import SearchBar from './SearchBar'
import Login from './Login'

export default class Navbar extends Component {
    constructor(){
        super()
        this.state={
            isOpen:false
        }
    }
    static contextType = productContext  
    
    toggleMenu = (e) =>{
        e.stopPropagation()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    closeMenu = () =>{
        this.setState({
            isOpen: false
        })
    }
    openSearch = () =>{
        let container = document.querySelector('.search-container')
        container.style.height = '75vh'
        const overlay = document.querySelector('.overlay-search')
        overlay.style.top = '75vh'
        overlay.classList.remove('hidden')
        const nav = document.querySelector('nav')
        nav.style.paddingTop = '75vh'
    }
    
    componentDidMount(){
        const overlay = document.querySelector('.overlay-navbar')
        overlay.addEventListener('click', ()=>{
            if(this.state.isOpen){
               this.closeMenu()
            }
        })
        const navbar = document.querySelector('.navbar')
        window.addEventListener('scroll', (e)=>{
            
            if(window.scrollY>60){
                navbar.classList.add('navbar-bg')
            }
            if(window.scrollY<60){
                navbar.classList.remove('navbar-bg')
            }
        })
    }
    controlMenu = (e) =>{
        let mynode = e.target
        if(e.target.nodeName !== 'BUTTON'){
            mynode = e.target.parentNode
        }
        //remove active class from all
        let allBtns = document.querySelectorAll('.btn-top-menu-open')
        allBtns.forEach(item => item.classList.remove('active'))
        //add active class to the clicked btn
        mynode.classList.add('active')
        let target = mynode.dataset.click
        
        let menuBox = document.querySelector('.menu-container')
        let loginBox = document.querySelector('.login-containers')
        if(target === 'menu'){
            menuBox.classList.remove('hidden')
            loginBox.classList.add('hidden')
        }
        if(target === 'login'){
            menuBox.classList.add('hidden')
            loginBox.classList.remove('hidden')
        }
    }
    openLoginOverlay = () =>{
        const base = document.querySelector('.login-overlay')
        base.classList.remove('hidden')
        ReactDOM.render(<Login/>, base);
    }
    
    render() {
        var allBtns = document.querySelectorAll('.btn-top-menu-open')
        allBtns.forEach(item => item.addEventListener('click',(e)=> this.controlMenu(e),false))
        let {cartCount,fullheightpage} = this.context
        
        return (
            <div className={fullheightpage ? 'hidden': ''}>
            <div className="login-overlay hidden">
            </div>
            <SearchBar />
            <nav>
                <div className={this.state.isOpen ? "overlay-navbar" : "overlay-navbar hidden"}></div>
                <div className="navbar">
                    <button className="burger-icon icon-btn" onClick={this.toggleMenu}>
                        <AiOutlineAlignLeft />
                    </button>
                    <div className="logo-container">
                        <img src={logo} alt="logo"/>
                    </div>
                    <div className="menu-right">
                        <button className="icon-btn menu-right-search-icon" onClick={this.openSearch}><AiOutlineSearch/></button>
                        <button className="icon-btn menu-right-user-icon" onClick={this.openLoginOverlay}><AiOutlineUser/></button>
                        <button className="icon-btn menu-right-heart-icon"><Link to="/wishlist"><AiOutlineHeart/></Link></button>
                        <button className="icon-btn menu-right-cart-icon"><Link to="/cart"><AiOutlineShopping/></Link>
                        <span className="cart-count-navbar">{cartCount}</span>                        
                        </button>
                    </div>
                    <div className={this.state.isOpen ? 'submenu-container submenu-open' : 'submenu-container '}>
                        <div className="menu-open-top-container">
                            <button className="icon-btn btn-top-menu-open active" data-click="menu"><AiOutlineAlignLeft /> <span>menu</span></button>
                            <button className="icon-btn btn-top-menu-open" data-click="login"><AiOutlineUser/> <span>login</span></button>
                        </div>
                        <div className="full-height hidden login-containers">
                            <Login closeMenu={this.closeMenu}/>
                        </div>
                        <ul className="submenu-list menu-container">
                            <li onClick={this.closeMenu} className="close-btn-container">
                                <button className="close-menu-btn icon-btn">
                                    <FaTimes />
                                </button>
                            </li>
                            <li onClick={this.closeMenu}><Link to="/">Home</Link></li>
                            <li onClick={this.closeMenu}><Link to="/shop">Shop</Link></li>
                            <li onClick={this.closeMenu}><Link to="/about">about us</Link></li>
                            <li onClick={this.closeMenu}><Link to="/blog">blogs</Link></li>
                        </ul>
                    </div>
                </div>
                
            </nav>
            </div>
        )
    }
}

