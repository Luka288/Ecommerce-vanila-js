const scrollToTop = document.querySelector(".scrollToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 400) {
    scrollToTop.style.visibility = "visible";
  } else {
    scrollToTop.style.visibility = "hidden";
  }
});

scrollToTop.addEventListener("click", function () {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});
