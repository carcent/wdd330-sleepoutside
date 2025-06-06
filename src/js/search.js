import externalServices from "externalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const query = getParam("search");
const listElement = document.querySelector(".product-list");

const dataSource = new ExternalServices();
const productList = new ProductList(query, dataSource, listElement);

productList.init();