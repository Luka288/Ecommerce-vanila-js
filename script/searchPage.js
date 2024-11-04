import { buildNavigation } from "./navbar.js";
import { buildResponsiveCategory } from "./category.js";
const countOfProducts = document.querySelector(".countOfProducts");
const foundCard = document.querySelector(".foundCard");
const title = document.querySelector("title");
const pageWrapper = document.querySelector(".pageWrapper");
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

async function loadProducts(searchQuery, page = currPage) {
  try {
    const res = await fetch(
      `https://api.everrest.educata.dev/shop/products/search?keywords=${searchQuery}&page_index=${page}&page_size=15`
    );

    if (!res.ok) {
      throw new Error("Error");
    }

    const parseRes = await res.json();
    currPage = parseRes.page;

    title.textContent = `Search Results ${searchQuery}`;

    paginator(parseRes);

    generateCard(parseRes.products);
    foundItems(parseRes.products);

    console.log(parseRes);
  } catch (error) {}
}

function paginator(res) {
  countOfProducts.innerHTML = "";
  pageWrapper.innerHTML = "";
  foundCard.innerHTML = "";
  currPage = res.page;
  total = res.total;
  pages = Math.ceil(total / res.limit);

  for (let i = 1; i <= pages; i++) {
    const lipage = document.createElement("li");
    lipage.classList.add("lipage");

    lipage.value = i;
    lipage.textContent = `${i}`;

    if (lipage.value === currPage) {
      lipage.style.backgroundColor = "var(--main-color)";
    }

    lipage.addEventListener("click", function () {
      currPage = lipage.value;
      console.log(currPage);
      loadProducts(searchWord, currPage);
    });

    pageWrapper.appendChild(lipage);
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

    const viewProduct = document.createElement("div");
    const viewProductUl = document.createElement("ul");
    const viewProductLi = document.createElement("li");
    const viewProductA = document.createElement("a");

    viewProductUl.classList.add("viewProductUl", "searchPageUl");
    viewProductLi.classList.add("viewProductLi", "searchPageLi");
    viewProductA.classList.add("viewProduct", "searchPageA");

    viewProductA.textContent = "View product";

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

    viewProductLi.appendChild(viewProductA);
    viewProductUl.appendChild(viewProductLi);
    viewProduct.appendChild(viewProductUl);
    productCard.appendChild(imageContainer);
    productCard.appendChild(titleContainer);
    productCard.appendChild(priceContainer);
    productCard.appendChild(viewProduct);

    foundCard.appendChild(productCard);

    viewProductA.setAttribute("product-id", element._id);

    viewProductA.addEventListener("click", function () {
      const productId = viewProductA.getAttribute("product-id");

      window.location.href = `/product.html?product_id=${productId}`;
    });
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
