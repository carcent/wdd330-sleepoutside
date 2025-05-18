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
