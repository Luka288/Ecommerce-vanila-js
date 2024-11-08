import { buildNavigation } from "./navbar.js";
import { guard } from "./routes.js";
import { buildResponsiveCategory } from "./category.js";
import { canSave } from "./cookiesInfo.js";
import {
  emailRegex,
  lastNameRegex,
  passwordRegex,
  usernameRegex,
} from "./regex.js";
import { cookiesCountDown } from "./consts.js";

const signInBtn = document.getElementById("signIn");
const signUpForm = document.getElementById("signUpForm");
const signInForm = document.getElementById("signInForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const showHide = document.querySelector(".showHide");
const toggleCreate = document.querySelector(".toggleCreate");

//login form
const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("password");

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

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

init();

function init() {
  buildNavigation();
  guard();
  buildResponsiveCategory();
  canSave();
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

  let gender = null;

  document.querySelectorAll('[name="gender"]').forEach((item) => {
    if (item.checked) {
      gender = item.value;
    }
  });

  if (!gender) {
    authErrors.gender = "Please select a gender";
  }

  for (let key in authErrors) {
    let errorText = document.getElementById("error-" + key);

    if (errorText) {
      errorText.textContent = authErrors[key];
      errorText.style.color = "red";
    }
  }

  if (Object.keys(authErrors).length === 0) {
    const createUser = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      phone: `+995${phone.value}`,
      age: age.value,
      address: address.value,
      zipcode: zipCode.value.toString(),
      gender: gender,
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=",
    };

    signUp(createUser);
  }
}
const loginErrors = {};

function loginValidate() {
  if (!loginEmail.value.match(emailRegex)) {
    loginErrors.loginEmail = "Check email address";
  } else {
    loginErrors.loginEmail = "";
  }

  if (!loginPassword.value.match(passwordRegex)) {
    loginErrors.loginPassword = "Password invalid";
  } else {
    loginErrors.loginPassword = "";
  }

  for (let err in loginErrors) {
    const errP = document.getElementById("error-" + err);
    if (errP) {
      errP.textContent = loginErrors[err];
    }
  }
}

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();
  formValidation();
});

signInForm.addEventListener("submit", function (e) {
  loginValidate();
  e.preventDefault();

  const userInfo = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  if (Object.keys(loginErrors).length === 0) {
    signIn(userInfo);
  }
});

async function signUp(user) {
  try {
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

    if (pareseRegister) {
      Toast.fire({
        icon: "success",
        title: "Login successful",
      });
      signUpForm.reset();
    }
  } catch (error) {
    //! swal fire
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

    if (canSave()) {
      Cookies.set("access_token", parsedInfo.access_token, {
        expires: cookiesCountDown,
      });
      Cookies.set("refresh_token", parsedInfo.refresh_token, {
        expires: cookiesCountDown,
      });
    } else {
      const userSessionAccess = sessionStorage.setItem(
        "access_token",
        parsedInfo.access_token
      );
      const userSessionRefresh = sessionStorage.setItem(
        "refresh_token",
        parsedInfo.refresh_token
      );
    }
    window.location.reload();
    window.location.href = "/";
  } catch (error) {
    //! swal fire on error
  }
}

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
