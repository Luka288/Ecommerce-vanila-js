import { buildNavigation } from "./navbar.js";

const total = document.querySelector(".total");
const countOfItems = document.querySelector(".countOfItems");
const items = document.querySelector(".itemsCart");
const nothingFound = document.querySelector(".nothingFound");
const info = document.querySelector(".info");
const currencyH = document.querySelector(".currency");

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

let totalPrice = 0;
let countItems = [];

init();

function init() {
  checkPage();
  let userToken = "";

  if (Cookies.get("refresh_token")) {
    userToken = Cookies.get("refresh_token");
  } else {
    userToken = sessionStorage.getItem("refresh_token");
  }
  requestCart(userToken);
  buildNavigation();
}

async function requestCart(token) {
  try {
    const requestItems = await fetch(
      "https://api.everrest.educata.dev/shop/cart",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const parseRequest = await requestItems.json();

    parseRequest.products.forEach((element) => {
      loadProducts(element.productId);
    });
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Cart is empty",
    });
  }
}

async function loadProducts(_id) {
  try {
    const loadCartItems = await fetch(
      `https://api.everrest.educata.dev/shop/products/id/${_id}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );

    const parseItems = await loadCartItems.json();
    buildItems(parseItems);
    updateUI();
    checkPage();
  } catch (error) {}
}

function buildItems(item) {
  const itemContainer = document.createElement("div");
  const imgCon = document.createElement("div");
  const itemThumbnail = document.createElement("img");
  const titlePrice = document.createElement("div");
  const title = document.createElement("p");
  const price = document.createElement("p");
  const removeItem = document.createElement("a");
  const span = document.createElement("span");

  title.classList.add("containerChild");
  removeItem.classList.add("containerChild");
  price.classList.add("containerChild");
  span.classList.add("discount");
  itemContainer.classList.add("item");
  imgCon.classList.add("imgCon");
  titlePrice.classList.add("titlePrice");

  title.textContent = item.title;
  if (item.price.discountPercentage) {
    span.textContent = `${item.price.beforeDiscount} ${item.price.currency}`;
    price.textContent = `${item.price.current} ${item.price.currency}`;
    price.appendChild(span);
  } else {
    price.textContent = `${item.price.current} ${item.price.currency}`;
  }

  removeItem.textContent = "Remove item";

  itemThumbnail.src = item.thumbnail;

  imgCon.appendChild(itemThumbnail);
  titlePrice.appendChild(title);
  titlePrice.appendChild(price);
  titlePrice.appendChild(removeItem);

  itemContainer.appendChild(imgCon);
  itemContainer.appendChild(titlePrice);

  removeItem.addEventListener("click", function () {
    removeItemF(item._id, itemContainer, item.price.current);
    checkPage();
  });

  items.appendChild(itemContainer);
  countItems.push(item);
  calcTotal(item);
}

async function removeItemF(_id, itemContainer, price) {
  let user_token;

  if (Cookies.get("refresh_token")) {
    user_token = Cookies.get("refresh_token");
  } else {
    user_token = sessionStorage.getItem("refresh_token");
  }
  try {
    const sendItem = await fetch(
      "https://api.everrest.educata.dev/shop/cart/product",
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_token}`,
        },
        body: JSON.stringify({ id: _id }),
      }
    );

    const parse = await sendItem.json();

    itemContainer.remove();

    const itemToRemove = countItems.find((item) => item._id === _id);

    totalPrice -= itemToRemove.price.current;

    countItems = countItems.filter((item) => item._id !== _id);

    updateUI();
  } catch (error) {}
}

function updateUI() {
  countOfItems.textContent = countItems.length;
  total.textContent = `${totalPrice} USD`;

  if (countItems.length > 0 && countItems[0].price) {
    currencyH.innerHTML = `${totalPrice.toFixed(2)} <span class="total">${
      countItems[0].price.currency
    }</span>`;
  }

  checkPage();
}

function calcTotal(item) {
  totalPrice += item.price.current;
  currencyH.innerHTML = `${totalPrice} <span class="total">${item.price.currency}</span>`;
  // countItems.push(item);

  countOfItems.textContent = countItems.length;

  total.textContent = totalPrice;
  updateUI();
}

function checkPage() {
  if (countItems.length == 0) {
    nothingFound.style.display = "flex";
    items.style.display = "none";
    info.style.display = "none";
  } else {
    nothingFound.style.display = "none";
    items.style.display = "flex";
    info.style.display = "block";
  }
}
