import { getLocalStorage, setLocalStorage, productIsInArray, findProductIndexInArrayById } from "./utils.mjs";

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
    
    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        const productId = this.product.Id
        if(cartItems.length != 0 && productIsInArray(productId, cartItems))
        {
            const itemIndex = findProductIndexInArrayById(productId, cartItems);
            cartItems[itemIndex].Quantity ++;
            setLocalStorage("so-cart", cartItems);
        } else {
            this.product.Quantity = 1;
            cartItems.push(this.product);
            setLocalStorage("so-cart", cartItems);
        }
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Images.PrimaryExtraLarge;
    productImage.alt = product.NameWithoutBrand;
    
    document.getElementById('productFinalPrice').textContent = `$${product.FinalPrice}`;
    document.getElementById('productPrice').textContent = `$${product.SuggestedRetailPrice}`;
    document.getElementById('savePrice').textContent = `SAVE $${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)}`;

    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;
    document.getElementById('addToCart').dataset.id = product.Id;
}