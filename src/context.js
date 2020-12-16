import React, { Component, createContext } from 'react'
import client from './Contentful'

const productContext = createContext()

class ContextProvider extends Component {
    constructor(){
        super()
        this.state={
            products:[],
            clickedProduct:'',
            singleProduct:'',
            filteredList:[],
            categories:['collection diamond', 'wedding jewelry', 'bangles'],
            featuredProduct:[],
            cart:[],
            cartCount:0,
            cartTotal:0,
            cartSubtotal:0,
            cartTax:0,
            category:[],
            colors:['pink','orange','red','aqua'],
            minPrice:0,
            maxPrice:0,
            SelectedCategory:'all',
            SelectMinPrice:0,
            SelectMaxPrice:0,
            color:'',
            priceRange:0,
            sortBy:'sortpricelh',
            fullheightpage:false,
            blogList:[]
        }
    }
    getProduct = (id) =>{
        const tempProducts = this.state.products
        const singleProduct = tempProducts.filter(item => item.id === id)
        return singleProduct
    }
    getData =async () =>{
        try{
            let response = await client.getEntries({content_type: 'jewelryStore'})
            this.formData(response.items)
        }
        catch(error){
            console.log(error);
        }
    }
    getBlogData =async () =>{
        try{
            let responseBlog = await client.getEntries({content_type: 'jewelryStoreBlog'})
            this.formDataBlog(responseBlog.items)
        }
        catch(error){
            console.log(error);
        }
    }

    formDataBlog = (data) =>{
        let tempBlogs = data
        tempBlogs = tempBlogs.map(item =>{
            let id = item.sys.id
            let image = item.fields.image.fields.file.url
            let blog = {id, ...item.fields, image}
            return blog
        })
        localStorage.setItem('blogList', JSON.stringify(tempBlogs))
        this.setState({
            blogList:tempBlogs
        })           
    } 

    formData = (data) =>{
        let tempProducts = data.map(item=>{
            const id = item.sys.id
            const fav = false
            let image = item.fields.image.map(img=>{
                return img.fields.file.url
            })
            let product = {...item.fields,id,image,fav}
           return product
        })
        let priceList = tempProducts.map(item => item.price)
        let minPrice = Math.min(...priceList)
        let maxPrice = Math.max(...priceList)
        let category=[]
        tempProducts.map(item => {
            let cat = item.category
            cat.map(item=> category.push(item))
            return category
        })
        
        let cart = localStorage.getItem('cart') !=='' && localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        let cartSubtotal = localStorage.getItem('cartSubtotal') !=='' && localStorage.getItem('cartSubtotal') ? JSON.parse(localStorage.getItem('cartSubtotal')) : 0
        let cartTotal = localStorage.getItem('cartTotal') !=='' && localStorage.getItem('cartTotal') ? JSON.parse(localStorage.getItem('cartTotal')) : 0
        let cartTax = localStorage.getItem('cartTax') !=='' && localStorage.getItem('cartTax') ? JSON.parse(localStorage.getItem('cartTax')) : 0
        let cartCount = localStorage.getItem('cartCount') !=='' && localStorage.getItem('cartCount') ? JSON.parse(localStorage.getItem('cartCount')) : 0
        let products = localStorage.getItem('products') !=='' && localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : tempProducts
        //unique category list
        let uniqueCat = [...new Set(category)]
        let featuredProduct = tempProducts.filter(item => item.featured === true)

        this.setState({
            products,
            filteredList:products,
            featuredProduct,
            category:uniqueCat,
            minPrice,
            maxPrice,
            cart,
            cartSubtotal,
            cartTotal,
            cartTax,
            cartCount,
            SelectMaxPrice:maxPrice,
            priceRange: maxPrice
        })
    }
    componentDidMount(){   
        this.getData()
        this.getBlogData()
    }
    openModal = (id) =>{        
        const overlay = document.querySelector('.cart-overlay')
        overlay.classList.remove('hidden')
        this.addtocart(id)
    }
    quickView =(id) =>{
        const overlay = document.querySelector('.quick-view-overlay')
        overlay.classList.remove('hidden')
        const tempProducts = this.state.products
        const singleProduct = tempProducts.filter(item => item.id === id)
        this.setState({
            singleProduct
        })
    }
    addtocart = (id) =>{
        let tempProducts = this.state.products
        let clickedProduct = tempProducts.find(item => item.id === id)
        clickedProduct.incart =true
        clickedProduct.count++
        clickedProduct.total = (clickedProduct.saleprice ? clickedProduct.saleprice :clickedProduct.price) * clickedProduct.count
        this.setState({
            clickedProduct,
            cart: [...this.state.cart,clickedProduct],
            cartCount: this.state.cartCount+1,
            cartTotal : this.state.cartTotal + clickedProduct.total
        },this.getTotal)
    }
    increament = (id) =>{
        let tempProducts = [...this.state.products]
        let clickedProduct = tempProducts.find(item => item.id === id)
        if(!clickedProduct.incart){
            return this.addtocart(id)
        }
        clickedProduct.count++
        clickedProduct.total = (clickedProduct.saleprice ? clickedProduct.saleprice :clickedProduct.price) * clickedProduct.count
        let cart = tempProducts.filter(item => item.incart === true)
        this.setState({
            products:tempProducts,
            clickedProduct,
            cart
        },this.getTotal)
    }
    decreament = (id) =>{
        let tempProducts = [...this.state.products]
        let clickedProduct = tempProducts.find(item => item.id === id)
        if(!clickedProduct || clickedProduct===''){
           return null
        }
        if(clickedProduct.count === 1){
            this.removeItem(id)
        }
        else if(clickedProduct.count>1){
            clickedProduct.count--
            clickedProduct.total = (clickedProduct.saleprice ? clickedProduct.saleprice :clickedProduct.price) * clickedProduct.count
            let cart = tempProducts.filter(item => item.incart === true)
            this.setState({
                products:tempProducts,
                clickedProduct,
                cart
            },this.getTotal)
        }
    }
    removeItem = (id) =>{
        let tempProduct = [...this.state.products]
        let clickedProduct = tempProduct.find(item => item.id === id)
        clickedProduct.count =0
        clickedProduct.total = 0
        clickedProduct.incart = false

        let tempCart = [...this.state.cart]
        tempCart = tempCart.filter(item =>  item.id !== id)
        this.setState({
            products: tempProduct,
            cart: tempCart
        },this.getTotal)
    }

