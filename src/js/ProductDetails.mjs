// This script file will be programmed to contain the code to dynamically produce the product detail pages.
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  
  // This is recommended for classes.
  constructor(productId, dataSource){
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    //  There are a few things that need to happen before the class can be used. Some will happen in the constructor, automatically. Other Others need to be controlled and will be placed in this init method.
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetials();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    // add listener to Add to Cart button
    document.getElementById("addToCart")
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart(product) {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(product);
    setLocalStorage("so-cart", cartItems);
  }

  // Method to generate or populate the HTML to display the product details.
  renderProductDetials() {
    ProductDetailsTemplate(this.product);
  }
}

function ProductDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;
  
  const productImage = document.getElementById('productImage');
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;
  
  
  document.getElementById('productFinalPrice').textContent = `$${product.FinalPrice}`;
  document.getElementById('productPrice').textContent = `$${product.SuggestedRetailPrice}`;
  document.getElementById('savePrice').textContent = `SAVE $${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)}`;
  document.getElementById('productColor').textContent = product.Colors[0].ColorName;
  document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;
  
  document.getElementById('addToCart').dataset.id = product.Id;
}