export default interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  userTypeId: string;
}

export type UserDto = Pick<User, "name" | "email" | "password">;

export interface Credentials {
  email: string;
  password: string;
}
