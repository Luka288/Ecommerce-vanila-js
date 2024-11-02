import { buildNavigation } from "./navbar.js";

const signInBtn = document.getElementById("signIn");
const signInForm = document.getElementById("signInForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

init();

function init() {
  buildNavigation();
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

    console.log(refresh_token);
    console.log(access_token);
    console.log(parsedInfo);
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
