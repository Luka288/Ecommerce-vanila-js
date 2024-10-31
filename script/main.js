"use strict";
import { buildNavigation } from "./navbar.js";

const arrow = document.querySelectorAll(".arrow");
const carusel = document.querySelector(".carusel");
const splideList = document.querySelector(".splide__list");
const phoneSplider = document.querySelector(".phoneSplide");
const phonesList = document.querySelector(".phonesList");
const showLaptop = document.querySelector(".showLaptop");
const showPhone = document.querySelector(".showPhone");
const phoneBrands = document.querySelector(".phoneBrands");
const laptopBrands = document.querySelector(".laptopBrands");
const mainProducts = document.querySelector(".productsWrap");
const paginator = document.querySelector(".paginator");
const activeBrands = document.querySelector(".activeBrands");
const category = document.querySelector(".category");
const appleProducts = document.querySelector(".appleProducts");
const appleSide = document.getElementById("appleSide");
const asusSide = document.getElementById("asusSide");
const samsungSide = document.getElementById("samsungSide");
const lenovoSide = document.getElementById("lenovoSide");
const brandUl = document.querySelector(".brandUl");

let currPage = 1;
let totalProducts;
let pages;

const slides = {
  name: "",
  id: 0,
  url: "",
};

init();

// https:api.everrest.educata.dev/shop/products/category/2?page_size=10

function init() {
  buildNavigation();
  mountSplide();
  brandService();
}

function generateCard(item, parent) {
  const li = document.createElement("li");

  const productCard = document.createElement("div");
  const imgDiv = document.createElement("div");
  const img = document.createElement("img");
  const priceCon = document.createElement("div");
  const price = document.createElement("p");
  const titleCon = document.createElement("div");
  const titleP = document.createElement("p");
  const buttonCon = document.createElement("div");
  const btnUl = document.createElement("ul");
  const btnLi = document.createElement("li");
  const button = document.createElement("a");
  const span = document.createElement("span");

  imgDiv.classList.add("productImg");
  li.classList.add("splide__slide", "bottomSplide");
  productCard.classList.add("productCard");

  img.src = item.thumbnail;
  if (item.price.discountPercentage) {
    span.textContent = `${item.price.beforeDiscount} ${item.price.currency}`;
    price.textContent = `${item.price.current} ${item.price.currency}`;
  } else {
    price.textContent = `${item.price.current} ${item.price.currency}`;
  }

  priceCon.classList.add("priceContainer");
  btnLi.classList.add("viewProductLi");
  btnUl.classList.add("viewProductUl");
  titleP.classList.add("productTitle");
  button.classList.add("viewProduct");
  titleP.textContent = item.title;
  button.textContent = "View product";

  imgDiv.appendChild(img);
  productCard.appendChild(imgDiv);
  if (item.price.discountPercentage) {
    priceCon.appendChild(span);
  }
  priceCon.appendChild(price);
  productCard.appendChild(priceCon);
  titleCon.appendChild(titleP);
  productCard.appendChild(titleCon);
  btnLi.appendChild(button);
  btnUl.appendChild(btnLi);
  buttonCon.appendChild(btnUl);
  productCard.appendChild(buttonCon);

  li.appendChild(productCard);
  parent.appendChild(li);
}

async function getTopic(brand, callback) {
  try {
    const res = await fetch(
      `https://api.everrest.educata.dev/shop/products/brand/${brand}?page_size=7`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error("Somthing worng happned");
    }

    const parseInfo = await res.json();

    callback(parseInfo.products);
  } catch (error) {}
}

async function brandService() {
  try {
    const icons = await fetch(
      "https://api.everrest.educata.dev/shop/products/brands"
    );

    if (!icons.ok) {
      throw new Error("Error");
    }

    const parseIcons = await icons.json();

    parseIcons.forEach((icon) => {
      iconService(icon);
    });
  } catch (error) {}
}

async function iconService(params) {
  const icons = [];
  try {
    const icon = `https://logo.clearbit.com/${params}.com`;
    icons.push(icon);

    icons.forEach((item) => {
      const li = document.createElement("li");
      const image = document.createElement("img");

      image.src = item;

      image.classList.add("brandIcon");
      li.classList.add("splide__slide", "controlIcons");

      li.appendChild(image);
      brandUl.appendChild(li);
    });
  } catch (error) {
    console.log(err);
  }
}

getTopic("apple", function (res) {
  res.forEach((item) => {
    generateCard(item, appleSide);
  });
  mountSplide();
});

getTopic("asus", function (res) {
  res.forEach((item) => {
    generateCard(item, asusSide);
  });
  mountSplide();
});

getTopic("samsung", function (res) {
  res.forEach((item) => {
    generateCard(item, samsungSide);
  });
  mountSplide();
});

getTopic("lenovo", function (res) {
  res.forEach((item) => {
    generateCard(item, lenovoSide);
  });

  mountSplide();
});

