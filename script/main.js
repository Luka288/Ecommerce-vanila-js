"use strict";
const arrow = document.querySelectorAll(".arrow");
const carusel = document.querySelector(".carusel");
const splideList = document.querySelector(".splide__list");

init();

// https:api.everrest.educata.dev/shop/products/category/2?page_size=10
const saleContainer = [];

function init() {
  getInfo();
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
      console.log(res);
      res.products.forEach((item) => {
        if (item.price.discountPercentage) {
          buildSaleCard(item);
        }
      });
      mountSplide();
    })
    .catch((err) => {
      console.log(err);
    });
}

function buildSaleCard(saleItem) {
  const saleCard = document.createElement("div");
  const imgContainer = document.createElement("div");
  const image = document.createElement("img");
  const titleP = document.createElement("p");
  const priceContainer = document.createElement("div");
  const priceP = document.createElement("p");
  const beforeDiscount = document.createElement("p");

  const splideSlide = document.createElement("li");
  splideSlide.classList.add("splide__slide");

  saleCard.classList.add("saleCard");
  imgContainer.classList.add("imgContainer");
  titleP.classList.add("productName");
  priceContainer.classList.add("salePriceWrap");
  beforeDiscount.classList.add("beforeDiscount");

  image.src = saleItem.thumbnail;
  titleP.textContent = saleItem.title;
  beforeDiscount.textContent = saleItem.price.beforeDiscount;
  priceP.textContent = `${saleItem.price.current} ${saleItem.price.currency}`;

  imgContainer.appendChild(image);
  saleCard.appendChild(imgContainer);
  saleCard.appendChild(titleP);
  // priceContainer.appendChild(beforeDiscount);
  priceContainer.appendChild(priceP);
  saleCard.appendChild(priceContainer);
  splideSlide.appendChild(saleCard);
  splideList.appendChild(splideSlide);
}
function mountSplide() {
  var splide = new Splide(".splide", {
    perPage: 3,
    gap: "50px",
    type: "loop",
    height: "15rem",
    focus: "center",
    fixedHeight: "300px",
    interval: 1500,
    pauseOnFocus: true,
    loop: true,
    autoplay: true,
    arrows: true,
    autoWidth: true,
  });

  splide.mount(); // Keep this line
}
