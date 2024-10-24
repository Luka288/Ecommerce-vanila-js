const arrow = document.querySelectorAll(".arrow");
const carusel = document.querySelector(".carusel");
const categories = document.querySelector(".categories");
const dropBrands = document.querySelector(".categoryBtn");

init();

// fetch(
//   "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=50"
// )
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res);
//   });

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
    .then((res) => {
      // console.log(res);
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
            li.classList.add("expanded");
          } else {
            dropI.classList.replace("fa-chevron-up", "fa-chevron-down");
            li.classList.remove("expanded");
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

buildCategori();

async function buildCategori() {
  const res = await fetch(
    "https://api.everrest.educata.dev/shop/products/categories"
  );
  const parseRes = await res.json();

  const li = document.querySelectorAll(".categoryLi");

  parseRes.forEach((categoriID, index) => {
    if (li[index]) {
      li[index].setAttribute("category", `${categoriID.id}`);
      console.log(categoriID);
    }
  });

  li.forEach((btn) => {
    btn.addEventListener("click", function () {
      const categoryid = btn.getAttribute("category");
      if (btn.classList.contains("expanded")) {
        const categoriItem = document.createElement("p");
        specificInfo(
          `https://api.everrest.educata.dev/shop/products/category/${categoryid}?page_size=10`,
          function (res) {
            const brands = res.products.map((element) => element.brand);

            const checkDuplicates = brands.filter(
              (brand, index, self) => self.indexOf(brand) === index
            );

            console.log(checkDuplicates);
          }
        );
      }
    });
  });
}
function specificInfo(url, callBack) {
  fetch(url, {
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error");
      }
      return res.json();
    })
    .then((res) => {
      callBack(res);
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
