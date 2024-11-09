export function guard() {
  let access_token; // ! undefined
  let refresh_token; // ! undefined

  if (Cookies.get("access_token")) {
    access_token = Cookies.get("access_token");
    refresh_token = Cookies.get("refresh_token");
  } else {
    access_token = sessionStorage.getItem("access_token");
    refresh_token = sessionStorage.getItem("refresh_token");
  }

  // const token = localStorage.getItem("access_token");
  const protectedRoutes = ["/profile.html"];
  const afterAuthProtectedRoutes = ["/auth.html"];

  if (!access_token && protectedRoutes.includes(window.location.pathname)) {
    window.location.href = "/index.html";
  } else if (
    access_token &&
    afterAuthProtectedRoutes.includes(window.location.pathname)
  ) {
    window.location.href = "/index.html";
  }
}
