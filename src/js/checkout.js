import { loadHeaderFooter, removeLocalStorageKey } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms[0] 
  const isFilled = myForm.checkValidity();
  myForm.reportValidity();
  if(isFilled) {
    order.checkout();
    removeLocalStorageKey("so-cart");
    window.location.href= "../checkout/success.html";
  }
});