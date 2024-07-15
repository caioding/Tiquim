import { useQuery } from "@tanstack/react-query";
import { getYourCampaigns } from "../services/campaign";

export function useYourCampaigns() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["yourCampaigns"],
    queryFn: () => getYourCampaigns(),
  });

  return { campaigns: data, isPending, isError };
}
