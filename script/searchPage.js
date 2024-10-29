getSearchVal();

function getSearchVal() {
  const searchValue = new URLSearchParams(window.location.search);
  const parsedValue = searchValue.get("search");

  loadProducts(parsedValue);
}

async function loadProducts(searchQuery) {
  try {
    const res = await fetch(
      `https://api.everrest.educata.dev/shop/products/search?brand=${searchQuery}&page_size=10`
    );

    if (!res.ok) {
      throw new Error("Error");
    }

    const parseRes = await res.json();

    console.log(parseRes);
  } catch (error) {}
}

// example search https://api.everrest.educata.dev/shop/products/search?brand=apple&page_size=1
