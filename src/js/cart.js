import {
  getLocalStorage,
  getLocalStorageItemIndex,
  setLocalStorage,
  removeLocalStorageKey,
} from "./utils.mjs";

function renderCartContents() {
  document.querySelector(".product-list").innerHTML = "";

  const cartData = getLocalStorage("so-cart") || [];

  if (Array.isArray(cartData) && cartData.length > 0) {
    const htmlItems = cartData.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    cartData.forEach((item) => {
      document.getElementById(item.Id).addEventListener("click", () => {
        removeItem(document.getElementById(item.Id));
      });
    });
  } else {
    document.querySelector(".product-list").innerHTML = "The Cart Is Empty";
  }
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class="remove-item" id="${item.Id}"><b>X</b></span>
  </li>`;
}

function removeItem(item) {
  const itemId = item.id;
  const itemsInStorage = getLocalStorage("so-cart");
  const itemIndex = getLocalStorageItemIndex(itemsInStorage, "Id", itemId);

  itemsInStorage.splice(itemIndex, 1);
  setLocalStorage("so-cart", itemsInStorage);

  if (itemsInStorage.length === 0) {
    removeLocalStorageKey("so-cart");
  }

  renderCartContents();
  calculateCartTotal(itemsInStorage);
}

function calculateCartTotal(items) {
  if (!items || items.length === 0) return;

  let total = 0;
  items.forEach((item) => {
    const price = parseFloat(item.FinalPrice || item.price || 0);
    const quantity = item.quantity || 1;
    total += price * quantity;
  });

  const cartFooter = document.querySelector(".cart-footer");
  const totalAmount = document.querySelector(".cart-total");

  if (totalAmount && cartFooter) {
    totalAmount.textContent = total.toFixed(2);
    cartFooter.classList.remove("hide");
  }
}

// Initialize cart view and total
const initialCart = getLocalStorage("so-cart");
renderCartContents();
calculateCartTotal(initialCart);
