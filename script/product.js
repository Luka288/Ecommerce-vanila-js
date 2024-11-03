import { buildNavigation } from "./navbar.js";

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

init();

function init() {
  buildNavigation();
  specificProdFromUrl();
  mountSplider();
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

    // test.src = parseItem.thumbnail;

    buildSplide(parseItem);
    buildStatic(parseItem);
    console.log(parseItem);

    // console.log(parseItem);
  } catch (error) {
    console.log(error);
  }
}

function buildStatic(res) {
  if (res.price.discountPercentage) {
    const discountSpan = document.createElement("span");
    const currentPrice = document.createElement("h1");

    discountSpan.classList.add("discountSpan");

    discountSpan.textContent = `${res.price.beforeDiscount} ${res.price.currency}`;
    currentPrice.textContent = `${res.price.current} ${res.price.currency}`;
    priceSide.appendChild(discountSpan);
    priceSide.appendChild(currentPrice);
  } else {
    const currentPrice = document.createElement("h1");
    currentPrice.textContent = `${res.price.current} ${res.price.currency}`;
    priceSide.appendChild(currentPrice);
  }

  stockSpan.textContent = res.stock;
  ratingSpan.textContent = res.rating;
}

function buildSplide(response) {
  if (response.images.length === 0) {
    const mainImgCon = document.createElement("li");
    const mainImg = document.createElement("img");

    mainImg.src = response.thumbnail;
    console.log(response);
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
