import { PrismaClient } from "@prisma/client";
import { CampaignDto, CreateCampaignDto, UpdateCampaignDto } from "./campaign.types";

const prisma = new PrismaClient();

export const createCampaign = async (
  campaign: CreateCampaignDto,
  uid: string,
): Promise<CampaignDto> => {
    return await prisma.campaign.create({
      select: {
        id: true,
        goal: true,
        deadline: true,
        title: true,
        description: true,
        preview: true,
        category: true,
        imageUrl: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
      data: {
        ...campaign,
        userId: uid,
      },
    });  
};

export const listCampaigns = async (
  searchTerm: string,
  skip?: number,
  take?: number,
): Promise<CampaignDto[]> => {
  if (searchTerm) {
    return await prisma.campaign.findMany({
      where: {
        title: {
          contains: searchTerm,
        },
      },
      skip: skip,
      take: take,
    });
  } else {
    return await prisma.campaign.findMany({
      select: {
        id: true,
        goal: true,
        deadline: true,
        title: true,
        description: true,
        preview: true,
        category: true,
        imageUrl: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
      skip,
      take,
    });
  }
};

export const listUserCampaigns = async (
  searchTerm: string,
  uid: string,
  skip?: number,
  take?: number,
): Promise<CampaignDto[]> => {
  if (searchTerm) {
    return await prisma.campaign.findMany({
      where: {
        title: {
          contains: searchTerm,
        },
        userId: uid,
      },
      skip: skip,
      take: take,
    });
  } else {
    return await prisma.campaign.findMany({
      select: {
        id: true,
        goal: true,
        deadline: true,
        title: true,
        description: true,
        preview: true,
        category: true,
        imageUrl: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { userId: uid },
      skip,
      take,
    });
  }
};

export const readCampaign = async (id: string): Promise<CampaignDto | null> => {
  return await prisma.campaign.findUnique({
    select: {
      id: true,
      goal: true,
      deadline: true,
      title: true,
      description: true,
      preview: true,
      category: true,
      imageUrl: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { id },
  });
};

export const updateCampaign = async (
  id: string,
  updatedCampaign: UpdateCampaignDto,
  uid: string,
): Promise<CampaignDto | null> => {
  return await prisma.campaign.update({
    where: { id: id, userId: uid },
    data: updatedCampaign,
  });
};

export const deleteCampaign = async (id: string, uid: string): Promise<CampaignDto> => {
  return await prisma.campaign.delete({ where: { id: id, userId: uid } });
};
