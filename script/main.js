const arrow = document.querySelectorAll(".arrow");
const carusel = document.querySelector(".carusel");
const categories = document.querySelector(".categories");
const dropBrands = document.querySelector(".categoryBtn");
const forPhones = document.querySelector("#forPhones");
const forLaptops = document.querySelector("#forLaptops");
const DropDownForLaptop = document.querySelector(".categoryDiv");
const laptopBrands = document.getElementById("laptopBrands");
const phoneBrands = document.getElementById("phoneBrands");
const laptopBtn = document.querySelector(".laptopBtn");
const phoneBtn = document.querySelector(".phoneBtn");

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
    .then((res) => {});
}

buildCategori();

async function buildCategori() {
  const res = await fetch(
    "https://api.everrest.educata.dev/shop/products/categories"
  );
  const parseRes = await res.json();

  const li = document.querySelectorAll(".categoryLi");

  // parseRes.forEach((categoriID, index) => {
  //   if (li[index]) {
  //     li[index].setAttribute("category", `${categoriID.id}`);
  //     console.log(categoriID);
  //   }
  // });

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
function specificCategory(categoryId) {
  fetch(
    `https:api.everrest.educata.dev/shop/products/category/${categoryId}?page_size=10`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error");
      }
      return res.json();
    })
    .then((res) => {
      loadBrands(res, categoryId);
    });
}

function loadBrands(res, id) {
  const brands = res.products.map((element) => element.brand);

  const checkDuplicates = brands.filter(
    (brand, index, self) => self.indexOf(brand) === index
  );

  checkDuplicates.forEach((el) => {
    const p = document.createElement("p");
    p.classList.add("brandBtn");
    p.innerText = el;
    if (id == 1) {
      phoneBrands.appendChild(p);
    } else {
      laptopBrands.appendChild(p);
    }
  });

  console.log(checkDuplicates);
}

phoneBtn.addEventListener("click", function (e) {
  const id = forPhones.getAttribute("category");
  if (!forPhones.classList.contains("expanded")) {
    forPhones.classList.add("expanded");
    phoneBrands.style.display = "block";
  } else {
    forPhones.classList.remove("expanded");
    // phoneBrands.innerHTML = "";
    phoneBrands.style.display = "none";
    return;
  }

  if (phoneBrands.children.length === 0) {
    specificCategory(id);
  }
});

laptopBtn.addEventListener("click", function (e) {
  const id = forLaptops.getAttribute("category");
  if (!forLaptops.classList.contains("expanded")) {
    forLaptops.classList.add("expanded");
    laptopBrands.style.display = "block";
  } else {
    forLaptops.classList.remove("expanded");
    // laptopBrands.innerHTML = "";
    laptopBrands.style.display = "none";
    return;
  }
  if (laptopBrands.children.length === 0) {
    specificCategory(id);
  }
});

arrow.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (btn.classList.contains("fa-circle-left")) {
      carusel.scrollBy({ left: -350, behavior: "smooth" });
    } else {
      carusel.scrollBy({ left: 350, behavior: "smooth" });
    }
  });
});
