export function guard() {
  const token = localStorage.getItem("access_token");
  const protectedRoutes = ["/auth.html", "/profile.html"];

  if (token && protectedRoutes.includes(window.location.pathname)) {
    window.location.href = "index.html";
  }
}

// !! change localstorage to token && sessionStorage
