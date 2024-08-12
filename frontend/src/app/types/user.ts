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

export interface UserWithFullName {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type UserDto = Pick<User, "name" | "email" | "password">;

export interface Credentials {
  email: string;
  password: string;
}
