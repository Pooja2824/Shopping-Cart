import React from 'react';
import { category } from '../productsData';
import { Table, Button, Dropdown, Figure } from 'react-bootstrap';
import '../styles/Products.css';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.getFilteredProducts = this.getFilteredProducts.bind(this);
  }

  getFilteredProducts() {
    console.log(this.props.products);
    const filteredProducts = this.props.products.filter(product => product.category === this.props.selectedCategory);
    if (this.props.searchTerm !== '') {
      return filteredProducts.filter(product => product.name.includes(this.props.searchTerm));
    }
    return filteredProducts;
  }

  render() {
    return (
      <div>
        <div className='filter'>
          <span className='filterLabel'>Select category</span>
          <select className='filterMenu' onChange={e => this.props.changeFilter(e.target.value)}>
            <option value={category.ELECTRONICS}>Electronics</option>
            <option value={category.SPORTS}>Sports</option>
            <option value={category.ENTERTAINMENT}>Entertainment</option>
          </select>
          <input
            className='searchBar'
            type='text'
            placeholder='Search...'
            name='search'
            onChange={e => {
              this.props.handleInputChange(e.target.value);
            }}
          ></input>
        </div>
        <div>
          {this.getFilteredProducts().length > 0 ? (
            <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center' }}>
              {this.getFilteredProducts().map((product, index) => (
                <React.Fragment>
                  <div
                    style={{
                      width: '80%',
                      display: 'flex',
                      flexFlow: 'row',
                      justifyContent: 'center',
                      marginTop: '20px'
                    }}
                  >
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
                      <div style={{ display: 'flex', justifyContent: 'flex-start', fontSize: '14px' }}>
                        <p>{product.description}</p>
                      </div>
                      <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                        <Button onClick={() => this.props.addToCart(product)}>Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                  {index !== 1 ? <div style={{ border: '1px solid', width: '80%' }} /> : null}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className='messageContainer'>
              Sorry, we could not find results based on current filter and search term combination.
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Products;
