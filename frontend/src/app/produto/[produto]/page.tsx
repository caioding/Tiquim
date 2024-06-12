"use client";

import { useDetalhesProdutos } from "@/app/hooks/useDetalhesProdutos";
import api from "@/app/services/api";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Produto() {
  const params = useParams();
  const nome = params.produto as string;
  const { produto, isLoading, isError } = useDetalhesProdutos(nome);
  if (isLoading) return <h5>Carregando...</h5>;
  if (isError) return <h5>Ocorreu um erro ao carregar os produtos.</h5>;
  if (!produto) return <h5>Não há detalhes disponíveis para esse produto.</h5>;

  return (
    <>
      <main>
        <div className="container p-5">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>

              <h5 className="card-title mb-4 fw-bold">{produto.nome}</h5>

              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
                <Image
                  key={""}
                  src={produto.fotos[0].src}
                  alt={produto.fotos[0].titulo}
                  width={300}
                  height={320}
                />
              </div>

              <p className="card-text fw-medium">Valor: R${Number(produto.preco).toFixed(2)}</p>
              <p className="card-text fw-medium">Descrição: {produto.descricao}</p>
              <p className="card-text fw-medium">Anunciado por: {produto.usuario_id}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
