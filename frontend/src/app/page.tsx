"use client";
import React, { useEffect, useState } from "react";
import ResumoCarrinho from "./components/ResumoCarrinho";
import ListagemProdutos from "./components/ListagemProdutos";

export default function Produtos() {
  const [preco_total, set_preco_total] = useState<number>(0);
  const [quant_itens, set_quant_itens] = useState<number>(0);

  const adicionarAoCarrinho = (produto: Produto) => {
    set_quant_itens(quant_itens + 1);
    set_preco_total(preco_total + parseFloat(produto.preco));
  };

  return (
    <>
      <main>
        <div className="container p-5">
          <ResumoCarrinho quantItens={quant_itens} precoTotal={preco_total} />
          <ListagemProdutos adicionarAoCarrinho={adicionarAoCarrinho} />
        </div>
      </main>
    </>
  );
}
