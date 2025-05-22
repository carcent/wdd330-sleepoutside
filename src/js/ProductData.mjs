import { renderListWithTemplate } from './utils.mjs';

// purpose to generate a list of product cards in html from an array 

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }
  renderList(list) {
    // const htmlString = list.map(productCardTemplate);
    //this.listElement.innerHTML = "";
    //this.listElement.insertAdjacentHTML("afterbegin", htmlString.join(""));
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}

export class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then(function(data) { return data; });
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find(function(item) { return item.Id === id; });
  }
}