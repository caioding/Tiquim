import api from "./api";

export async function getLogged(): Promise<string> {
  return api.post("/auth/logged", { withCredentials: true }).then((response) => response.data);
}

export async function logout(): Promise<string> {
  return api.post("/auth/logout", { withCredentials: true }).then((response) => response.data);
}
