import { PrismaClient, Usuario } from "@prisma/client";
import { genSalt, hash } from "bcryptjs";
import { UserType } from "../userType/userType.constants";
import { CreateUserDto, UserDto, TypeUser } from "./user.types";

const prisma = new PrismaClient();

export const create_user = async (
  user: CreateUserDto,
  user_type: TypeUser,
): Promise<UserDto> => {
  const rounds = parseInt(process.env.BCRYPT_ROUNDS!);
  const salt = await genSalt(rounds);
  const password = await hash(user.senha, salt);
  return await prisma.usuario.create({
    select: {
      id: true,
      nome: true,
      email: true,
      tipo_usuario_id: true,
      avatar_url: true,
      created_at: true,
      updated_at: true,
    },
    data: {
      ...user,
      senha: password,
      tipo_usuario_id: user_type === "ADMIN" ? UserType.ADMIN : UserType.CLIENT,
    },
  });
};

export const list_users = async (skip?: number, take?: number): Promise<UserDto[]> => {
  return await prisma.usuario.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      tipo_usuario_id: true,
      avatar_url: true,
      created_at: true,
      updated_at: true,
    },
    skip,
    take,
  });
};

export const read_user = async (id: string): Promise<UserDto | null> => {
  return await prisma.usuario.findUnique({
    select: {
      id: true,
      nome: true,
      email: true,
      tipo_usuario_id: true,
      avatar_url: true,
      created_at: true,
      updated_at: true,
    },
    where: { id },
  });
};

export const update_user = async (id: string, user: UserDto): Promise<Usuario | null> => {
  return await prisma.usuario.update({ where: { id }, data: user });
};

export const delete_user = async (id: string): Promise<Usuario> => {
  return await prisma.usuario.delete({ where: { id } });
};
