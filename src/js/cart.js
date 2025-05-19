import {
  getLocalStorage,
  getLocalStorageItemIndex,
  setLocalStorage,
  removeLocalStorageKey,
} from "./utils.mjs";

<<<<<<< HEAD
function renderCartContents(items) {
  const htmlItems = items.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
=======
function renderCartContents() {
  document.querySelector(".product-list").innerHTML = "";
  const cartItems = getLocalStorage("so-cart") || "The Cart Is Empty";
  if (cartItems != "The Cart Is Empty") {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    cartItems.forEach((item) => {
      document.getElementById(item.Id).addEventListener("click", () => {
        removeItem(document.getElementById(item.Id));
      });
    });
  } else {
    document.querySelector(".product-list").innerHTML = cartItems;
  }

  // document.querySelector(".remove-item").addEventListener("click", () => {removeItem(this)})
>>>>>>> 7432f0762d44dd73489e56a70561bc716dba33d0
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="remove-item" id="${item.Id}"><b>X</b></span>
</li>`;
  return newItem;
}

<<<<<<< HEAD


function calculateCartTotal(items) {
  if (!items || items.length === 0) return;
  let total = 0;
  items.forEach((item) => {
    const price = parseFloat(item.FinalPrice || item.price || 0);
    const quantity = item.quantity || 1;
    total += price * quantity;
  });

  const cartFooter = document.querySelector(".cart-footer");
  const totalAmount = document.querySelector("cart-total");

  if (totalAmount && cartFooter) {
    totalAmount.textContent = total.toFixed(2);
    cartFooter.classList.remove("hide");
  }
}
const cartItems = getLocalStorage("so-cart");
renderCartContents(cartItems);
calculateCartTotal(cartItems);
=======
function removeItem(item) {
  const itemId = item.id;
  const cartItems = getLocalStorage("so-cart");
  let itemIndex = getLocalStorageItemIndex(cartItems, "Id", itemId);
  cartItems.splice(itemIndex, 1);
  setLocalStorage("so-cart", cartItems);
  if (cartItems.length == 0) {
    removeLocalStorageKey("so-cart");
  }
  renderCartContents();
}

renderCartContents();
>>>>>>> 7432f0762d44dd73489e56a70561bc716dba33d0
