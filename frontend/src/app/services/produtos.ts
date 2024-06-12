import api from "./api";

export async function getListaProduto() {
  return api.get<Produto[]>("/produto").then((response) => response.data);
}

export async function getDetalhesProduto(produto: string) {
  console.log(produto);
  return api.get<Produto>(`/produto/${produto}`).then((response) => response.data);
}
