import { buildNavigation } from "./navbar.js";

const thumbnails = document.getElementById("thumbnails");
const mainPhotos = document.querySelector(".mainPhotos");

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
    buildSplide(parseItem.images);

    console.log(parseItem);
  } catch (error) {
    console.log(error);
  }
}

function buildSplide(response) {
  response.forEach((element) => {
    const thumbnail = document.createElement("li");
    const thumImage = document.createElement("img");

    thumImage.classList.add("thumbnail");

    thumImage.src = element;
    thumbnail.appendChild(thumImage);
    thumbnails.appendChild(thumbnail);
  });

  response.forEach((item) => {
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
