import User, { UserDto } from "../types/user";
import api from "./api";

export async function getUser(id: string): Promise<User> {
  return api.get(`/user/${id}`).then((response) => response.data);
}

export async function signup(user: UserDto): Promise<string> {
  return api.post("/user/?userType=CLIENT", user).then((response) => response.data);
}
