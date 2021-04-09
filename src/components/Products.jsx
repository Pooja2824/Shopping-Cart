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
    let filteredProducts = this.props.products;
    if(this.props.selectedCategory !== category.ALL) {
      filteredProducts = this.props.products.filter(product => product.category === this.props.selectedCategory);
    } 
    if (this.props.searchTerm !== '') {
      return filteredProducts.filter(product => product.name.toLowerCase().includes(this.props.searchTerm.toLowerCase()) || 
      product.category.toLowerCase().includes(this.props.searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(this.props.searchTerm.toLowerCase()));
    }
    return filteredProducts;
  }

  render() {
    return (
      <div>
        <div className='filter'>
          <span className='filterLabel'>Select category</span>
          <select className='filterMenu' onChange={e => this.props.changeFilter(e.target.value)}>
          <option value={category.ALL}>All</option>
            <option value={category.MOBILE} selected={this.props.selectedCategory===category.MOBILE}>Mobile</option>
            <option value={category.SHOES} selected={this.props.selectedCategory===category.SHOES}>Shoes</option>
            <option value={category.LAPTOP} selected={this.props.selectedCategory===category.LAPTOP}>Laptop</option>
            <option value={category.BOOKS} selected={this.props.selectedCategory===category.BOOKS}>Books</option>
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
            <div className="mainContainer">
              {this.getFilteredProducts().map((product, index) => (
                <React.Fragment>
                  <div className="productContainer">
                    <div className="imageContainer">
                      <Figure>
                        <Figure.Image width={171} height={180} alt='171x180' src={product.image} />
                      </Figure>
                    </div>
                    <div className="container">
                      <div className="productName">
                        {product.name}
                      </div>
                      <div className="productCategory">
                        {product.category}
                      </div>
                      <div className="productCost">Rs.{product.cost}</div>
                      <div className="productDescription">
                        <p>{product.description}</p>
                      </div>
                      <div className="buttonContainer">
                        <Button onClick={() => this.props.addToCart(product)}>Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                  <div className="borderContainer" />
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
