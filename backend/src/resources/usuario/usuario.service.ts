import { PrismaClient, Usuario } from "@prisma/client";
import { genSalt, hash } from "bcryptjs";
import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants";
import { CreateUsuarioDto, UsuarioDto, TipoUsuario } from "./usuario.types";

const prisma = new PrismaClient();

export const createUsuario = async (
  usuario: CreateUsuarioDto,
  tipoUsuario: TipoUsuario,
): Promise<UsuarioDto> => {
  const rounds = parseInt(process.env.BCRYPT_ROUNDS!);
  const salt = await genSalt(rounds);
  const senha = await hash(usuario.senha, salt);
  return await prisma.usuario.create({
    select: {
      id: true,
      nome: true,
      email: true,
      tipoUsuarioID: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      ...usuario,
      senha: senha,
      tipoUsuarioID: tipoUsuario === "ADMIN" ? TiposUsuarios.ADMIN : TiposUsuarios.CLIENT,
    },
  });
};

export const listUsuarios = async (skip?: number, take?: number): Promise<UsuarioDto[]> => {
  return await prisma.usuario.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      tipoUsuarioID: true,
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take,
  });
};

export const readUsuario = async (id: string): Promise<UsuarioDto | null> => {
  return await prisma.usuario.findUnique({
    select: {
      id: true,
      nome: true,
      email: true,
      tipoUsuarioID: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { id },
  });
};

export const updateUsuario = async (id: string, usuario: UsuarioDto): Promise<Usuario | null> => {
  return await prisma.usuario.update({ where: { id }, data: usuario });
};

export const deleteUsuario = async (id: string): Promise<Usuario> => {
  return await prisma.usuario.delete({ where: { id } });
};
