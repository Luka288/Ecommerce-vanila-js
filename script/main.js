"use strict";
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
  getInfo();
  // pagination();
  mountSplide();
}

function getInfo() {
  fetch(
    `https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=10`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }

      return res.json();
    })
    .then((res) => {
      res.products.forEach((item) => {
        if (item.price.discountPercentage) {
          // buildSaleCard(item);
        }
      });
      // res.products.forEach((element) => {
      //   if (element.category.name === "phones") {
      //     phoneCard(element);
      //   }
      // });
      // mountSplide();
    })
    .catch((err) => {
      console.log(err);
    });
}

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

async function pagination() {
  try {
    const res = await fetch(
      `https://api.everrest.educata.dev/shop/products/all?page_index=${currPage}&page_size=10`
    );

    if (!res.ok) {
      throw new Error("Error");
    }

    const parseRes = await res.json();

    parseRes.products.forEach((item) => {
      // productCard(item);
    });

    totalProducts = parseRes.total;
    pages = Math.ceil(totalProducts / parseRes.limit);

    const pagesUl = document.createElement("ul");
    for (let i = 1; i <= pages; i++) {
      const pageLi = document.createElement("li");

      pagesUl.classList.add("wrapPages");
      pageLi.classList.add("paginationPage");

      pageLi.textContent = i;
      pageLi.value = i;

      pagesUl.appendChild(pageLi);
      paginator.appendChild(pagesUl);
      console.log(i);
    }

    console.log(pages);
  } catch (err) {
    console.log(err);
  }
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

  topSplide.mount();
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

// showPhone.addEventListener("mouseout", function () {
//   const phoneCategory = showPhone.getAttribute("phoneId");
//   loadBrands(phoneCategory);
//   phoneBrands.classList.remove("activeBrands");
// });
