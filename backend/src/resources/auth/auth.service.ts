import { PrismaClient } from "@prisma/client";
import { UsuarioDto } from "../usuario/usuario.types";
import { LoginDto } from "./auth.types";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export const checkCredentials = async (credentials: LoginDto): Promise<UsuarioDto | null> => {
  const usuario = await prisma.usuario.findUnique({
    where: { email: credentials.email },
  });
  if (!usuario) return null;
  const ok = await compare(credentials.senha, usuario.senha);
  if (!ok) return null;
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipoUsuarioID: usuario.tipoUsuarioID,
    createdAt: usuario.createdAt,
    updatedAt: usuario.updatedAt,
  };
};
