const arrow = document.querySelectorAll(".arrow");
const carusel = document.querySelector(".carusel");
const categories = document.querySelector(".categories");

init();

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
    .then((res) => {
      console.log(res);
    })
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
    .then((res) => {
      res.forEach((lis) => {
        const li = document.createElement("li");
        const categoryBtn = document.createElement("a");
        const dropI = document.createElement("i");

        categoryBtn.addEventListener("click", function () {
          if (dropI.classList.contains("fa-chevron-down")) {
            dropI.classList.replace("fa-chevron-down", "fa-chevron-up");
            li.style.height = "150px";
          } else {
            dropI.classList.replace("fa-chevron-up", "fa-chevron-down");
            li.style.height = "auto";
          }
        });

        // <i class="fa-solid fa-chevron-down"></i>
        dropI.classList.add("fa-solid", "fa-chevron-down");
        li.classList.add("categoryLi");
        categoryBtn.classList.add("categoryBtn");
        categoryBtn.innerText = lis.name;
        categoryBtn.appendChild(dropI);
        li.appendChild(categoryBtn);
        categories.appendChild(li);
      });
    });
}

arrow.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (btn.classList.contains("fa-circle-left")) {
      carusel.scrollBy({ left: -350, behavior: "smooth" });
    } else {
      carusel.scrollBy({ left: 350, behavior: "smooth" });
    }
  });
});
