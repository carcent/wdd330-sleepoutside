import {
  getLocalStorage,
  getLocalStorageItemIndex,
  setLocalStorage,
  removeLocalStorageKey,
  loadHeaderFooter,
  getResponsiveImage,
} from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  document.querySelector(".product-list").innerHTML = "";
  let cartItems = getLocalStorage("so-cart") || "The Cart Is Empty";
  if (cartItems != "The Cart Is Empty") {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    cartItems.forEach((item) => {
      document.getElementById(item.Id).addEventListener("click", () => {
        removeItem(document.getElementById(item.Id));
        cartItems = getLocalStorage("so-cart") || "The Cart Is Empty";
        calculateCartTotal(cartItems);
      });
      document.querySelector("#add").addEventListener("click", () => {
        changeQuantity("add", item);
        cartItems = getLocalStorage("so-cart") || "The Cart Is Empty";
        calculateCartTotal(cartItems);
      })
      document.querySelector("#subtract").addEventListener("click", () => {
        changeQuantity("subtract", item);
        cartItems = getLocalStorage("so-cart") || "The Cart Is Empty";
        calculateCartTotal(cartItems);
      })
    });
  } else {
    document.querySelector(".product-list").innerHTML = cartItems;
    
  }

}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${getResponsiveImage(item)}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity"><span id="add">+</span> qty: ${item.Quantity} <span id="subtract">-</span></p>
  <p class="cart-card__price">$${(item.FinalPrice * item.Quantity).toFixed(2)}</p>
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
    removeLocalStorageKey("so-cart");
  }
  renderCartContents();
}

function calculateCartTotal(items) {
  const cartFooter = document.querySelector(".cart-footer");
  if (items == null) { cartFooter.classList.add("hide"); return; }
  if (!items || items.length === 0) { cartFooter.classList.add("hide"); return; };
  let total = 0;
  items.forEach((item) => {
    const price = parseFloat(item.FinalPrice || item.price || 0);
    const quantity = item.Quantity || 1;
    total += price * quantity;
  });

  const totalAmount = document.querySelector(".cart-total");


  if (totalAmount && cartFooter) {
    totalAmount.textContent = total.toFixed(2);
    cartFooter.classList.remove("hide");
  }
}

function changeQuantity(change, item) {
  const itemId = item.id;
  const cartList = getLocalStorage("so-cart");
  let itemIndex = getLocalStorageItemIndex(cartList, "Id", itemId);
  switch (change) {
    case "add":
      cartList[itemIndex].Quantity += 1;
      setLocalStorage("so-cart", cartList);
      break;
    case "subtract":
      if (cartList[itemIndex].Quantity == 1) {
        cartList.splice(itemIndex, 1);
        if (cartList.length == 0) {
          removeLocalStorageKey("so-cart");
        }
        setLocalStorage("so-cart", cartList);
      } else {
        cartList[itemIndex].Quantity -= 1;
        setLocalStorage("so-cart", cartList);
      }
      break;
  }
  renderCartContents();
}

const cartItems = getLocalStorage("so-cart");
renderCartContents();
calculateCartTotal(cartItems);

renderCartContents();
// work


