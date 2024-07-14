import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/user";

export function useUser(id: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(id),
  });

  return { user: data, isPending, isError };
}
