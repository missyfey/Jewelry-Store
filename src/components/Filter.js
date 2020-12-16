import React from 'react'
import {useContext} from 'react'
import {productContext} from '../context'
import {BsFunnel} from 'react-icons/bs'
import {OutlineButtonBlack} from './Button'

export default function Filter() {
    const mainContext = useContext(productContext)
    // console.log(mainContext);
    let{category,handleFilter,colors,handleSort} = mainContext

    const handleCollapse = (action)=>{
        const menu = document.querySelector('.filter-collapse-container')
        const overlay = document.querySelector('.overlay')
        if(action === 'open'){            
                menu.classList.add('show-filter-collapse')
                overlay.classList.remove('hidden')
            }
        else if(action === 'close'){            
            menu.classList.remove('show-filter-collapse')
            overlay.classList.add('hidden')
        }
    }
    const handleFilterClick = (e,key,val) =>{
        const target = e.target
        const AllBtn = document.querySelector('.all-btn')
        if(val==='all'){
            const allActives = document.querySelectorAll('.active')
            allActives.forEach(item => item.classList.remove('active'))
        }

        getSiblings(target).map(item => item.classList.remove('active'))
        AllBtn.classList.remove('active')
        target.classList.add('active')
        
        handleFilter(key,val)
    }

    var getSiblings = function (elem) {
        var siblings = [];
        var sibling = elem.parentNode.firstChild;
        for ( ; sibling; sibling = sibling.nextSibling ) 
           if ( sibling.nodeType == 1 && sibling != elem )
              siblings.push( sibling );
        return siblings;
    }

    const categories = category.map(item=>{
        return (
            <button key={item} onClick={(e)=> handleFilterClick(e,'SelectedCategory',item)} className="widget-list-btn">{item}</button>
        )
    })
    const colorList = colors.map(item=>{
        return (
            <button key={item} onClick={(e)=> handleFilterClick(e,'color',item)} className="color-select-btn" style={{backgroundColor:`${item}`}}></button>
        )
    })
    const priceList = ()=>{
        return (
         <>
            <button onClick={(e)=> handleFilterClick(e,'price','100-500')} className="widget-list-btn">$100 - $500</button>
            <button onClick={(e)=> handleFilterClick(e,'price','500-1000')} className="widget-list-btn">$500 - $1000</button>
            <button onClick={(e)=> handleFilterClick(e,'price','1000-1500')} className="widget-list-btn">$1000 - $1500</button>
            <button onClick={(e)=> handleFilterClick(e,'price','1500-2000')} className="widget-list-btn">$1500 - $2000</button>
            {/* <div className="input-group range-input-group">
                <label htmlFor="price">price</label>
                <input name="price" id="price" type="range" min={minPrice} max={maxPrice} className="price-range" value={priceRange} onChange={(e)=> handleFilterClick('priceRange',e.target.value)}/>
            </div> */}
         </>   
        )
    }
    return (
        <>
        <div className="overlay hidden"></div>
        <div className="filter-collapse-container">
            <div>
                <button className="close-filter-btn" onClick={()=> handleCollapse('close')}>CLOSE</button>
            </div>
            <div className="widget-section">
            <div className="widget-filter-list"> 
                <button onClick={(e)=> handleFilterClick(e,'SelectedCategory','all')} className="widget-list-btn all-btn">Show All</button>
            </div>
                <div className="widget-title">
                    <h3>categories</h3>
                </div>
                <div className="widget-filter-list"> 
                   {categories}
                </div>
            </div>
            <div className="widget-section">
                <div className="widget-title">
                    <h3>color options</h3>
                </div>
                <div className="widget-filter-list">                    
                    {colorList}
                </div>
            </div>
            <div className="widget-section">
                <div className="widget-title">
                    <h3>price filter</h3>
                </div>
                <div className="widget-filter-list">                    
                    {priceList()}
                </div>
            </div>
        </div>
        <div className="filter-container">
            <OutlineButtonBlack className="filter-btn" onClick={()=> handleCollapse('open')}><BsFunnel className="filter-icon"/>filter</OutlineButtonBlack>
            <div className="sort-box">
                <select className="sort-select" name="sort" id="sort" onChange={(e)=> handleSort(e.target.value)}>
                    <option value="sortpricelh">Price, Low to High</option>
                    <option value="sortpricehl">Price, high to Low</option>
                    <option value="sortfeatured">On Sale</option>
                </select>
            </div>
        </div>
        </>
    )
}
