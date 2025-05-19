import { renderListWithTemplate } from './utils.mjs';

<<<<<<< HEAD
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
<<<<<<< Updated upstream
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
      }
=======

=======
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.ListPrice}</p>
    </a>
  </li>`
}

export default class ProductList {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
>>>>>>> 7432f0762d44dd73489e56a70561bc716dba33d0
    }

    async init() {
        const list = await this.dataSource.getData();
<<<<<<< HEAD
        this.renderList();
    }
>>>>>>> Stashed changes
    renderList(list) {
        // const htmlString = list.map(productCardTemplate);
        //this.listElement.innerHTML = "";
        //this.listElement.insertAdjacentHTML("afterbegin", htmlString.join(""));
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}


=======
        this.renderList(list);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
>>>>>>> 7432f0762d44dd73489e56a70561bc716dba33d0
