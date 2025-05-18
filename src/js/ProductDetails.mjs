<<<<<<< HEAD
import { setLocalStorage, getColorNames } from './utils.mjs';
=======
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
>>>>>>> c6908e2b623b50e7a05eba7d5985d3bd45757723

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
<<<<<<< HEAD
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
=======
        this.product = await this.dataSource.findProductbyId(this.productId);
        this.renderProductDetails();
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addToCartHandler.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);

    }
}

function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById('productPrice').textContent = product.finalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;
    document.getElementById('addToCart').dataset.id = product.Id;

}
>>>>>>> c6908e2b623b50e7a05eba7d5985d3bd45757723
