const arrow = document.querySelectorAll(".arrow");
const carusel = document.querySelector(".carusel");

arrow.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (btn.classList.contains("fa-circle-left")) {
      carusel.scrollBy({ left: -350, behavior: "smooth" });
    } else {
      carusel.scrollBy({ left: 350, behavior: "smooth" });
    }
  });
});

function loadProducts() {
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
    })
    .catch((err) => {
      console.log(err);
    });
}

loadProducts();
