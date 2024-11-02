import { buildNavigation } from "./navbar.js";

init();

function init() {
  buildNavigation();
  specificProdFromUrl();
}

function specificProdFromUrl() {
  const item_id = new URLSearchParams(window.location.search);
  const parsed_id = item_id.get("product_id");

  specificProd(parsed_id);
}

async function specificProd(_id) {
  try {
    const itemResponse = await fetch(
      `https://api.everrest.educata.dev/shop/products/id/${_id}`,
      {
        method: "GET",
      }
    );

    if (!itemResponse.ok) {
      throw new Error("Error Fetching product");
    }

    const parseItem = await itemResponse.json();

    console.log(parseItem);
  } catch (error) {
    console.log("cannot fetch product");
  }
}
