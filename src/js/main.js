import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
<<<<<<< HEAD

const listElement = document.querySelector(".product-list");

<<<<<<< Updated upstream
//const productList = new ProductList("Tents", dataSource, element);
//productList.init();
const myList = new ProductList('tents', dataSource, listElement);
myList.init();
=======
const productList = new ProductList("Tents", dataSource, element);

=======
const listElement = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, listElement);
>>>>>>> 7432f0762d44dd73489e56a70561bc716dba33d0
productList.init();
>>>>>>> Stashed changes
