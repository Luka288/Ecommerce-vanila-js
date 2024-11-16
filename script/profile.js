import { buildNavigation } from "./navbar.js";
import { guard } from "./routes.js";
import Swal from "../node_modules/sweetalert2/src/sweetalert2.js";

const verifyContaienr = document.querySelector(".verifyContaienr");
const profileContainer = document.querySelector(".profileContainer");

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
  userCookie();
  guard();
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
      verifyContaienr.style.display = "block";
      profileContainer.style.display = "none";
      Toast.fire({
        icon: "success",
        title: "Check email to verify",
      });
      throw new Error("Check email to verify");
    }

    const parseUser = await userRes.json();

    for (let info in parseUser) {
      const userItem = document.getElementById("user-" + info);

      if (userItem) {
        userItem.textContent += parseUser[info];
      }
    }
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "error",
    });
  }
}

function userCookie() {
  const checkAccess = Cookies.get("refresh_token");

  if (checkAccess) {
    currUser(checkAccess);
  } else {
    const sessionToken = sessionStorage.getItem("refresh_token");
    currUser(sessionToken);
  }
}
