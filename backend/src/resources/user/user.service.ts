import { PrismaClient, Usuario } from "@prisma/client";
import { genSalt, hash } from "bcryptjs";
import { UserType } from "../userType/userType.constants";
import { CreateUserDto, UserDto, TypeUser, UpdateUserDto } from "./user.types";

const prisma = new PrismaClient();

export const createUser = async (user: CreateUserDto, userType: TypeUser): Promise<UserDto> => {
  const rounds = parseInt(process.env.BCRYPT_ROUNDS!);
  const salt = await genSalt(rounds);
  const password = await hash(user.senha, salt);
  try {
    const newUser = await prisma.usuario.create({
      select: {
        id: true,
        nome: true,
        email: true,
        tipoUsuarioId: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
      data: {
        ...user,
        senha: password,
        tipoUsuarioId: userType === "ADMIN" ? UserType.ADMIN : UserType.CLIENT,
      },
    });
    return newUser;
  } catch (err) {
    throw err;
  }
};

export const listUsers = async (skip?: number, take?: number): Promise<UserDto[]> => {
  return await prisma.usuario.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      tipoUsuarioId: true,
      avatarUrl: true,
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take,
  });
};

export const readUser = async (id: string): Promise<UserDto | null> => {
  return await prisma.usuario.findUnique({
    select: {
      id: true,
      nome: true,
      email: true,
      tipoUsuarioId: true,
      avatarUrl: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { id },
  });
};

export const updateUser = async (id: string, user: UpdateUserDto): Promise<Usuario | null> => {
  return await prisma.usuario.update({ where: { id }, data: user });
};

export const deleteUser = async (id: string): Promise<Usuario> => {
  return await prisma.usuario.delete({ where: { id } });
};
