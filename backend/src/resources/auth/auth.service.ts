import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { UserDto } from "../user/user.types";
import { LoginDto } from "./auth.types";

const prisma = new PrismaClient();

export const checkCredentials = async (credentials: LoginDto): Promise<UserDto | null> => {
  const user = await prisma.usuario.findUnique({
    where: { email: credentials.email },
  });
  if (!user) return null;
  const ok = await compare(credentials.senha, user.senha);
  if (!ok) return null;
  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    tipoUsuarioId: user.tipoUsuarioId,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
