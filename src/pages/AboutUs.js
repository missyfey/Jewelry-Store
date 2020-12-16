import React from 'react'
import {StyledHero} from '../components/StyledHero'
import about1 from '../images/about1.jpg'
import about2 from '../images/about2.jpg'
import about3 from '../images/about3.jpg'
export default function AboutUs() {
    return (
        <div className="page page-container">
            <StyledHero title1='About us'>
                <span className="hero-overlay">
                    <h2>About us</h2>
                </span>
            </StyledHero>
            <section>
            <div className="categories-container">
                <div className="category-row">
                    <div className="about-img">
                        <img src={about1} alt="category"/>
                    </div>
                    <div className="about-content">
                        <div className="category-inner about-inner">
                            <p>Web Designer</p>
                            <h1>Mastaneh Fey</h1>
                            <p>We believe in a world where you have total freedom to be you, without judgement. To experiment. To express yourself. To be brave and grab life as the extraordinary adventure it is. So we make sure everyone has an equal chance to discover all the amazing things they’re capable of – n.</p>
                        </div>
                    </div>
                </div>
                <div className="category-row">
                    <div className="about-img">
                        <img src={about2} alt="category"/>
                    </div>
                    <div className="about-content">
                        <div className="category-inner about-inner">
                            <p>Photographer</p>
                            <h1>Justin Lisiakir</h1>
                            <p>We believe in a world where you have total freedom to be you, without judgement. To experiment. To express yourself. To be brave and grab life as the extraordinary adventure it is. So we make sure  – no matter who they are, where they’re from or what looks they like to boss. We exist to give you the confidence to be whoever you want to be.</p>
                        </div>
                    </div>
                </div>
                <div className="category-row">
                    <div className="about-img">
                        <img src={about3} alt="category"/>
                    </div>
                    <div className="about-content">
                        <div className="category-inner about-inner">
                            <p>Sales agent</p>
                            <h1>Angelika Hessas</h1>
                            <p>To express yourself. To be brave and grab life as the extraordinary adventure it is. So we make sure everyone has an equal chance to discover all the amazing things they’re capable of – no matter who they are, where they’re from or what looks they like to boss. We exist to give you the confidence to be whoever you want to be.</p>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </div>
    )
}
