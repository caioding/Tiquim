import { Campaign } from "../types/campaign";
import api from "./api";

export async function getCampaigns(searchQuery: String): Promise<Campaign[]> {
  return api.get(`/campaign?q=${searchQuery}`).then((response) => response.data);
}

export async function getCampaignDetails(id: string): Promise<Campaign> {
  return api.get(`/campaign/${id}`).then((response) => response.data);
}

export async function getYourCampaigns(searchQuery: string): Promise<Campaign[]> {
  return api.get(`/campaign/user?q=${searchQuery}`).then((response) => response.data);
}
