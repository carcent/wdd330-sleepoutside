import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./js/Alert.js";

const dataSource = new ProductData("tents");
<<<<<<< HEAD
const listElement = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, listElement);
productList.init();
=======

const listElement = document.querySelector(".product-list");

//const productList = new ProductList("Tents", dataSource, element);
//productList.init();
const myList = new ProductList('tents', dataSource, listElement);
myList.init();

const alert = new Alert();
alert.init();
>>>>>>> 658632ad4df849c628b191e6d5ab62b45a3bf6bb
