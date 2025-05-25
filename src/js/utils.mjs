// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('product')
  return product
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  clear ? parentElement.innerHTML = "" : 0;
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  };
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const item = await fetch(path);
  const template = item.text();
  return template;
}

export async function loadHeaderFooter() {
  const header = document.getElementById("header-main");
  const footer = document.getElementById("footer-main");
  const headerContent = await loadTemplate("../partials/header.html");
  const footerContent = await loadTemplate("../partials/footer.html");

  renderWithTemplate(headerContent, header);
  renderWithTemplate(footerContent, footer);

}

export function getLocalStorageItemIndex(array, attr, value) {
  let i = array.length;
  let indexNumber = 0;
  while (i--) {
    if (array[i] && array[i].hasOwnProperty(attr) && (arguments.length > 2 && array[i][attr] === value)) {
      indexNumber = i;
    }
  }
  return indexNumber;
}

export function removeLocalStorageKey(key) {
  localStorage.removeItem(key);
}

export function getResponsiveImage(product) {
  const width = window.innerWidth;
  let images = product.Image;
  if (width < 600 && images?.PrimarySmall) {
    return images.small;
  }
  if (width < 800 && images?.PrimaryMedium) {
    return images.medium;
  }
  if (width < 1440 && images?.PrimaryLarge) {
    return images.PrimaryLarge;
  }
  return images?.PrimaryLarge || product.image;
}