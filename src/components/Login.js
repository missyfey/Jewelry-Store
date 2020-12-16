import React from 'react'
import {BlackBlackButton, DefaultButton} from './Button'
import {FaTimes} from 'react-icons/fa'
import Logo from '../logo.svg'

export default function Login({closeMenu}) {
    function showRegister(){
        document.querySelector('.login-box').classList.add('hidden')
        document.querySelector('.register-box').classList.remove('hidden')
    }  
    function showLogin(){
        document.querySelector('.login-box').classList.remove('hidden')
        document.querySelector('.register-box').classList.add('hidden')
    }  
    function closeLoginOverlay(){
        document.querySelector('.login-overlay').classList.add('hidden')
    }
    function handleClick(e){
        e.preventDefault()
    }
    return (
        <>
        <div className="login-register-container">
        <button className="close-menu-btn icon-btn no-display-small">
            <FaTimes onClick={closeLoginOverlay}/>
        </button>
        <div className="no-display-small login-logo-box">
            <img src={Logo} alt="logo" />
        </div>
        <div className="login-container">
            <div className="login-box box">
                <form className="login-form">                    
                    <h3 className="no-display-small login-box-header">Great to have you back!</h3>
                    <div className="input-group-login">
                        <input type="email" id="email" placeholder="Email Address" />
                        <input type="password" id="password" placeholder="Password" />
                    </div>
                    <p>Forgot your password?</p>
                    <BlackBlackButton onClick={(e)=>handleClick(e)}>LOG IN</BlackBlackButton>
                </form>
                <p className="lineThrou">OR</p>
                <p onClick={showRegister} className="toggleLoginBtn">Register now</p>
            </div>
            <div className="register-box box hidden">
                <form className="register-form">
                    <h3 className="login-box-header">REGISTER</h3>
                    <div className="input-group-login">
                        <input type="email-register" id="email-register" placeholder="Email Address" />
                        <input type="password-register" id="password-register" placeholder="Password" />
                    </div>
                    <BlackBlackButton onClick={(e)=>handleClick(e)}>REGISTER</BlackBlackButton>
                </form>
                <p className="lineThrou">OR</p>
                <p onClick={showLogin} className="toggleLoginBtn">Back to login</p>
            </div>
        </div>
        <DefaultButton className="close-login-btn" onClick={closeMenu}>X CLOSE</DefaultButton>
        </div>
        <div className="login-box-large-screen"></div>
        </>
    )
}
