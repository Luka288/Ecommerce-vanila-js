const arrow = document.querySelectorAll(".arrow");
const carusel = document.querySelector(".carusel");

init();

// https:api.everrest.educata.dev/shop/products/category/2?page_size=10

function init() {
  getInfo();
  getCategories();
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
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
}

function getCategories() {
  fetch("https://api.everrest.educata.dev/shop/products/categories", {
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Somthing went wrong");
      }
      return res.json();
    })
    .then((res) => {});
}
