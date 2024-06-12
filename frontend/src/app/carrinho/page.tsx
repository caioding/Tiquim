"use client";
import React, { useState } from "react";
import ResumoCarrinho from "../compononents/ResumoCarrinho";
import ListagemCarrinho from "../compononents/ListagemCarrinho";
import { mockItensCarrinho } from "../mocks/itensCarrinho";

export default function Carrinho() {
  const [itensNoCarrinho, setItensNoCarrinho] = useState<ItemCarrinho[]>(mockItensCarrinho);
  const removerItemDoCarrinho = (id: string) => {
    const indice = itensNoCarrinho.findIndex((item) => item.id === id);
    setQuantItens(quantItens - itensNoCarrinho[indice].quantidade);
    setPrecoTotal(precoTotal - itensNoCarrinho[indice].preco * itensNoCarrinho[indice].quantidade);
    itensNoCarrinho.splice(indice, 1);
    setItensNoCarrinho(itensNoCarrinho);
  };

  let temp_preco = 0,
    temp_quant = 0;
  itensNoCarrinho.map((item) => {
    temp_quant += item.quantidade;
    temp_preco += item.preco * item.quantidade;
  });
  const [precoTotal, setPrecoTotal] = useState<number>(temp_preco);
  const [quantItens, setQuantItens] = useState<number>(temp_quant);

  return (
    <>
      <main>
        <div className="container p-5">
          <ListagemCarrinho itens={itensNoCarrinho} removerItemDoCarrinho={removerItemDoCarrinho} />
          <ResumoCarrinho quantItens={quantItens} precoTotal={precoTotal} />
        </div>
      </main>
    </>
  );
}
