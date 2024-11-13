import { buildNavigation } from "./navbar.js";
import { canSave } from "./cookiesInfo.js";

init();

function init() {
  buildNavigation();
  canSave();
}

const accordionItem = document.querySelectorAll(".accordion-item");

accordionItem.forEach((el) => {
  const accordionContent = el.querySelector(".accordion-content");

  el.addEventListener("click", function () {
    accordionContent.classList.toggle("active");
  });
});