async function loadBrands(categoryID) {
  try {
    const response = await fetch(
      `https://api.everrest.educata.dev/shop/products/category/${categoryID}?page_size=50`
    );

    if (!response.ok) {
      throw new Error("Error");
    }

    const parseResponse = await response.json();
    console.log(parseResponse);

    const phoneBrand = parseResponse.products
      .filter((product) => product.category.name === "phones")
      .map((product) => product.brand)
      .filter((brand, index, self) => self.indexOf(brand) === index);

    const laptopBrand = parseResponse.products
      .filter((product) => product.category.name === "laptops")
      .map((brandName) => brandName.brand)
      .filter((brand, index, self) => self.indexOf(brand) === index);

    laptopBrand.forEach((eachBrand) => {
      brandNames(eachBrand, laptopBrands);
    });

    phoneBrand.forEach((eachBrand) => {
      brandNames(eachBrand, phoneBrands);
    });
  } catch (err) {
    console.log(err);
  }
}

function mountSplide() {
  var topSplide = new Splide(".topSplide", {
    focus: "center",
    type: "fade",
    interval: 1000,
    pagination: false,
    autoPlay: true,
    loop: true,
    rewind: true,
  });

  var productSplide = new Splide(".productSplider", {
    focus: "right",
    type: "loop",
    pagination: false,
    perPage: 4,
    perMove: 1,
    breakpoints: {
      1024: {
        focus: "center",
        perPage: 2,
      },

      425: {
        focus: "left",
        perPage: 1,
      },
    },
  });

  var asusSplider = new Splide(".asusSplider", {
    focus: "right",
    type: "loop",
    pagination: false,
    perPage: 4,
    perMove: 1,
    breakpoints: {
      1024: {
        focus: "center",
        perPage: 2,
      },

      425: {
        focus: "left",
        perPage: 1,
      },
    },
  });

  var samsungSplider = new Splide(".samsungSplide", {
    focus: "right",
    type: "loop",
    pagination: false,
    perPage: 4,
    perMove: 1,
    breakpoints: {
      1024: {
        focus: "center",
        perPage: 2,
      },

      425: {
        focus: "left",
        perPage: 1,
      },
    },
  });

  var lenovoSplider = new Splide(".lenovoSplider", {
    focus: "right",
    type: "loop",
    pagination: false,
    perPage: 4,
    perMove: 1,
    breakpoints: {
      1024: {
        focus: "center",
        perPage: 2,
      },

      425: {
        focus: "left",
        perPage: 1,
      },
    },
  });

  var brandSplider = new Splide(".brandsSplider", {
    type: "loop",
    drag: "free",
    focus: "center",
    perPage: 3,
    autoScroll: {
      speed: 1,
    },
  });

  brandSplider.mount();
  lenovoSplider.mount();
  samsungSplider.mount();
  asusSplider.mount();
  productSplide.mount();
  topSplide.mount();
}

function brandNames(name, container) {
  const nameA = document.createElement("a");
  nameA.textContent = name;
  container.appendChild(nameA);
}

function productCard(product) {
  const productCard = document.createElement("div");
  const productImage = document.createElement("div");
  const img = document.createElement("img");
  const productTitle = document.createElement("h1");
  const productPriceWrap = document.createElement("div");
  const priceSpan = document.createElement("span");
  const currPrice = document.createElement("p");
  const salePercent = document.createElement("p");
  const paginator = document.querySelector("div");

  priceSpan.classList.add("priceSpan");
  salePercent.classList.add("discountPercent");
  productCard.classList.add("productCard");
  productImage.classList.add("productImage");
  productTitle.classList.add("productTitle");
  productPriceWrap.classList.add("priceWrap");
  currPrice.classList.add("currentPrice");

  if (product.price.discountPercentage) {
    salePercent.textContent = `${product.price.discountPercentage}%`;
    priceSpan.textContent = `${product.price.beforeDiscount}${product.price.currency}`;
    productPriceWrap.appendChild(priceSpan);
  }
  img.src = product.thumbnail;
  productTitle.textContent = product.title;
  currPrice.textContent = `${product.price.current} ${product.price.currency}`;

  priceSpan.appendChild(salePercent);
  productImage.appendChild(img);
  productPriceWrap.appendChild(currPrice);
  productCard.appendChild(productImage);
  productCard.appendChild(productTitle);
  productCard.appendChild(productPriceWrap);

  mainProducts.appendChild(productCard);
}

