<<<<<<< HEAD
import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from './utils.mjs';
import ProductDetails from './ProductDetails.mjs';

const productId = getParam('product');
const dataSource = new ProductData('tents');
const product = new ProductDetails(productId, dataSource);
product.init();

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
<<<<<<< Updated upstream
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
=======
//document
//.getElementById("addToCart")
//.addEventListener("click", addToCartHandler);
=======
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();

// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
>>>>>>> 7432f0762d44dd73489e56a70561bc716dba33d0
>>>>>>> Stashed changes
