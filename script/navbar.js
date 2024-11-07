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
  empty.textContent = "Search Something";
  searchOptions.appendChild(empty);

  searchIcon.classList.add("fa-solid", "fa-magnifying-glass", "searchIcon");

  searchWrap.addEventListener("submit", function (e) {
    e.preventDefault();
    const searchValue = searchInput.value;
    if (window.location !== "search.html") {
      window.location = "search.html";
    }
    window.location = `search.html?search=${encodeURIComponent(searchValue)}`;
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

  const userSessionRefresh = sessionStorage.getItem("refresh_token");
  const userSessionAccess = sessionStorage.getItem("access_token");

  if (
    (Cookies.get("refresh_token") && Cookies.get("access_token")) ||
    (userSessionAccess && userSessionRefresh)
  ) {
    const buttonsUl = document.createElement("ul");
    const profileLi = document.createElement("li");
    const profileIcon = document.createElement("i");
    const profileT = document.createElement("a");
    const logOut = document.createElement("li");
    const logutA = document.createElement("a");

    logo.classList.add("logo");
    logo.textContent = "Shop";
    logo.href = "/";

    profileLi.classList.add("nav-items", "profile", "wrapLis");
    profileIcon.classList.add("fa-solid", "fa-user");
    profileT.classList.add("profileT");
    logOut.classList.add("nav-items", "wrapLis", "logoutItem");

    profileT.textContent = "Profile";
    logutA.textContent = "log out";

    profileT.href = "/profile.html";

    logoSide.classList.add("logoSide");
    logoSide.appendChild(logo);

    navigation.appendChild(logoSide);

    burger.classList.add("headerBar", "fa-solid", "fa-bars");
    buttonsUl.classList.add("wrapNavA");
    searchWrap.classList.add("wrapSearch");
    searchInput.classList.add("searchBar");

    searchWrap.appendChild(searchIcon);
    searchWrap.appendChild(searchInput);
    navigation.appendChild(searchWrap);

    profileLi.appendChild(profileIcon);
    profileLi.appendChild(profileT);

    logOut.appendChild(logutA);
    buttonsUl.appendChild(logOut);
    buttonsUl.appendChild(profileLi);
    navigation.appendChild(buttonsUl);

    buttonsUl.appendChild(burger);

    const burgerBar = document.querySelector(".headerBar");
    const navDropDown = document.querySelector(".navDropdown");

    const dropDonwButtons = document.createElement("div");
    const dropDownProfile = document.createElement("a");
    const dropDownLogut = document.createElement("a");

    dropDonwButtons.classList.add("dropButtons");
    dropDownProfile.textContent = profileT.textContent;
    dropDownLogut.textContent = logOut.textContent;

    dropDownLogut.classList.add("logoutItem");

    dropDonwButtons.appendChild(dropDownLogut);
    dropDonwButtons.appendChild(dropDownProfile);
    navDropDown.appendChild(dropDonwButtons);

    searchIcon.addEventListener("click", function () {
      if (searchInput.value) {
        window.location.href = `/search.html?search=${searchInput.value}`;
      }
    });

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

    const logoutItem = document.querySelectorAll(".logoutItem");

    logoutItem.forEach((item) => {
      item.addEventListener("click", function () {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        window.location.reload();
        window.location.href = "/";
      });
    });
  } else {
    logo.classList.add("logo");
    logo.textContent = "Shop";
    logo.href = "/";

    logoSide.classList.add("logoSide");
    logoSide.appendChild(logo);

    navigation.appendChild(logoSide);

    ulWrapper.classList.add("nav-items");
    burger.classList.add("headerBar", "fa-solid", "fa-bars");

    wrapInside.classList.add("wrapInside", "authPage", "hrefClass");

    regLogin.classList.add("nav-items");
    userIcon.classList.add("fa-regular", "fa-user", "userIcon");
    authText.textContent = "Login";
    authText.classList.add("nav-item");

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

    dropDwonLogin.classList.add("hrefClass");

    dropDonwButtons.classList.add("dropButtons");
    dropDwonLogin.textContent = authText.textContent;

    dropDonwButtons.appendChild(dropDwonLogin);
    navDropDown.appendChild(dropDonwButtons);

    const hrefClass = document.querySelectorAll(".hrefClass");
    hrefClass.forEach((item) => {
      item.addEventListener("click", function () {
        window.location.href = "/auth.html";
      });
    });

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
      liParent.setAttribute("product-id", element._id);

      img.src = element.thumbnail;
      itemTitle.textContent = `${element.title}`;

      liParent.appendChild(img);
      liParent.appendChild(itemTitle);
      ulWrap.appendChild(liParent);

      liParent.addEventListener("click", function () {
        const _id = liParent.getAttribute("product-id");
        window.location.href = `/product.html?product_id=${_id}`;
      });
    });
    searchOptions.appendChild(ulWrap);
    checkSearch = true;
  } catch (error) {
    //! swal fire on error
  }
}
