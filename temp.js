"use strict";

const navigation = document.getElementById("navigation");

// window.addEventListener("scroll", function () {
//   if (window.scrollY > 100) {
//     navigation.style.backgroundColor = "#1C2641";
//   } else {
//     navigation.style.backgroundColor = "transparent";
//   }
// });

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
    loginBtn.classList.add("nav-item");
    loginBtn.textContent = "login";
    loginBtn.href = "auth";

    regLogin.classList.add("nav-items");
    userIcon.classList.add("fa-solid", "fa-user");
    authText.textContent = "Login";
    authText.classList.add("nav-item");

    registerBtn.classList.add("nav-item");
    registerBtn.textContent = "register";
    registerBtn.href = "auth";

    // ulWrapper.classList.add("nav-items");
    buttonSide.classList.add("buttonSide");
    // loginLi.appendChild(loginBtn);
    // regLi.appendChild(registerBtn);
    // ulWrapper.appendChild(loginLi);
    // ulWrapper.appendChild(regLi);
    wrapInside.appendChild(userIcon);
    wrapInside.appendChild(authText);
    regLogin.appendChild(wrapInside);
    buttonSide.appendChild(burger);
    buttonSide.appendChild(regLogin);
    navigation.appendChild(buttonSide);

    // const test = document.querySelector(".test");
    // console.log(clone);

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
