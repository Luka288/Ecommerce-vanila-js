import { buildNavigation } from "./navbar.js";
import { guard } from "./routes.js";

const verifyContaienr = document.querySelector(".verifyContaienr");
const profileContainer = document.querySelector(".profileContainer");

init();

function init() {
  buildNavigation();
  userCookie();
  guard();
}

//verifyContaienr.style.display = "none";

async function currUser(token) {
  try {
    const userRes = await fetch("https://api.everrest.educata.dev/auth", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!userRes.ok) {
      verifyContaienr.style.display = "block";
      profileContainer.style.display = "none";
      throw new Error("Check email to verify");
    }

    const parseUser = await userRes.json();

    for (let info in parseUser) {
      const userItem = document.getElementById("user-" + info);

      if (userItem) {
        userItem.textContent += parseUser[info];
      }
    }

    console.log(parseUser);
  } catch (error) {
    console.log(error);
  }
}

function userCookie() {
  const checkAccess = Cookies.get("access_token");

  if (checkAccess) {
    currUser(checkAccess);
  } else {
    const sessionToken = sessionStorage.getItem("access_token");
    currUser(sessionToken);
  }
}

function userSession() {}

function buildInfo(params) {
  // const
}
