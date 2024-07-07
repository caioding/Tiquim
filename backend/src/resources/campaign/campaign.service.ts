import { Request, Response } from "express";
import { Campanha, PrismaClient } from "@prisma/client";
import { CampaignDto, CreateCampaignDto, UpdateCampaignDto } from "./campaign.types";

const prisma = new PrismaClient();

export const createCampaign = async (
  campaign: CreateCampaignDto,
  req: Request,
): Promise<CampaignDto> => {
  const userId = req.session.uid as string;
  return await prisma.campanha.create({
    select: {
      id: true,
      meta: true,
      prazo: true,
      titulo: true,
      descricao: true,
      previa: true,
      categoria: true,
      logoUrl: true,
      usuarioId: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      ...campaign,
      usuarioId: userId,
    },
  });
};

export const listCampaigns = async (skip?: number, take?: number): Promise<CampaignDto[]> => {
  return await prisma.campanha.findMany({
    select: {
      id: true,
      meta: true,
      prazo: true,
      titulo: true,
      descricao: true,
      previa: true,
      categoria: true,
      logoUrl: true,
      usuarioId: true,
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take,
  });
};

export const readCampaign = async (id: string): Promise<CampaignDto | null> => {
  return await prisma.campanha.findUnique({
    select: {
      id: true,
      meta: true,
      prazo: true,
      titulo: true,
      descricao: true,
      previa: true,
      categoria: true,
      logoUrl: true,
      usuarioId: true,
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
): Promise<Campanha | null> => {
  const campaign = await prisma.campanha.findUnique({
    select: { usuarioId: true },
    where: { id },
  });

  if (!campaign) {
    throw new Error("Campanha não encontrada");
  }

  if (campaign.usuarioId !== req.session.uid) {
    throw new Error("Usuário não autorizado a atualizar esta campanha");
  }

  return await prisma.campanha.update({
    where: { id },
    data: updatedCampaign,
  });
};

export const deleteCampaign = async (id: string, req: Request): Promise<Campanha> => {
  const campaign = await prisma.campanha.findUnique({
    select: { usuarioId: true },
    where: { id },
  });

  if (!campaign) {
    throw new Error("Campanha não encontrada");
  }

  if (campaign.usuarioId !== req.session.uid) {
    throw new Error("Usuário não autorizado a remover esta campanha");
  }
  return await prisma.campanha.delete({ where: { id } });
};
