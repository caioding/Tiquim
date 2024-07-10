import { Campaign } from "../types/campaign";
import api from "./api";

export async function getCampaigns(): Promise<Campaign[]> {
  return api.get("/campaign").then((response) => response.data);
}

export async function getCampaignDetails(id: string): Promise<Campaign> {
  return api.get(`/campaign/${id}`).then((response) => response.data);
}
