"use strict";
import { buildNavigation } from "./navbar.js";
import { buildResponsiveCategory } from "./category.js";

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
  buildResponsiveCategory();
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
  img.alt = item.title;
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

    const storage = localStorage.getItem("brandName");

    parseIcons.forEach((brand) => {
      if (!storage) {
        saveTolocal(brand);
      }
      iconService(brand);
    });
  } catch (error) {}
}

function saveTolocal(param) {
  const storage = JSON.parse(localStorage.getItem("brandName")) || [];
  localStorage.setItem("brandName", JSON.stringify([...storage, param]));
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
