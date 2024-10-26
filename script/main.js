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

init();

// https:api.everrest.educata.dev/shop/products/category/2?page_size=10
const saleContainer = [];

function init() {
  getInfo();

  ScrollReveal().reveal(".salesContainer", {
    distance: "50px",
    origin: "left",
    duration: 1000,
    delay: 200,
    // reset: true,
  });

  ScrollReveal().reveal(".phoneSplide", {
    distance: "50px",
    origin: "right",
    duration: 1000,
    delay: 400,
    // reset: true,
  });
}

function getInfo() {
  fetch(
    "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=50",
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
          buildSaleCard(item);
        }
      });
      res.products.forEach((element) => {
        if (element.category.name === "phones") {
          phoneCard(element);
        }
      });
      mountSplide();
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

function brandNames(name, container) {
  const nameA = document.createElement("a");
  nameA.textContent = name;
  container.appendChild(nameA);
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
  beforeDiscount.textContent = `${ProductPhone.price.beforeDiscount} ${ProductPhone.price.currency}`;
  percentage.textContent = `${ProductPhone.price.discountPercentage}%`;
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
  var splide = new Splide(".splide", {
    perPage: 3,
    gap: "50px",
    type: "loop",
    height: "15rem",
    focus: "center",
    fixedHeight: "300px",
    interval: 2000,
    pauseOnFocus: true,
    loop: true,
    autoplay: true,
    arrows: false,
    autoWidth: true,
    pagination: false,
  });

  splide.mount();

  var phoneSplideMount = new Splide(".phoneSplide", {
    perPage: 3,
    gap: "50px",
    type: "loop",
    height: "15rem",
    focus: "center",
    fixedHeight: "300px",
    interval: 2000,
    pauseOnFocus: true,
    loop: true,
    autoplay: true,
    arrows: false,
    autoWidth: true,
    pagination: false,
  });

  phoneSplideMount.mount();
}

showLaptop.addEventListener("click", function () {
  const laptopCategory = showLaptop.getAttribute("laptopId");
  loadBrands(laptopCategory);
  laptopBrands.classList.toggle("activeBrands");
});

showPhone.addEventListener("click", function () {
  const phoneCategory = showPhone.getAttribute("phoneId");
  loadBrands(phoneCategory);
  phoneBrands.classList.toggle("activeBrands");
});
