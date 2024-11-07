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

  const checkUser = Cookies.get("access_token") && Cookies.get("refresh_token");

  if (cookieConsent === "true" || checkUser) {
    cookies.style.display = "none";
  } else {
    cookies.style.display = "block";
  }

  accept.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "true");
    cookies.style.display = "none";
  });

  decline.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "false");
    cookies.style.display = "none";
  });

  return cookieConsent === "true";
}
