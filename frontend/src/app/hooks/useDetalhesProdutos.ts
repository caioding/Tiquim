import { useQuery } from "@tanstack/react-query";
import { getDetalhesProduto } from "../services/produtos";

export function useDetalhesProdutos(produto: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["detalhesProdutos"],
    queryFn: () => getDetalhesProduto(produto),
  });
  return { produto: data, isLoading, isError };
}
