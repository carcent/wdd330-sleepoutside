import { setLocalStorage, 
    getLocalStorage, 
    alertMessage, 
    removeItem } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        return {
            id: item.Id,
            price: item.FinalPrice * item.Quantity,
            name: item.Name,
            quantity: item.Quantity,
        };
    });
    return simplifiedItems;
}

function formDataToJSON(formData) {
    const data = new FormData(formData);
    const convertedJSON = {};
    data.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage("so-cart");
        this.calculateItemSubTotal();
    }

    calculateItemSubTotal() {
        
        let subtotal = 0;
        let itemCount = 0;
        this.list.forEach(item => {
            subtotal += item.FinalPrice * item.Quantity;
            itemCount ++;
        });
        this.itemTotal = subtotal;
        document.querySelector("#cartTotal").textContent = `$${subtotal.toFixed(2)}`
        document.querySelector("#num-items").textContent = `${itemCount}`
    }

    calculateOrderTotal() {
        this.tax = this.itemTotal * 0.06;
        this.shipping = 10 + ((this.list.length - 1) * 2);
        this.orderTotal = (parseFloat(this.itemTotal) + parseFloat(this.tax) + parseFloat(this.shipping));

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    async checkout() {
        const formElement = document.forms["checkout"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);
        console.log(order)
        try {
            const response = await services.checkout(order);
            console.log(response);
            
            localStorage.removeItem('so-cart');
            window.location.href = '../checkout/success.html';
        

        } catch (err) {
          if (err.name === 'servicesError') {
            console.error('Service Error:', err.message);
            this.displayErrorMessage(err.message);
          } else {
            console.error('Unexpected error:', err);

          }
    
        }
    }
}