import React from 'react';
import '../styles/Cart.css';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.getPurchaseValue = this.getPurchaseValue.bind(this);
  }

  getPurchaseValue() {
    return this.props.products.reduce((sum, { cost, quantity }) => sum + cost * quantity, 0);
  }

  render() {
    return (
      <div>
        <h1>Cart</h1>
        <div className='cartControls'>
          {this.props.products.length === 0 && (
            <button className='clearButton' onClick={() => this.props.clearCart()}>
              Clear cart
            </button>
          )}
        </div>
        {this.props.products.map((product, index) => (
          <div key={index}>
            <h3>{product.name}</h3>
            <h3>Rs{product.cost}</h3>
            <h3>{product.quantity}</h3>
            <img src={product.image} alt={product.name} />
            <button onClick={() => this.props.removeFromCart(product)}>Remove from Cart</button>
          </div>
        ))}
        <div className='priceContainer'>Total cost: Rs {this.getPurchaseValue()}</div>
      </div>
    );
  }
}

export default Cart;
