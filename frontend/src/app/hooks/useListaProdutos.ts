import { useQuery } from "@tanstack/react-query";
import { getListaProduto } from "../services/produtos";

export function useListaProdutos() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["listaProdutos"],
    queryFn: () => getListaProduto(),
  });
  return { produtos: data, isLoading, isError };
}
