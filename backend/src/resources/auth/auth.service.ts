import { PrismaClient } from "@prisma/client";
import { UserDto } from "../user/user.types";
import { LoginDto } from "./auth.types";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export const check_credentials = async (credentials: LoginDto): Promise<UserDto | null> => {
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
    tipo_usuario_id: user.tipo_usuario_id,
    avatar_url: user.avatar_url,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
};
