export function buildResponsiveCategory() {
  const whereTohide = ["/auth.html", "/profile.html"];
  const responsiveCategory = document.querySelector(".responsiveCategory");
  const slideCategory = document.querySelector(".slideCategory");
  let checkIfLoaded = false;

  responsiveCategory.addEventListener("click", function () {
    slideCategory.classList.toggle("activeCategory");

    if (checkIfLoaded) {
      return;
    }

    const storageBrands = JSON.parse(localStorage.getItem("brandName"));

    if (storageBrands) {
      checkIfLoaded = true;
      storageBrands.forEach((element) => {
        const a = document.createElement("a");
        a.classList.add("responsiveCategoryA");
        a.textContent = element;
        slideCategory.appendChild(a);

        a.addEventListener("click", function () {
          window.location.href = `/search.html?search=${a.textContent}`;
        });
      });
    }
  });

  if (whereTohide.includes(window.location.pathname)) {
    responsiveCategory.style.display = "none";
  }

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      slideCategory.classList.remove("activeCategory");
    }
  });
}
