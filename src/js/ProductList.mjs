import { renderListWithTemplate } from "./utils.mjs";


// did't use this??
// function productCardTemplate(product) {
//     return `<li class="product-card">
//         <a href="product_pages/?product=${product.Id}">
//             <img src="${product.Image}" alt="${product.Name}">
//             <h2 class="card__brand">${product.Brand.Name}</h2>
//             <h3 class="card__name">${product.Name}</h3>
//             <p class="product-card__price">$${product.FinalPrice}</p>
//         </a>
//     </li>`;
// }

// Add a class called ProductList and export this class as default.
export default class ProductList {
    constructor(category, dataSource, listElement) {
        //Begin creating your ProductList module by writing the code for the constructor. There are more than one category of products that will need to be independently listed. In order to make the ProductList class as flexible and reusable as possible, the constructor should receive the following parameters:
        //the product category,
        //the dataSource, and
        //the HTML element (listElement) in which to render the product list (output target).
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        // Finally, use the dataSource to get the list of products to work with. You could do that in the constructor or in an init() method. One advantage of the init method is that it will allow us to use async/await when calling the promise in getData().
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
