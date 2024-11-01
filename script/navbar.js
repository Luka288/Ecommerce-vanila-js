"use strict";
const searchOptions = document.querySelector(".searchOptions");

export function buildNavigation() {
  const navigation = document.getElementById("navigation");

  const logoSide = document.createElement("div");
  const buttonSide = document.createElement("div");
  const logo = document.createElement("a");
  const ulWrapper = document.createElement("ul");
  const burger = document.createElement("i");
  const registerBtn = document.createElement("a");

  const regLogin = document.createElement("ul");
  const wrapInside = document.createElement("li");
  const userIcon = document.createElement("i");
  const authText = document.createElement("p");
  const searchInput = document.createElement("input");
  const searchWrap = document.createElement("form");
  const searchIcon = document.createElement("i");

  let checkSearch = false;

  // for dropdown search
  const empty = document.createElement("h1");
  empty.textContent = "Search Somthing";
  searchOptions.appendChild(empty);

  searchIcon.classList.add("fa-solid", "fa-magnifying-glass", "searchIcon");

  searchWrap.addEventListener("submit", function (e) {
    e.preventDefault();
    const searchValue = searchInput.value;
    if (window.location !== "search.html") {
      window.location = "search.html";
    }
    window.location = `search.html?search=${encodeURIComponent(searchValue)}`;
    console.log(searchValue);
  });

  const bg = document.querySelector(".bg");

  searchInput.addEventListener("keyup", function () {
    searchEngine(this.value);

    if (checkSearch) {
      empty.remove();
    } else {
      searchOptions.appendChild(empty);
    }

    if (this.value === "") {
      searchOptions.innerHTML = "";
      searchOptions.appendChild(empty);
    } else {
      empty.remove();
    }
  });

  empty.addEventListener("click", function (e) {
    console.log("test");
    e.preventDefault();
  });

  searchInput.addEventListener("focus", function () {
    searchOptions.innerHTML = "";

    if (searchInput.value) {
      searchEngine(this.value);
    }

    searchOptions.style.visibility = "visible";
    searchOptions.classList.add("animateHeight");
    bg.classList.add("dark-background");
    searchOptions.appendChild(empty);

    if (!searchOptions.contains(empty)) {
      searchOptions.appendChild(empty);
    }
  });

  searchInput.addEventListener("blur", function () {
    searchOptions.style.visibility = "hidden";
    searchOptions.classList.remove("animateHeight");
    bg.classList.remove("dark-background");

    if (searchOptions.contains(empty)) {
      empty.remove();
    }
  });

  searchOptions.addEventListener("mousedown", function (e) {
    e.stopPropagation();
    e.preventDefault();
  });

  let num = 100;

  if (num > 0) {
    logo.classList.add("logo");
    logo.textContent = "Shop";
    logo.href = "/";

    logoSide.classList.add("logoSide");
    logoSide.appendChild(logo);

    navigation.appendChild(logoSide);

    ulWrapper.classList.add("nav-items");
    burger.classList.add("headerBar", "fa-solid", "fa-bars");

    wrapInside.classList.add("wrapInside");

    regLogin.classList.add("nav-items");
    userIcon.classList.add("fa-regular", "fa-user", "userIcon");
    authText.textContent = "Login";
    authText.classList.add("nav-item");

    registerBtn.classList.add("nav-item");
    registerBtn.textContent = "register";
    registerBtn.href = "auth";

    searchWrap.classList.add("wrapSearch");
    searchInput.classList.add("searchBar");
    searchWrap.appendChild(searchIcon);
    searchWrap.appendChild(searchInput);
    navigation.appendChild(searchWrap);

    buttonSide.classList.add("buttonSide");
    wrapInside.appendChild(userIcon);
    wrapInside.appendChild(authText);
    regLogin.appendChild(wrapInside);
    buttonSide.appendChild(burger);
    buttonSide.appendChild(regLogin);
    navigation.appendChild(buttonSide);

    const burgerBar = document.querySelector(".headerBar");
    const navDropDown = document.querySelector(".navDropdown");

    const dropDonwButtons = document.createElement("div");
    const dropDwonLogin = document.createElement("a");

    dropDonwButtons.classList.add("dropButtons");
    dropDwonLogin.textContent = authText.textContent;

    dropDonwButtons.appendChild(dropDwonLogin);
    navDropDown.appendChild(dropDonwButtons);

    burgerBar.addEventListener("click", function () {
      navDropDown.classList.toggle("active");
      if (burgerBar.classList.contains("fa-bars")) {
        burgerBar.classList.replace("fa-bars", "fa-x");
      } else {
        burgerBar.classList.replace("fa-x", "fa-bars");
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        navDropDown.classList.remove("active");
        burgerBar.classList.replace("fa-x", "fa-bars");
      }
    });
  } else {
  }
}

async function searchEngine(params) {
  if (!params || params.trim() === "") {
    return;
  }

  try {
    const res = await fetch(
      `https://api.everrest.educata.dev/shop/products/search?page_size=50&keywords=${params}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error("Searching error");
    }

    const parseRes = await res.json();

    const filteredItems = parseRes.products.filter((product) =>
      product.title.toLowerCase().includes(params.toLowerCase())
    );

    const ulWrap = document.createElement("ul");
    ulWrap.classList.add("searchItems");

    searchOptions.innerHTML = "";

    filteredItems.forEach((element) => {
      const liParent = document.createElement("li");
      const itemTitle = document.createElement("p");
      const img = document.createElement("img");

      itemTitle.classList.add("searchItemTitle");
      img.classList.add("searchItemImg");
      liParent.classList.add("searchItemsWrap");

      img.src = element.thumbnail;
      itemTitle.textContent = `${element.title}`;

      liParent.appendChild(img);
      liParent.appendChild(itemTitle);
      ulWrap.appendChild(liParent);
    });
    searchOptions.appendChild(ulWrap);
    checkSearch = true;
    console.log(parseRes);
  } catch (error) {}
}

// sort
//https://api.everrest.educata.dev/shop/products/search?page_size=2&page_index=1&sort_by=title&sort_direction=asc&price_min=500&price_max=2000
