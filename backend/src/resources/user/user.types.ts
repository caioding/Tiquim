import { Usuario } from "@prisma/client";

export type CreateUserDto = Pick<Usuario, "nome" | "email" | "senha">;
export type UpdateUserDto = Pick<Usuario, "nome" | "email" | "senha">;
export type UserDto = Omit<Usuario, "senha">;
export type TypeUser = "CLIENT" | "ADMIN";
