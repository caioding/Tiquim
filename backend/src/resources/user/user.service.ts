import { PrismaClient, User } from "@prisma/client";
import { genSalt, hash } from "bcryptjs";
import { UserType } from "../userType/userType.constants";
import { CreateUserDto, UserDto, TypeUser, UpdateUserDto } from "./user.types";

const prisma = new PrismaClient();

export const createUser = async (user: CreateUserDto, userType: TypeUser): Promise<UserDto> => {
  const rounds = parseInt(process.env.BCRYPT_ROUNDS!);
  const salt = await genSalt(rounds);
  const password = await hash(user.password, salt);
  try {
    const newUser = await prisma.user.create({
      select: {
        id: true,
        name: true,
        email: true,
        userTypeId: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
      data: {
        ...user,
        password: password,
        userTypeId: userType === "ADMIN" ? UserType.ADMIN : UserType.CLIENT,
      },
    });
    return newUser;
  } catch (err) {
    throw err;
  }
};

export const listUsers = async (skip?: number, take?: number): Promise<UserDto[]> => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      userTypeId: true,
      avatarUrl: true,
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take,
  });
};

export const readUser = async (id: string): Promise<UserDto | null> => {
  return await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      userTypeId: true,
      avatarUrl: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { id },
  });
};

export const updateUser = async (id: string, user: UpdateUserDto): Promise<User | null> => {
  return await prisma.user.update({ where: { id }, data: user });
};

export const deleteUser = async (id: string): Promise<User> => {
  return await prisma.user.delete({ where: { id } });
};
