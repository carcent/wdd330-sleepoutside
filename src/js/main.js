import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert";
import {loadHeaderFooter} from "./utils.mjs"

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, listElement);
productList.init();

const alert = new Alert();
alert.init();

loadHeaderFooter();