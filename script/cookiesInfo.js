import { cookiesCountDown } from "./consts.js";

export function canSave() {
  const cookieConsent = localStorage.getItem("cookieConsent");
  const consentExpiration = localStorage.getItem("consentExpiration");

  const cookies = document.querySelector(".cookies");
  const accept = document.querySelector(".acceptCookies");
  const decline = document.querySelector(".declineCookies");

  if (consentExpiration && new Date().getTime() > parseInt(consentExpiration)) {
    localStorage.removeItem("cookieConsent");
    localStorage.removeItem("consentExpiration");
  }

  accept.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "true");
    Cookies.set("approved", true, { expires: cookiesCountDown });
    cookies.style.display = "none";
  });

  decline.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "false");
    cookies.style.display = "none";

    Cookies.set("denied", true, { expires: cookiesCountDown });
  });

  if (Cookies.get("denied") || Cookies.get("approved")) {
    cookies.style.visibility = "hidden";
  } else {
    cookies.style.visibility = "visible";
  }

  return cookieConsent === "true";
}
