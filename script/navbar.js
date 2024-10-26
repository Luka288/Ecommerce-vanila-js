"use strict";

const navigation = document.getElementById("navigation");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    navigation.style.backgroundColor = "#1C2641";
  } else {
    navigation.style.backgroundColor = "transparent";
  }
});

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

    loginBtn.classList.add("nav-item");
    loginBtn.textContent = "login";
    loginBtn.href = "auth";

    registerBtn.classList.add("nav-item");
    registerBtn.textContent = "register";
    registerBtn.href = "auth";

    ulWrapper.classList.add("nav-items");
    buttonSide.classList.add("buttonSide");
    loginLi.appendChild(loginBtn);
    regLi.appendChild(registerBtn);
    ulWrapper.appendChild(loginLi);
    ulWrapper.appendChild(regLi);
    buttonSide.appendChild(burger);
    buttonSide.appendChild(ulWrapper);
    navigation.appendChild(buttonSide);

    const burgerBar = document.querySelector(".headerBar");

    burgerBar.addEventListener("click", function () {
      ulWrapper.classList.toggle("active");
      if (burgerBar.classList.contains("fa-bars")) {
        burgerBar.classList.replace("fa-bars", "fa-x");
      } else {
        burgerBar.classList.replace("fa-x", "fa-bars");
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        ulWrapper.classList.remove("active");
      }
    });
  } else {
  }
}

buildNavigation();
