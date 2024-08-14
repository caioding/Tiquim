import { useQuery } from "@tanstack/react-query";
import getAddress, { getCities, getStates } from "../services/address";
import { City, State } from "../types/address";

export function useAddress(cep: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["address", cep],
    queryFn: () => getAddress(cep),
    enabled: !!cep,
  });

  return { address: data, isLoading, isError };
}

export function useStates() {
  const { data } = useQuery({
    queryKey: ["states"],
    queryFn: () => getStates(),
  });

  return { states: data as State[] };
}

export function useCities(state: string) {
  const { data } = useQuery({
    queryKey: ["cities", state],
    queryFn: () => getCities(state),
  });

  return { cities: data as City[] };
}
