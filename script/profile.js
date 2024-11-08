import { buildNavigation } from "./navbar.js";

init();

function init() {
  buildNavigation();
  userCookie();
}

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
      throw new Error("Err");
    }

    const parseUser = await userRes.json();

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
