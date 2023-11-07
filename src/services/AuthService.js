import ApiService from "./ApiService";

export async function apiSignIn(data) {
  return ApiService.fetchData({
    url: "/login",
    method: "post",
    data,
  });
}

export async function apiSignUp(data) {
  return ApiService.fetchData({
    url: "/register",
    method: "post",
    data,
  });
}
