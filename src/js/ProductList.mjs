import { capitalizeFirstLetter, getResponsiveImage, renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;

  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img src="${getResponsiveImage(product)}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">
        $${product.FinalPrice}
        ${isDiscounted ? `<span class="discount-flag">Discount!</span>` : ""}
      </p>
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
      document.querySelector(".title").textContent = capitalizeFirstLetter(this.category);
    }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}