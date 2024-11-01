import { buildNavigation } from "./navbar.js";
import { buildResponsiveCategory } from "./category.js";
const countOfProducts = document.querySelector(".countOfProducts");
const foundCard = document.querySelector(".foundCard");
const title = document.querySelector("title");
let searchWord = "";

let currPage = 1;
let total;
let pages;

init();

function init() {
  buildNavigation();
  getSearchVal();
  buildResponsiveCategory();
}

function getSearchVal() {
  const searchValue = new URLSearchParams(window.location.search);
  const parsedValue = searchValue.get("search");

  searchWord = parsedValue;
  loadProducts(parsedValue);
}

async function loadProducts(searchQuery) {
  try {
    const res = await fetch(
      `https://api.everrest.educata.dev/shop/products/search?keywords=${searchQuery}&page_size=15`
    );

    if (!res.ok) {
      throw new Error("Error");
    }

    const parseRes = await res.json();

    title.textContent = `Search Results ${searchQuery}`;

    paginator(parseRes);

    generateCard(parseRes.products);
    foundItems(parseRes.products);

    console.log(parseRes);
  } catch (error) {}
}

function paginator(res) {
  currPage = res.page;
  total = res.total;
  pages = Math.ceil(total / res.limit);

  for (let i = 1; i <= pages; i++) {
    console.log(i);
  }
}

function generateCard(response) {
  response.forEach((element) => {
    const productCard = document.createElement("div");
    const imageContainer = document.createElement("div");
    const image = document.createElement("img");
    const priceContainer = document.createElement("div");
    const priceP = document.createElement("p");
    const titleContainer = document.createElement("div");
    const productT = document.createElement("p");
    const saleSpan = document.createElement("span");

    productCard.classList.add("searchedItem");
    imageContainer.classList.add("productImg");
    priceContainer.classList.add("priceContainer");
    productT.classList.add("productTitle");
    productT.classList.add("productTitle");

    image.src = element.thumbnail;

    if (element.price.discountPercentage) {
      saleSpan.textContent = `${element.price.beforeDiscount}${element.price.currency}`;
      priceP.textContent = `${element.price.current} ${element.price.currency}`;

      priceContainer.appendChild(saleSpan);
      priceContainer.appendChild(priceP);
    } else {
      priceP.textContent = `${element.price.current} ${element.price.currency}`;
      priceContainer.appendChild(priceP);
    }
    productT.textContent = element.title;

    imageContainer.appendChild(image);
    titleContainer.appendChild(productT);

    productCard.appendChild(imageContainer);
    productCard.appendChild(titleContainer);
    productCard.appendChild(priceContainer);

    foundCard.appendChild(productCard);
  });
}

function foundItems(items) {
  const searchedProduct = [...items];

  const textForLength = document.createElement("h1");

  const searchSpan = document.createElement("span");

  textForLength.classList.add("foundCounter");
  searchSpan.classList.add("searchWord");

  searchSpan.textContent = searchWord;

  textForLength.appendChild(
    document.createTextNode(`${searchedProduct.length} products found for `)
  );
  textForLength.appendChild(searchSpan);

  countOfProducts.appendChild(textForLength);
}

// example search https://api.everrest.educata.dev/shop/products/search?brand=apple&page_size=1
