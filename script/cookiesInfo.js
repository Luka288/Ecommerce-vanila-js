export function canSave() {
  const cookieConsent = localStorage.getItem("cookieConsent");

  const accept = document.querySelector(".acceptCookies");
  const decline = document.querySelector(".declineCookies");

  accept.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "true");
  });

  decline.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "false");
  });

  return cookieConsent === "true";
}
