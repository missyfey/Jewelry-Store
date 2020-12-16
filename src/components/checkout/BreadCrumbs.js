import React from 'react'
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {productContext} from '../../context'

export default function BreadCrumbs({step,changeStep}) {
    const activeLink = 'step'+step
    let goal = document.querySelector(`.${activeLink}`)
    const nextStep = 'step'+(step+1)
    let nextLink = document.querySelector(`.${nextStep}`)
    if(goal){
        goal.classList.add('activeBreadcrumbs')    
    }
    if(nextLink){
        nextLink.classList.remove('activeBreadcrumbs')
    }
    const mainContext = useContext(productContext)
    let {fullPage} = mainContext
    return (
        <div>
            <ul className="breadcrumbs-ul">
                <li className="activeBreadcrumbs" onClick={()=>fullPage(false)}><Link to='/cart'>Cart</Link></li>
                <li className="step1 activeBreadcrumbs" onClick={()=> changeStep(1)}>Information</li>
                <li className="step2" onClick={()=> changeStep(2)}>Shipping</li>
                <li className="step3" onClick={()=> changeStep(3)}>Payment</li>
            </ul>
        </div>
    )
}
