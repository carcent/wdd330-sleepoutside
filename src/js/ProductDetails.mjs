<<<<<<< HEAD
import { setLocalStorage, getColorNames } from './utils.mjs';
=======
import { setLocalStorage, getLocalStorage, getColorNames } from './utils.mjs';
>>>>>>> 658632ad4df849c628b191e6d5ab62b45a3bf6bb

export default class ProductDetails {

    constructor(productId, dataSource){
      this.productId = productId;
      this.product = {};
      this.dataSource = dataSource;
    }

    async init() {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 658632ad4df849c628b191e6d5ab62b45a3bf6bb
        try {
            this.product = await this.dataSource.findProductById(this.productId);
            if (!this.product) {
                throw new Error(`Product not found with ID: ${this.productId}`);
            }

            this.renderProductDetails();
            document
                .getElementById('addToCart')
                .addEventListener('click', this.addProductToCart.bind(this));
        } catch (err) {
            console.error('Error initializing product details:', err);
        }
    }

    addProductToCart() {
        const cartItems = getLocalStorage('so-cart') || [];
        cartItems.push(this.product);
        setLocalStorage('so-cart', cartItems);
    }

    renderProductDetails() {
        const brandHeading = document.querySelector('.product-detail h3');
        const nameHeading = document.querySelector('.product-detail h2');
        const image = document.querySelector('.product-detail img');
        const price = document.querySelector('.product-card__price');
        const color = document.querySelector('.product__color');
        const description = document.querySelector('.product__description');
        const addToCartButton = document.getElementById('addToCart');

        brandHeading.textContent = this.product.Brand.Name;
        nameHeading.textContent = this.product.NameWithoutBrand;
        image.src = this.product.Image;
        image.alt = this.product.Name;
        price.textContent = `$${this.product.FinalPrice}`;
        color.textContent = getColorNames(this.product.Colors);
        description.innerHTML =
            this.product.DescriptionHtmlSimple ||
            this.product.Description ||
            'No description available.';
        addToCartButton.dataset.id = this.product.Id;
    }
}
<<<<<<< HEAD
=======
        this.product = await this.dataSource.findProductbyId(this.productId);
        this.renderProductDetails();
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addToCartHandler.bind(this));
    }
=======
        this.product = await this.dataSource.findProductById(this.productId);
>>>>>>> f18fa220c9cf5194dc1f39fba6231428018ed091

        this.renderProductDetails();

        document
        .getElementById('addToCart')
        .addEventListener('click', this.addProductToCart.bind(this));
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
    document.getElementById('productPrice').textContent = "$" + product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;
    document.getElementById('addToCart').dataset.id = product.Id;
<<<<<<< HEAD

}
>>>>>>> c6908e2b623b50e7a05eba7d5985d3bd45757723
=======
}
>>>>>>> f18fa220c9cf5194dc1f39fba6231428018ed091
=======
>>>>>>> 658632ad4df849c628b191e6d5ab62b45a3bf6bb
