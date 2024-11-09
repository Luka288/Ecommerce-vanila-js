import { buildNavigation } from "./navbar.js";

init();

function init() {
  let userToken = "";

  if (Cookies.get("refresh_token")) {
    userToken = Cookies.get("refresh_token");
  } else {
    userToken = sessionStorage.getItem("refresh_token");
  }
  requestCart(userToken);
  buildNavigation();
}

async function requestCart(token) {
  try {
    const requestItems = await fetch(
      "https://api.everrest.educata.dev/shop/cart",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const parseRequest = await requestItems.json();

    parseRequest.products.forEach((element) => {
      loadProducts(element.productId);
    });

    console.log(parseRequest);
  } catch (error) {}
}

async function loadProducts(_id) {
  try {
    const loadCartItems = await fetch(
      `https://api.everrest.educata.dev/shop/products/id/${_id}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );

    const parseItems = await loadCartItems.json();

    console.log(parseItems);
  } catch (error) {}
}
