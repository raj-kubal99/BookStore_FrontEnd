import Cart from './Cart';
import Catalogue from './Catalogue';
import Footer from './Footer';
import Header from './Header';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import ProductDetails from './ProductDetails';
import { useState } from 'react';
import PageNotFound from './PageNotFound';

function HomePage() {
    const [cartItems, setCartItems] = useState([]);
    const [addedToCart, setAddedToCart] = useState({});

    return (
      <BrowserRouter>
      <div className="homepage">
        <header>
            <Header />
        </header>

        <div className="body">
          <Switch>
            <Route exact path="/">
              <Catalogue cartItems={cartItems} setCartItems={setCartItems} addedToCart={addedToCart} setAddedToCart={setAddedToCart}/>
            </Route>
            <Route path="/cart">
              <Cart cartItems={cartItems} setCartItems={setCartItems} setAddedToCart={setAddedToCart}/>
            </Route>
            <Route path="/productinfo/:id">
              <ProductDetails cartItems={cartItems} setCartItems={setCartItems} addedToCart={addedToCart} setAddedToCart={setAddedToCart}/>
            </Route>
            <Route path="*">
              <PageNotFound/>
            </Route>

          </Switch>
        </div> 

        <footer>
            <Footer />
        </footer>
      </div>
      </BrowserRouter>
    );
  }
  
  export default HomePage;