export function buildResponsiveCategory() {
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
          console.log(a.innerText);
        });
      });
    }
  });
}
