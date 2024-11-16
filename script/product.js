import { buildNavigation } from "./navbar.js";
import { buildResponsiveCategory } from "./category.js";
import Swal from "../node_modules/sweetalert2/src/sweetalert2.js";

const thumbnails = document.getElementById("thumbnails");
const mainPhotos = document.querySelector(".mainPhotos");
const purchaseContainer = document.querySelector(".purchaseContainer");
const stockP = document.querySelector(".stockP");
const stockSpan = document.querySelector(".count");
const ratingP = document.querySelector(".ratingP");
const ratingSpan = document.querySelector(".ratingSpan");
const installmentH1 = document.querySelector(".installmentH1");
const purchaseBtn = document.querySelector(".purchaseBtn");
const priceSide = document.querySelector(".priceSide");
const issueDate = document.querySelector(".issueDate");
const brandP = document.querySelector(".brandP");
const categoryP = document.querySelector(".categoryP");
const descP = document.querySelector(".descP");
const addToCart = document.querySelector(".addToCart");
const responsiveAdd = document.querySelectorAll(".responsiveAdd");

//responsive

const priceResp = document.querySelector(".price");

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
init();

function init() {
  buildNavigation();
  specificProdFromUrl();
  mountSplider();
  buildResponsiveCategory();
  // productPageGuard();
}

function specificProdFromUrl() {
  const item_id = new URLSearchParams(window.location.search);
  const parsed_id = item_id.get("product_id");

  specificProd(parsed_id);
}

async function specificProd(_id) {
  try {
    const itemResponse = await fetch(
      `https://api.everrest.educata.dev/shop/products/id/${_id}`,
      {
        method: "GET",
      }
    );

    if (!itemResponse.ok) {
      throw new Error("Error Fetching product");
    }

    const parseItem = await itemResponse.json();

    if (parseItem.stock === 0) {
      addToCart.disabled = true;
    }

    buildDescription(parseItem);
    buildSplide(parseItem);
    buildStatic(parseItem);

    addToCart.addEventListener("click", function () {
      if (parseItem.stock === 0) {
        Toast.fire({
          icon: "error",
          title: "Item is out of stock",
        });
        return;
      }

      Toast.fire({
        icon: "success",
        title: "Item added to cart",
      });
      createCart(parseItem._id);
    });

    purchaseBtn.addEventListener("click", function () {
      if (parseItem.stock === 0) {
        Toast.fire({
          icon: "error",
          title: "Item is out of stock",
        });
        return;
      }

      Toast.fire({
        icon: "success",
        title: "Item added to cart",
      });
      createCart(parseItem._id);
    });

    responsiveAdd.forEach((bt) => {
      bt.addEventListener("click", function () {
        if (parseItem.stock === 0) {
          Toast.fire({
            icon: "error",
            title: "Item is out of stock",
          });
          return;
        }
        Toast.fire({
          icon: "success",
          title: "Item Added into cart",
        });
        createCart(parseItem._id);
      });
    });
  } catch (error) {
    //! swal fire on error
  }
}

async function createCart(_id) {
  try {
    let token = "";

    if (Cookies.get("refresh_token")) {
      token = Cookies.get("refresh_token");
    } else {
      token = sessionStorage.getItem("refresh_token");
    }

    const sendID = await fetch(
      "https://api.everrest.educata.dev/shop/cart/product",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: _id,
          quantity: 1,
        }),
      }
    );

    const parse = await sendID.json();

    if (parse.error === "User already created cart, use patch endpoint") {
      getCart(token, _id, 1);
    }
  } catch (error) {}
}

async function getCart(token, _id, quantity) {
  try {
    const requestCart = await fetch(
      "https://api.everrest.educata.dev/shop/cart/product",
      {
        method: "PATCH",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          id: _id,
          quantity: quantity,
        }),
      }
    );

    const parseRequest = await requestCart.json();
  } catch (error) {}
}

function buildDescription(item) {
  const unfromatedDate = item.issueDate;

  const date = new Date(unfromatedDate);

  const formatedDate = date.toLocaleDateString();

  issueDate.textContent = `Issue date : ${formatedDate}`;
  brandP.textContent = `Brand : ${item.brand}`;
  categoryP.textContent = `category :  ${item.category.name}`;
  descP.textContent = `Description : ${item.description}`;
}

function buildStatic(res) {
  if (res.price.discountPercentage) {
    const discountSpan = document.createElement("span");
    const responsiveSpan = document.createElement("span");
    const currentPrice = document.createElement("h1");

    discountSpan.classList.add("discountSpan");

    discountSpan.textContent = `${res.price.beforeDiscount} ${res.price.currency}`;
    responsiveSpan.textContent = `${res.price.beforeDiscount} ${res.price.currency}`;
    currentPrice.textContent = `${res.price.current} ${res.price.currency}`;

    responsiveSpan.classList.add("discSpan");

    priceResp.textContent = `${res.price.current} ${res.price.currency}`;
    priceResp.appendChild(responsiveSpan);
    priceSide.appendChild(discountSpan);
    priceSide.appendChild(currentPrice);
  } else {
    const currentPrice = document.createElement("h1");
    currentPrice.textContent = `${res.price.current} ${res.price.currency}`;
    priceResp.textContent = `${res.price.current} ${res.price.currency}`;
    priceSide.appendChild(currentPrice);
  }

  stockSpan.textContent = res.stock;
  ratingSpan.textContent = res.rating;
}

function buildSplide(response) {
  if (response.images.length === 0) {
    const mainImgCon = document.createElement("li");
    const mainImg = document.createElement("img");

    mainImg.classList("productPageImg");

    mainImg.src = response.thumbnail;
    mainImgCon.appendChild(mainImg);
    mainPhotos.appendChild(mainImgCon);
  }

  response.images.forEach((element) => {
    const thumbnail = document.createElement("li");
    const thumImage = document.createElement("img");

    thumImage.classList.add("thumbnail");

    thumImage.src = element;
    thumbnail.appendChild(thumImage);
    thumbnails.appendChild(thumbnail);
  });

  response.images.forEach((item) => {
    const mainImgCon = document.createElement("li");
    const mainImg = document.createElement("img");

    mainImgCon.classList.add("splide__slide");

    mainImg.src = item;
    mainImgCon.appendChild(mainImg);
    mainPhotos.appendChild(mainImgCon);
  });
  mountSplider();
}

function mountSplider() {
  const splide = new Splide("#main-carousel", {
    type: "fade",
    focus: "center",
    rewind: true,
    pagination: false,
  });

  splide.on("mounted move", updateActiveThumbnail);

  function updateActiveThumbnail() {
    const thumbnails = document.getElementsByClassName("thumbnail");
    let current = document.querySelector(".thumbnail.is-active");

    if (current) {
      current.classList.remove("is-active");
    }

    const newThumbnail = thumbnails[splide.index];
    if (newThumbnail) {
      newThumbnail.classList.add("is-active");
    }
  }

  const thumbnails = document.getElementsByClassName("thumbnail");
  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener("click", () => splide.go(i));
  }

  splide.mount();
}
