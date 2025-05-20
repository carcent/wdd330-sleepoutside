<<<<<<< HEAD
import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from './utils.mjs';
import ProductDetails from './ProductDetails.mjs';

const productId = getParam('product');
const dataSource = new ProductData('tents');
=======
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

>>>>>>> f18fa220c9cf5194dc1f39fba6231428018ed091
const product = new ProductDetails(productId, dataSource);
product.init();

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}
// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
