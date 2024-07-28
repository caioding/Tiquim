import { Campaign, UpdateCampaignDto } from "../types/campaign";
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

export async function updateCampaign(id: string, campaign: UpdateCampaignDto) {
  return api.put(`/campaign/${id}`, campaign).then((response) => response.data);
}

export async function createCampaign(campaign: Omit<Campaign, "id">) {
  return api.post("/campaign", campaign);
}

export async function deleteCampaign(id: string) {
  return api.delete(`/campaign/${id}`)
}