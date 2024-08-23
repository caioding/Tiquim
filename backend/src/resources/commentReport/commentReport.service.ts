import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { CommentReportDto, CreateCommentReportDto } from "./commentReport.types";

const prisma = new PrismaClient();

export const listCommentReports = async (
  campaignId: string,
  skip?: number,
  take?: number,
): Promise<CommentReportDto[]> => {
  return prisma.commentReport.findMany({
    select: {
      id: true,
      commentId: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { commentId: campaignId },
    skip,
    take,
  });
};

export const createCommentReport = async (
  commentReport: CreateCommentReportDto,
  uid: string,
): Promise<CommentReportDto> => {
  const comment = await prisma.comment.findUnique({
    select: {
      id: true,
    },
    where: {
      id: commentReport.commentId,
    },
  });

  if (!comment) {
    throw new Error("O Comentário à ser denunciado não existe");
  }

  const alreadyReported = await prisma.commentReport.findFirst({
    select: { id: true },
    where: { commentId: comment.id, userId: uid },
  });

  if (alreadyReported) {
    throw new Error("Só é possível denunciar uma vez");
  }

  return await prisma.commentReport.create({
    select: {
      id: true,
      commentId: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      ...commentReport,
      userId: uid,
    },
  });
};

export const deleteCommentReport = async (id: string): Promise<CommentReportDto> => {
  return await prisma.commentReport.delete({ where: { id: id } });
};

export const deleteAllCommentReport = async (commentId: string): Promise<void> => {
  await prisma.commentReport.deleteMany({ where: { commentId: commentId } });
};
