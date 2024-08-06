import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { CommentDto, CreateCommentDto } from "./comment.types";

const prisma = new PrismaClient();

export const listComments = async (
  campaignId: string,
  skip?: number,
  take?: number,
): Promise<CommentDto[]> => {
  return prisma.comment.findMany({
    select: {
      id: true,
      text: true,
      userId: true,
      campaignId: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { campaignId: campaignId },
    skip,
    take,
  });
};

export const createComment = async (
  comment: CreateCommentDto,
  uid: string,
): Promise<CommentDto> => {
  const supporter = await prisma.contribution.findFirst({
    select: {
      userId: true,
    },
    where: {
      userId: uid,
    },
  });

  if (!supporter) {
    throw new Error("Usuário precisa ser um apoiador para comentar");
  }

  return await prisma.comment.create({
    select: {
      id: true,
      text: true,
      userId: true,
      campaignId: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      ...comment,
      userId: uid,
    },
  });
};
