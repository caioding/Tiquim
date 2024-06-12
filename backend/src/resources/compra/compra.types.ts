import { CompraProduto } from "@prisma/client";

export type CreateCompraDto = Pick<CompraProduto, "produtoID" | "usuarioID" | "quantidade">;

export type CompraDto = Pick<CompraProduto, "id" | "usuarioID" | "produtoID" | "quantidade">;
