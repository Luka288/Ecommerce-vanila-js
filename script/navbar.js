"use strict";

const navigation = document.getElementById("navigation");

function buildNavigation() {
  const logoSide = document.createElement("div");
  const buttonSide = document.createElement("div");
  const logo = document.createElement("a");
  const ulWrapper = document.createElement("ul");
  const burger = document.createElement("i");
  const loginBtn = document.createElement("a");
  const registerBtn = document.createElement("a");
  const loginLi = document.createElement("li");
  const regLi = document.createElement("li");

  const regLogin = document.createElement("ul");
  const wrapInside = document.createElement("li");
  const userIcon = document.createElement("i");
  const authText = document.createElement("p");
  const searchInput = document.createElement("input");
  const searchWrap = document.createElement("form");
  const searchIcon = document.createElement("i");

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

  let num = 100;

  if (num > 0) {
    // build logo side
    logo.classList.add("logo");
    logo.textContent = "Shop";
    logo.href = "/";

    logoSide.classList.add("logoSide");
    logoSide.appendChild(logo);

    navigation.appendChild(logoSide);

    // building buttons side
    ulWrapper.classList.add("nav-items");
    burger.classList.add("headerBar", "fa-solid", "fa-bars");

    wrapInside.classList.add("wrapInside");
    // loginBtn.classList.add("nav-item");
    // loginBtn.textContent = "login";
    // loginBtn.href = "auth";

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

buildNavigation();

// sort
//https://api.everrest.educata.dev/shop/products/search?page_size=2&page_index=1&sort_by=title&sort_direction=asc&price_min=500&price_max=2000
