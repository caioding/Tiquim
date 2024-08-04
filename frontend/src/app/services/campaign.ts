import { Campaign, CreateCampaignDto, UpdateCampaignDto } from "../types/campaign";
import api, { api_base } from "./api";

export async function getCampaigns(searchQuery: String): Promise<Campaign[]> {
  return api.get(`/campaign?q=${searchQuery}`).then((response) => response.data);
}

export async function getCampaignPercentage(campaignId: string): Promise<Number> {
  return api.get(`/contribution/${campaignId}`).then((response) => response.data);
}

export async function getCampaignDetails(id: string): Promise<Campaign> {
  return api.get(`/campaign/${id}`).then((response) => response.data);
}

export async function getYourCampaigns(searchQuery: string): Promise<Campaign[]> {
  return api.get(`/campaign/user?q=${searchQuery}`).then((response) => response.data);
}

export async function updateCampaign(id: string, campaign: UpdateCampaignDto, file: File | null) {
  const formData = new FormData();
  formData.append("title", campaign.title);
  formData.append("description", campaign.description);
  formData.append("preview", campaign.preview);
  formData.append("imageUrl", campaign.imageUrl);

  if (file) {
    formData.append("campaignImage", file);
  }

  return api
    .put(`/campaign/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
}

export async function createCampaign(campaign: CreateCampaignDto, file: File | null) {
  const formData = new FormData();
  formData.append("goal", campaign.goal.toString());
  formData.append("deadline", campaign.deadline.toISOString());
  formData.append("title", campaign.title);
  formData.append("description", campaign.description);
  formData.append("preview", campaign.preview);
  formData.append("category", campaign.category);
  formData.append("userId", campaign.userId);
  formData.append("createdAt", campaign.createdAt.toISOString());
  formData.append("updatedAt", campaign.updatedAt.toISOString());

  if (file) {
    formData.append("campaignImage", file);
  }

  return api.post("/campaign", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function deleteCampaign(id: string) {
  return api.delete(`/campaign/${id}`);
}

export async function getImageCampaign(url: string): Promise<string> {
  const response = await api_base.get(`uploads/campaign/${url}`, {
    responseType: "blob",
  });

  const imageUrl = URL.createObjectURL(response.data);
  return imageUrl;
}
