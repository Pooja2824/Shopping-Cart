import React from 'react';
import '../styles/Cart.css';
import { Figure, Button } from 'react-bootstrap';

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
        <div className="topContainer">
          <div className='dummyContainer'></div>
          <div className='cartPriceContainer'>Total cost: Rs {this.getPurchaseValue()}</div>
        </div>
        {/* <div className='cartControls'>
          {this.props.products.length === 0 && (
            <button className='clearButton' onClick={() => this.props.clearCart()}>
              Clear cart
            </button>
          )}
        </div> */}
        <div className="cartContainer">
          {this.props.products.map((product, index) => (
            <React.Fragment
              style={{ display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
              <div className="mainCartContainer">
                <div className="cartImageContainer">
                  <Figure>
                    <Figure.Image width={171} height={180} alt='171x180' src={product.image} />
                  </Figure>
                </div>
                <div className="container">
                  <div className="productNameCart">
                    {product.name}
                  </div>
                  <div className="productCategoryCart">
                    {product.category}
                  </div>
                  <div className="productCostCart">Rs.{product.cost}</div>
                  <div className="productDscriptionCart">{product.description}</div>
                  <div className="productQuantityCart">{product.quantity}</div>
                  <div className="removeButton">
                  <Button variant='warning' onClick={() => this.props.removeFromCart(product)}>
                    Remove from Cart
                  </Button>
                  </div>
                </div>
              </div>
              <div className="borderContainerCart" /> 
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default Cart;
