import { Request, Response } from "express";
import { Campaign, PrismaClient } from "@prisma/client";
import { ContributionDto, CreateContributionDto } from "./contribution.types";

const prisma = new PrismaClient();

export const createContribution = async (
  contribution: CreateContributionDto,
  req: Request,
): Promise<ContributionDto> => {
  const userId = req.session.uid as string;
  return await prisma.contribution.create({
    select: {
      id: true,
      amount: true,
      userId: true,
      campaignId: true,
      paymentMethodId: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      ...contribution,
      userId: userId,
    },
  });
};

export const listContributions = async (
  req: Request,
  skip?: number,
  take?: number,
): Promise<ContributionDto[]> => {
  const contributions = await prisma.contribution.findMany({
    select: {
      id: true,
      amount: true,
      userId: true,
      campaignId: true,
      paymentMethodId: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { userId: req.session.uid },
    skip,
    take,
  });
  if (!contributions) {
    throw new Error("Nenhuma contribuição foi encontrada");
  }
  return contributions;
};

export const readContribution = async (id: string, req: Request): Promise<ContributionDto> => {
  const contribution = await prisma.contribution.findUnique({
    select: {
      id: true,
      amount: true,
      userId: true,
      campaignId: true,
      paymentMethodId: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { id },
  });
  if (!contribution) {
    throw new Error("Contribuição não encontrada");
  }

  if (contribution.userId !== req.session.uid) {
    throw new Error("Usuário não autorizado a ver esta contribuição");
  }
  return contribution;
};
