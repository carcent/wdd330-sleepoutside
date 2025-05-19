import {
  getLocalStorage,
  getLocalStorageItemIndex,
  setLocalStorage,
  removeLocalStorageItem,
} from "./utils.mjs";

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

function removeItem(item) {
  const itemId = item.id;
  const cartItems = getLocalStorage("so-cart");
  let itemIndex = getLocalStorageItemIndex(cartItems, "Id", itemId);
  cartItems.splice(itemIndex, 1);
  setLocalStorage("so-cart", cartItems);
  if (cartItems.length == 0) {
    removeLocalStorageItem("so-cart");
  }
  renderCartContents();
}

renderCartContents();