    getTotal = () =>{
        let tempCart = this.state.cart
        let cartCount =0
        let cartSubtotal =0
        let cartTotal =0
        tempCart.map(item =>{
            cartCount += item.count
            cartSubtotal += item.total
            return (cartCount, cartSubtotal)
        })
        let cartTax = Number((cartSubtotal * .12).toFixed(2))
        cartTotal = Number(((cartTax + cartSubtotal).toFixed(2)))
        localStorage.setItem('cart', JSON.stringify(tempCart))
        localStorage.setItem('cartSubtotal', JSON.stringify(cartSubtotal))
        localStorage.setItem('cartCount', JSON.stringify(cartCount))
        localStorage.setItem('cartTotal', JSON.stringify(cartTotal))
        localStorage.setItem('cartTax', JSON.stringify(cartTax))
        localStorage.setItem('products', JSON.stringify(this.state.products))
        this.setState({
            cartCount, cartTotal, cartTax, cartSubtotal
        })
    }
    closecart = (e) =>{
        const overlay = e.target.closest('.overlay')
        overlay.classList.add('hidden')
    }
    handleFilter = (key,val) =>{
        if(key==='price'){
            let pricerange = val.split("-")
            let SelectMinPrice = Number(pricerange[0])
            let SelectMaxPrice = Number(pricerange[1])
            this.setState({
                SelectMinPrice,SelectMaxPrice
            },this.filterList)
        }
        if(key === 'priceRange'){
            val = Number(val)
            this.setState({
                [key]:val,
                SelectMaxPrice:val,
                SelectMinPrice:0
            },this.filterList)
        }
        else{
            this.setState({
                [key]:val
            },this.filterList)
        }
        
    }
    filterList = ()=>{        
        var filteredList = this.state.products
        const{SelectedCategory,SelectMinPrice,SelectMaxPrice} = this.state

        filteredList = filteredList.filter(item => {return item.category.includes(SelectedCategory)})
        // filteredList = filteredList.filter(item => {return item.color.includes(color)})
        filteredList = filteredList.filter(item=> {return item.price<SelectMaxPrice && item.price > SelectMinPrice})
        if(SelectedCategory === 'all'){
            filteredList = this.state.products
        }    
        this.setState({
            filteredList
        }, this.sortList)        
    }
    handleSort = (sortBy) =>{        
        this.setState({
            sortBy
        },this.sortList)
    }
    handleSearch = (query) =>{
        let textQuery = query.toLowerCase()
        let searchResult = this.state.products
        searchResult = searchResult.filter(item => {return item.name.toLowerCase().includes(textQuery)})
        return searchResult
    }
    sortList=()=>{
        let {sortBy} = this.state
        let unsortedList = this.state.filteredList
        unsortedList.map(item=>{
            item.discount = 0
            let price = Number(item.price.toFixed(2))
            if(item.featured){
                item.discount = (((price - item.saleprice) / price)*100).toFixed(0)
            }
            return item.discount
        })

        if(sortBy === 'sortpricelh'){
            unsortedList.sort((a,b)=>(a.price>b.price) ? 1 : -1)
        }
        if(sortBy === 'sortpricehl'){
            unsortedList.sort((a,b)=>(a.price>b.price) ? -1 : 1)
        }
        if(sortBy === 'sortfeatured'){
            unsortedList.sort((a,b)=>(a.discount>b.discount) ? -1 : 1)
        }
        this.setState({
            filteredList:unsortedList
        })
    }
    toggleWishlist = (id) =>{
        let tempProducts = this.state.products
        let wishItem = tempProducts.find(item => item.id === id)
        wishItem.fav = !wishItem.fav
        this.setState({
            products:tempProducts
        })
    }
    clearWishList = () =>{
        let tempProducts = this.state.products
        tempProducts.map(item=>{
            item.fav = false
        })
        this.setState({
            products:tempProducts
        })
    }
    clearCart = () =>{
        let tempProduct = [...this.state.products]
        tempProduct.map(item =>{
            if(item.incart){
                item.count =0
                item.total = 0
                item.incart = false
            }
        })
        this.setState({
            products: tempProduct,
            cart:[]
        },this.getTotal)
    }
    fullPage=(bool)=>{
        this.setState({
            fullheightpage:bool
        })
    }
    getBlog = (slug)=>{
        console.log(slug);
    }
    render() {
        return (
            <productContext.Provider value={{...this.state, 
                getProduct:this.getProduct, 
                addtocart:this.addtocart,
                closecart:this.closecart,
                increament:this.increament,
                decreament:this.decreament,
                removeItem:this.removeItem,
                handleFilter:this.handleFilter,
                handleSort:this.handleSort,
                quickView:this.quickView,
                openModal:this.openModal,
                handleSearch:this.handleSearch,
                toggleWishlist:this.toggleWishlist,
                clearWishList:this.clearWishList,
                fullPage:this.fullPage,
                clearCart:this.clearCart,
                getBlog : this.getBlog}}>
                {this.props.children}
            </productContext.Provider>
        )
    }
}

export {ContextProvider , productContext}