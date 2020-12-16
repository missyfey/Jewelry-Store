import React from 'react'
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {productContext} from '../context'
import logo from '../logo.svg'
import {FaTwitter , FaLinkedinIn , FaFacebookF, FaInstagram, FaLocationArrow, FaPhoneAlt,FaEnvelope, FaFax} from 'react-icons/fa'

export default function Footer() {
    const mainContext = useContext(productContext)
    let {fullheightpage} = mainContext
    
    return (
        <div className={fullheightpage ? 'hidden footer-container': 'footer-container'}>
            <section className="footer-top">
                <div className="footer-single">
                    <img src={logo} alt="logo" />
                    <p>Be the first who learns about our great promotions!</p>
                    <div className="socialmedia-icons">
                        <a href="#" target="_blank"><FaLinkedinIn /></a>
                        <a href="#" target="_blank"><FaTwitter /></a>
                        <a href="#" target="_blank"><FaFacebookF /></a>
                        <a href="#" target="_blank"><FaInstagram /></a>
                    </div>
                </div>
                <div className="footer-group">
                    <div className="footer-top-menu">
                        <h3>Shop</h3>
                        <Link to="/shop">Jewelry</Link>
                        <Link to="/shop">Diamond</Link>
                        <Link to="/shop">Bangles</Link>
                        <Link to="/shop">Bracelets</Link>
                    </div>
                    <div className="footer-top-menu">
                        <h3>Information</h3>
                        <Link to="#">Terms & Conditions</Link>
                        <Link to="#">Contact us</Link>
                        <Link to="#">Accessories</Link>
                        <Link to="#">Term of use</Link>
                    </div>
                    <div className="footer-top-menu">
                        <h3>Follow Us</h3>
                        <a href="tel:(012) 345-6789"><FaPhoneAlt className="mr" />(012) 345-6789</a>
                        <a href="tel:(012) 345-6789"><FaFax className="mr"/>(012) 345-6789</a>
                        <a href="mailto:info@example.com"><FaEnvelope className="mr" />info@example.com</a>
                        <a href="https://goo.gl/maps/JVStxiWGsuYrcuRb9" target="_blank"><FaLocationArrow className="mr"/>1201 Broadway Suite 600</a>
                    </div>
                </div>
            </section>
            <section className="footer-bottom">
                <p>© Copyright 2020 | <Link to='#'>GLAMIRA Jewelry Store</Link> By ShopLaunch. <Link to='#'>Powered by Mastaneh Fey.</Link></p>
            </section>
        </div>
    )
}
