import { Usuario } from "@prisma/client";

export type LoginDto = Pick<Usuario, "email" | "senha">;
