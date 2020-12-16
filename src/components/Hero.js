import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from './Button'

export default function Hero({title1, title2}) {
    return (
        <div className="hero">
            <div className='banner'>
                <h1>{title1}</h1>
                <h2>{title2}</h2>
                <Link to="/shop"><Button>shop now</Button></Link>
            </div>
        </div>
    )
}
