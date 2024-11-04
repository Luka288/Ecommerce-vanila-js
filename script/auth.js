import { buildNavigation } from "./navbar.js";
import { usernameRegex } from "./regex.js";

const signInBtn = document.getElementById("signIn");
const signUpForm = document.getElementById("signUpForm");
const signInForm = document.getElementById("signInForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const showHide = document.querySelector(".showHide");
const toggleCreate = document.querySelector(".toggleCreate");

//registration form
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("emailAuth");
const password = document.getElementById("passwordAuth");
const phone = document.getElementById("phone");
const age = document.getElementById("age");
const address = document.getElementById("address");
const zipCode = document.getElementById("zipcode");
const male = document.getElementById("male");
const female = document.getElementById("female");
const signUpBtn = document.getElementById("signUpBtn");
const signUpCon = document.querySelector(".signUp");

init();

function init() {
  buildNavigation();
}

function formValidation() {
  const errorMsg = document.createElement("p");

  const authErrors = {};

  if (firstName.value !== usernameRegex) {
    console.log("error");
  }
}

async function signUp(user) {
  try {
    const registerResponse = await fetch(
      "https://api.everrest.educata.dev/auth/sign_up",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRegister),
      }
    );
  } catch (error) {}
}

async function signIn(userInfo) {
  try {
    const sendRequest = await fetch(
      "https://api.everrest.educata.dev/auth/sign_in",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      }
    );

    if (!sendRequest.ok) {
      throw new Error("auth error");
    }

    const parsedInfo = await sendRequest.json();

    const access_token = localStorage.setItem(
      "access_token",
      parsedInfo.access_token
    );

    const refresh_token = localStorage.setItem(
      "refresh_token",
      parsedInfo.refresh_token
    );

    window.location.reload();
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }

  console.log(userInfo);
}

signInForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const userInfo = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  signIn(userInfo);
});

showHide.addEventListener("click", function () {
  if (showHide.classList.contains("fa-eye")) {
    showHide.classList.replace("fa-eye", "fa-eye-slash");
    passwordInput.type = "text";
  } else {
    showHide.classList.replace("fa-eye-slash", "fa-eye");
    passwordInput.type = "password";
  }
});

// const signUp = document.querySelector(".signUp");
const login = document.querySelector(".login");
const toggleLogin = document.querySelector(".toggleLogin");

toggleCreate.addEventListener("click", function (e) {
  e.preventDefault();
  signUpCon.style.display = "block";
  login.style.display = "none";
});

toggleLogin.addEventListener("click", function (e) {
  e.preventDefault();
  signUpCon.style.display = "none";
  login.style.display = "block";
});

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();
  formValidation();
});
