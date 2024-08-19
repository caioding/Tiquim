import api from "./api";
import Contribution from "../types/contribution";
import { Campaign } from "../types/campaign";
import { getCampaignDetails } from "./campaign";

export async function getContributions(): Promise<Contribution[]> {
  return api.get(`/contribution`).then((response) => response.data);
}

export async function getContributedCampaigns(contributions: Contribution[]): Promise<Campaign[]> {
  if (contributions) {
    const filteredContributions = contributions.map((contribution) => contribution.campaignId);
    const uniqueCampaigns = [...new Set(filteredContributions)];

    try {
      const campaignsYouContributed = await Promise.all(
        uniqueCampaigns.map((campaignId) => getCampaignDetails(campaignId)),
      );
      return campaignsYouContributed;
    } catch (error) {
      console.log(error);
      throw new Error("Could not fetch campaigns you have contributed");
    }
  } else return [];
}