function buildSaleCard(saleItem) {
  const saleCard = document.createElement("div");
  const imgContainer = document.createElement("div");
  const image = document.createElement("img");
  const titleP = document.createElement("p");
  const priceContainer = document.createElement("div");
  const priceP = document.createElement("p");
  const beforeDiscount = document.createElement("p");
  const discPercentage = document.createElement("p");
  const wrapSpan = document.createElement("span");

  const splideSlide = document.createElement("li");
  splideSlide.classList.add("splide__slide");

  saleCard.classList.add("saleCard");
  imgContainer.classList.add("imgContainer");
  titleP.classList.add("productName");
  priceContainer.classList.add("salePriceWrap");
  beforeDiscount.classList.add("beforeDiscount");
  discPercentage.classList.add("discountPercentage");
  wrapSpan.classList.add("wrapPrices");

  image.src = saleItem.thumbnail;
  titleP.textContent = saleItem.title;
  beforeDiscount.textContent = `${saleItem.price.beforeDiscount}${saleItem.price.currency}`;
  discPercentage.textContent = `${saleItem.price.discountPercentage}%`;
  priceP.textContent = `${saleItem.price.current} ${saleItem.price.currency}`;

  imgContainer.appendChild(image);
  saleCard.appendChild(imgContainer);
  saleCard.appendChild(titleP);
  wrapSpan.appendChild(beforeDiscount);
  wrapSpan.appendChild(discPercentage);
  priceContainer.appendChild(wrapSpan);
  priceContainer.appendChild(priceP);
  saleCard.appendChild(priceContainer);
  splideSlide.appendChild(saleCard);
  splideList.appendChild(splideSlide);
}

function phoneCard(ProductPhone) {
  const div = document.createElement("div");
  const imgContainer = document.createElement("div");
  const image = document.createElement("img");
  const titleP = document.createElement("p");
  const priceSpan = document.createElement("span");
  const beforeDiscount = document.createElement("p");
  const percentage = document.createElement("p");
  const price = document.createElement("p");

  div.classList.add("phone-card");
  imgContainer.classList.add("imgContainer");
  titleP.classList.add("productName");
  priceSpan.classList.add("wrapPrices");
  beforeDiscount.classList.add("beforeDiscount");
  percentage.classList.add("discountPercentage");

  const phoneSplide = document.createElement("li");
  phoneSplide.classList.add("splide__slide");

  image.src = ProductPhone.thumbnail;
  titleP.textContent = ProductPhone.title;
  if (ProductPhone.price.discountPercentage) {
    beforeDiscount.textContent = `${ProductPhone.price.beforeDiscount} ${ProductPhone.price.currency}`;
    percentage.textContent = `${ProductPhone.price.discountPercentage}%`;
  }
  price.textContent = `${ProductPhone.price.current} ${ProductPhone.price.currency}`;

  imgContainer.appendChild(image);
  priceSpan.appendChild(beforeDiscount);
  priceSpan.appendChild(percentage);
  priceSpan.appendChild(price);

  div.appendChild(imgContainer);
  div.appendChild(priceSpan);

  phoneSplide.appendChild(div);
  phonesList.appendChild(phoneSplide);
}

// laptop category
showLaptop.addEventListener("mouseover", function () {
  const laptopCategory = showLaptop.getAttribute("laptopId");
  if (laptopBrands.children.length == 0) {
    loadBrands(laptopCategory, laptopBrands);
  }
  laptopBrands.classList.add("activeBrands");
  category.style.borderTopRightRadius = "0px";
  category.style.borderBottomRightRadius = "0px";
});

showLaptop.addEventListener("mouseout", function () {
  laptopBrands.classList.remove("activeBrands");
  category.style.borderTopRightRadius = "10px";
  category.style.borderBottomRightRadius = "10px";
});

laptopBrands.addEventListener("mouseover", function () {
  laptopBrands.classList.add("activeBrands");
  category.style.borderTopRightRadius = "0px";
  category.style.borderBottomRightRadius = "0px";
});

laptopBrands.addEventListener("mouseout", function () {
  laptopBrands.classList.remove("activeBrands");
  category.style.borderTopRightRadius = "10px";
  category.style.borderBottomRightRadius = "10px";
});

// phone category
showPhone.addEventListener("mouseover", function () {
  const phoneCategory = showPhone.getAttribute("phoneId");
  if (phoneBrands.children.length == 0) {
    loadBrands(phoneCategory, laptopBrands);
  }
  phoneBrands.classList.add("activeBrands");
  category.style.borderTopRightRadius = "0px";
  category.style.borderBottomRightRadius = "0px";
});

showPhone.addEventListener("mouseout", function () {
  phoneBrands.classList.remove("activeBrands");
  category.style.borderTopRightRadius = "10px";
  category.style.borderBottomRightRadius = "10px";
});

phoneBrands.addEventListener("mouseover", function () {
  phoneBrands.classList.add("activeBrands");
  category.style.borderTopRightRadius = "0px";
  category.style.borderBottomRightRadius = "0px";
});

phoneBrands.addEventListener("mouseout", function () {
  phoneBrands.classList.remove("activeBrands");
  category.style.borderTopRightRadius = "10px";
  category.style.borderBottomRightRadius = "10px";
});
