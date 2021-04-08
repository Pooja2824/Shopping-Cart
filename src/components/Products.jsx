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
        <h1>E-Shoppe</h1>
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Table striped bordered hover variant='dark' style={{ width: '600px' }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.getFilteredProducts().map((product, index) => (
                    <tr>
                      <td style={{ width: '50px' }}>{index + 1}</td>
                      <td style={{ width: '200px' }}>
                        <Figure>
                          <Figure.Image width={171} height={180} alt='171x180' src={product.image} />
                          <Figure.Caption style={{ color: 'white' }}>{product.name}</Figure.Caption>
                        </Figure>
                      </td>
                      <td style={{ width: '50px' }}>Rs{product.cost}</td>
                      <td style={{ width: '100px' }}>
                        <Button onClick={() => this.props.addToCart(product)}>Add to Cart</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
