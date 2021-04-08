import React from 'react';
import '../src/App.css';
import Products from './components/Products.jsx';
import Cart from './components/Cart.jsx';
import { productsData } from './productsData';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageName: 'Products',
      products: productsData.products,
      cart: [],
      category: 'Electronics',
      searchTerm: ''
    };
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.navigate = this.navigate.bind(this);
    this.getCartQuantity = this.getCartQuantity.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // add items in cart
  addToCart(product) {
    let itemInCart = this.state.cart.find(item => product.name === item.name);
    let updatedCart = [...this.state.cart];
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1
      };
      updatedCart.push(itemInCart);
    }
    this.setState(state => ({
      cart: updatedCart
    }));
  }

  // remove all items from cart
  clearCart() {
    console.log('All removed');
    this.setState(state => ({
      cart: []
    }));
  }

  // get individual item's quantity in cart
  getCartQuantity() {
    return this.state.cart.reduce((sum, { quantity }) => sum + quantity, 0);
  }

  // change selected filter
  changeFilter(filter) {
    console.log(filter);
    this.setState(category => ({
      category: filter
    }));
  }

  // remove a particular item from cart
  removeFromCart(productToRemove) {
    this.setState(state => ({
      cart: state.cart.filter(product => product !== productToRemove)
    }));
  }

  // alternative to react router to navigate among pages
  navigate(pageName) {
    this.setState(state => ({
      pageName: pageName
    }));
  }

  // search handler
  handleInputChange(query) {
    this.setState(state => ({
      searchTerm: query
    }));
  }

  render() {
    console.log(this.state.pageName);
    return (
      <div className='App'>
        <div className='appHeader'>
          <header>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ justifyContent: 'flex-start', color: 'white' }}>
                <h1>E-Shoppe</h1>
              </div>
              <div style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                <button
                  className='cartButton'
                  onClick={() => {
                    this.navigate('Cart');
                  }}
                >
                  Cart({this.getCartQuantity()})
                </button>
                <button
                  className='productsButton'
                  onClick={() => {
                    this.navigate('Products');
                  }}
                >
                  Home
                </button>
              </div>
            </div>
          </header>
        </div>
        {this.state.pageName === 'Products' ? (
          <Products
            products={this.state.products}
            searchTerm={this.state.searchTerm}
            addToCart={this.addToCart}
            selectedCategory={this.state.category}
            changeFilter={this.changeFilter}
            handleInputChange={this.handleInputChange}
          />
        ) : (
          <Cart products={this.state.cart} removeFromCart={this.removeFromCart} clearCart={this.clearCart} />
        )}
      </div>
    );
  }
}

export default App;
