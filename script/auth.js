import { buildNavigation } from "./navbar.js";
import {
  emailRegex,
  lastNameRegex,
  passwordRegex,
  // phoneRegex,
  usernameRegex,
} from "./regex.js";

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
const errorText = document.querySelectorAll(".error-text");

init();

function init() {
  buildNavigation();
}

function formValidation() {
  const authErrors = {};

  errorText.forEach((text) => {
    text.textContent = "";
  });

  if (!firstName.value.match(usernameRegex)) {
    authErrors.username = "Username is not valid";
  }

  if (!lastName.value.match(lastNameRegex)) {
    authErrors.lastName = "Last name is not valid";
  }

  if (!email.value.match(emailRegex)) {
    authErrors.email = "enter valid email";
  }

  if (!password.value.match(passwordRegex)) {
    authErrors.password = "invalid password";
  }

  if (phone.value === "") {
    authErrors.phone = "enter phone number";
  }

  if (age.value < 18) {
    authErrors.age = "You must be over 18";
  }

  if (address.value === "") {
    authErrors.address = "Enter Address";
  }

  if (zipCode.value === "") {
    authErrors.zipcode = "Enter Zipcode";
  }

  for (let key in authErrors) {
    let errorText = document.getElementById("error-" + key);

    if (errorText) {
      errorText.textContent = authErrors[key];
      errorText.style.color = "red";
    }

    console.log(authErrors);
  }

  if (Object.keys(authErrors).length === 0) {
    const createUser = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      age: age.value,
      address: address.value,
      zipCode: zipCode.value,
      gender: male.checked ? "male" : female.checked ? "female" : null,
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=",
    };

    console.log(createUser.zipCode);

    signUp(createUser);
  }
}

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();
  formValidation();
});

async function signUp(user) {
  try {
    console.log(
      "User data being sent to the server:",
      JSON.stringify(user, null, 2)
    );
    const registerResponse = await fetch(
      "https://api.everrest.educata.dev/auth/sign_up",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    const pareseRegister = await registerResponse.json();

    console.log(pareseRegister);
  } catch (error) {
    console.log(error);
  }
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
