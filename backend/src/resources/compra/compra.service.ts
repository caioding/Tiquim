import { CompraProduto, PrismaClient } from "@prisma/client";
import { CompraDto } from "./compra.types";

const prisma = new PrismaClient();

export const finishCompra = async (usuarioID: string, carrinho: CompraDto[]) => {
  console.log("LEL");
  const comprasCriadas = await Promise.all(
    carrinho.map(async (item) => {
      const { produtoID, quantidade, id } = item;
      const compra = await prisma.compraProduto.create({
        data: {
          id: id,
          usuarioID: usuarioID,
          produtoID: produtoID,
          quantidade: quantidade,
        },
      });
      return compra;
    }),
  );
  return comprasCriadas;
};
