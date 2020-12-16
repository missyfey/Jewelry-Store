
import React , { Component } from 'react';
import {Route , Switch} from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import Default from './pages/Default'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Shop from './pages/Shop'
import DetailProduct from './pages/DetailProduct'
import Cart from './pages/Cart'
import WishList from './pages/WishList'
import Checkout from './pages/Checkout'
import AboutUs from './pages/AboutUs'
import Blog from './pages/Blog'
import FullBlog from './pages/FullBlog'
class App extends Component{
  render(){
    return (
      <>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/blog" exact component={Blog} />
          <Route path="/about" component={AboutUs} />
          <Route path="/cart" component={Cart} />
          <Route path="/wishlist" component={WishList} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/detail/:id" component={DetailProduct} />
          <Route path='/blog/:slug' exact component={FullBlog} />
          <Route component={Default} />
        </Switch>
        <Footer />
      </>
      );
  }
}
export default App;
