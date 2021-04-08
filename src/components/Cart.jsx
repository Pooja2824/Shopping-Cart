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
        <div style={{ display: 'flex' }}>
          <div className='dummyContainer'></div>
          <div className='priceContainer'>Total cost: Rs {this.getPurchaseValue()}</div>
        </div>
        {/* <div className='cartControls'>
          {this.props.products.length === 0 && (
            <button className='clearButton' onClick={() => this.props.clearCart()}>
              Clear cart
            </button>
          )}
        </div> */}
        <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {this.props.products.map((product, index) => (
            // <div key={index}>
            //   <h3>{product.name}</h3>
            //   <h3>Rs{product.cost}</h3>
            //   <h3>{product.quantity}</h3>
            //   <img src={product.image} alt={product.name} />
            //   <button onClick={() => this.props.removeFromCart(product)}>Remove from Cart</button>
            // </div>
            <React.Fragment
              style={{ display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
              <div style={{ width: '80%', display: 'flex', flexFlow: 'row', justifyContent: 'center' }}>
                <div style={{ width: '25%' }}>
                  <Figure>
                    <Figure.Image width={171} height={180} alt='171x180' src={product.image} />
                  </Figure>
                </div>
                <div
                  style={{
                    width: '75%',
                    display: 'flex',
                    flexFlow: 'column',
                    marginLeft: '50px',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: 'bold',
                      fontFamily: 'serif',
                      fontSize: '20px'
                    }}
                  >
                    {product.name}
                  </div>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      fontWeight: 'normal',
                      fontFamily: 'monospace',
                      fontSize: '20px'
                    }}
                  >
                    {product.category}
                  </div>
                  <div style={{ width: '100%', display: 'flex' }}>Rs.{product.cost}</div>
                  <div style={{ width: '100%', display: 'flex' }}>Description</div>
                  <Button variant='warning' onClick={() => this.props.removeFromCart(product)}>
                    Remove from Cart
                  </Button>
                </div>
              </div>
              {index !== 1 ? <div style={{ border: '1px solid', width: '80%' }} /> : null}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default Cart;
