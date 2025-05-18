import { renderListWithTemplate } from "./utils.mjs";

// purpose to generate a list of product cards in html from an array 

function pruductCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
    <img src="${product.Image}" alt="${product.Name}">
    <h2>${product.Brand.Name}</h2>
      <h3>${product.Name}</h3>
      <p class="product-card__price">$${product.ListPrice}</p>
    </a>
  </li>`

}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;

    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList();
    }
    renderList(list) {
        // const htmlString = list.map(productCardTemplate);
        //this.listElement.innerHTML = "";
        //this.listElement.insertAdjacentHTML("afterbegin", htmlString.join(""));
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}


