import { useQuery } from "@tanstack/react-query";
import { getContributedCampaigns, getContributions } from "../services/contribution";
import Contribution from "../types/contribution";



export function useContributions() {
    const {data, isPending, isError} = useQuery({
        queryKey: ["userContributions"],
        queryFn: () => getContributions()
    })

    return {contributions: data, isPending, isError};
}

export function useContributionsByCampaign(contributions: Contribution[]) {
    const {data, isPending, isError} = useQuery({
        queryKey: ["userCampaignContribution", contributions],
        queryFn: () => getContributedCampaigns(contributions)
    })

    return {yourContributions: data, isPending, isError};
}