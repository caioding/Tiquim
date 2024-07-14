import { useQuery } from "@tanstack/react-query";
import { getCampaigns } from "../services/campaign";

export function useCampaigns() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => getCampaigns(),
  });

  return { campaigns: data, isPending, isError };
}
