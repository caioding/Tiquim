import { Request, Response } from "express";
import { Campaign, PrismaClient } from "@prisma/client";
import { CampaignDto, CreateCampaignDto, UpdateCampaignDto } from "./campaign.types";

const prisma = new PrismaClient();

export const createCampaign = async (
  campaign: CreateCampaignDto,
  req: Request,
): Promise<CampaignDto> => {
  const userId = req.session.uid as string;
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
      userId: userId,
    },
  });
};

export const listCampaigns = async (skip?: number, take?: number): Promise<CampaignDto[]> => {
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
};

export const listUserCampaigns = async (
  req: Request,
  skip?: number,
  take?: number,
): Promise<CampaignDto[]> => {
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
    where: { userId: req.session.uid },
    skip,
    take,
  });
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
  req: Request,
): Promise<Campaign | null> => {
  const campaign = await prisma.campaign.findUnique({
    select: { userId: true },
    where: { id },
  });

  if (!campaign) {
    throw new Error("Campanha não encontrada");
  }

  if (campaign.userId !== req.session.uid) {
    throw new Error("Usuário não autorizado a atualizar esta campanha");
  }

  return await prisma.campaign.update({
    where: { id },
    data: updatedCampaign,
  });
};

export const deleteCampaign = async (id: string, req: Request): Promise<Campaign> => {
  const campaign = await prisma.campaign.findUnique({
    select: { userId: true },
    where: { id },
  });

  if (!campaign) {
    throw new Error("Campanha não encontrada");
  }

  if (campaign.userId !== req.session.uid) {
    throw new Error("Usuário não autorizado a remover esta campanha");
  }
  return await prisma.campaign.delete({ where: { id } });
};

export const searchCampaigns = async (
  req: Request,
  searchTerm: string,
  skip?: number,
  take?: number,
) => {
  return await prisma.campaign.findMany({
    where: {
      title: {
        contains: searchTerm,
      },
    },
    skip: skip,
    take: take,
  });
};
