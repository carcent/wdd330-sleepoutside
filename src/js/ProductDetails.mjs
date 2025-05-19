<<<<<<< Updated upstream
=======
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> Stashed changes
import { setLocalStorage, getColorNames } from './utils.mjs';

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        try {
            this.product = await this.dataSource.findProductById(this.productId);
            if (!this.product) {
                throw new Error(`Product not found with ID: ${this.productId}`);
            }
            this.renderProductDetails();
            document.getElementById('addToCart')
                .addEventListener('click', this.addToCart.bind(this));
        } catch (err) {
            console.error('Error initializing product details:', err);
        }
    }

    renderProductDetails() {
        // Select all needed elements
        const brandHeading = document.querySelector('.product-detail h3');
        const nameHeading = document.querySelector('.product-detail h2');
        const image = document.querySelector('.product-detail img');
        const price = document.querySelector('.product-card__price');
        const color = document.querySelector('.product__color');
        const description = document.querySelector('.product__description');
        const addToCartButton = document.getElementById('addToCart');

        // Update content with product data
        brandHeading.textContent = this.product.Brand.Name;
        nameHeading.textContent = this.product.NameWithoutBrand;
        image.src = this.product.Image;
        image.alt = this.product.Name;
        price.textContent = `$${this.product.FinalPrice}`;

        // Update colors safely
        color.textContent = getColorNames(this.product.Colors);

        // Correctly set the description HTML
        description.innerHTML =
            this.product.DescriptionHtmlSimple ||
            this.product.Description ||
            "No description available.";

        addToCartButton.dataset.id = this.product.Id;
    }

    addToCart() {
        setLocalStorage('so-cart', this.product);
    }
}
<<<<<<< Updated upstream
=======
=======
        this.product = await this.dataSource.findProductbyId(this.productId);
        this.renderProductDetails();
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addToCartHandler.bind(this));
    }

=======
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource){
      this.productId = productId;
      this.product = {};
      this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);

        this.renderProductDetails();

        document
        .getElementById('addToCart')
        .addEventListener('click', this.addProductToCart.bind(this));
    }
    
>>>>>>> 7432f0762d44dd73489e56a70561bc716dba33d0
    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
<<<<<<< HEAD

=======
>>>>>>> 7432f0762d44dd73489e56a70561bc716dba33d0
    }
}

function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;
<<<<<<< HEAD

    document.getElementById('productPrice').textContent = product.finalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;
    document.getElementById('addToCart').dataset.id = product.Id;

}
>>>>>>> c6908e2b623b50e7a05eba7d5985d3bd45757723
=======
    document.getElementById('productPrice').textContent = "$" + product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;
    document.getElementById('addToCart').dataset.id = product.Id;
}
>>>>>>> 7432f0762d44dd73489e56a70561bc716dba33d0
>>>>>>> Stashed changes
