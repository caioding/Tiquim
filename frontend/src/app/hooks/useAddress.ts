import { useQuery } from "@tanstack/react-query";
import getAddress from "../services/address";

export function useAddress(cep: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["address", cep],
    queryFn: () => getAddress(cep),
    enabled: !!cep,
  });

  return { address: data, isLoading, isError };
}
