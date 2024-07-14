import User from "../types/user";
import api from "./api";

export async function getUser(id: string): Promise<User> {
  return api.get(`/user/${id}`).then((response) => response.data);
}
